import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
import {
  Project,
  TypeChecker,
  VariableDeclarationKind,
  SourceFile,
  ts,
  Type,
} from "ts-morph";

class LoadType {
  project: Project = new Project();
  typeChecker: TypeChecker;
  sourceFile: SourceFile | undefined;
  constructor() {
    this.typeChecker = this.project.getTypeChecker();
  }

  loadToPath(src: string) {
    this.sourceFile = this.project.addSourceFileAtPath(src);
    return this
    // const sourceFile = this.project.getSourceFiles()[0]
  }
  getDatabaseDeclaration() {
    if(!this.sourceFile) return 
    const declarationList = this.sourceFile.getDescendantsOfKind(
      ts.SyntaxKind.TypeAliasDeclaration
    );
    const databaseDeclaration = declarationList.find(
      (declaration) => declaration.getName() == "Database"
    );
    return databaseDeclaration;
  }
  /**
   * getTypeForTypeKey(getDatabaseDeclaration().getType(),'public')
   * @param type 
   * @param key 
   * @returns 
   */
  getTypeForTypeKey(type:Type<ts.Type>,key:string){
    const symbol = type.getProperties().find(symbol => symbol.getName() == key)
    if(!symbol){
        return 
    }
    const symbolType = this.typeChecker.getTypeOfSymbolAtLocation(symbol, symbol.getDeclarations()[0] ?? undefined);
    return symbolType
  }
  getTypeOfTableName(tableName:string){
    const databaseType = this.getDatabaseDeclaration()?.getType()
    if(!databaseType) return 
    const publicType = this.getTypeForTypeKey(databaseType,'public')
    if(!publicType) return 
    const TablesType = this.getTypeForTypeKey(publicType,'Tables')
    if(!TablesType) return  
    const TableType = this.getTypeForTypeKey(TablesType,tableName)
    if(!TableType) return 
    return TableType
  }
  tableTypeObject(tableName:string){
    const getTypeForTypeKey = this.getTypeForTypeKey
    const tabletype = this.getTypeOfTableName(tableName)
    if(!tabletype)return
    const rowType = this.getTypeForTypeKey(tabletype,'Row')
    const insert = this.getTypeForTypeKey(tabletype,'Insert')
    const update = this.getTypeForTypeKey(tabletype,'Update')
    if(!rowType) return
    const type = this.getTypeForTypeKey(rowType,'url')
    let obj = {} as any
    rowType.getProperties().forEach(s=>{
        console.log(s.getName());
        console.log(s.getValueDeclaration());
        obj[s.getName()] = this.getTypeForTypeKey(rowType,s.getName())?.getText()
    })
    return obj
    
  }
  getTypeEnumsOfObject(){
    function extractQuotedWords(str: string): string[] {  
      const regex = /"([^"]+)"/g; // 匹配所有被双引号包裹的文本  
      const result: string[] = [];  
      let match: RegExpExecArray | null;  
    
      while ((match = regex.exec(str)) !== null) {  
          result.push(match[1]); // 将匹配到的文本（不包括引号）添加到结果数组中  
      }  
    
      return result;  
  }  
    const databaseType = this.getDatabaseDeclaration()?.getType()
    if(!databaseType) return 
    const publicType = this.getTypeForTypeKey(databaseType,'public')
    if(!publicType) return 
    const EnumsType = this.getTypeForTypeKey(publicType,'Enums')
    if(!EnumsType) return 
    let obj = {} as any

    EnumsType.getProperties().forEach(s=>{
      console.log(s.getName());
      console.log(s.getValueDeclaration());
      const value = this.getTypeForTypeKey(EnumsType,s.getName())?.getText()||''
      obj[s.getName()] = extractQuotedWords(value)
    })
    return obj
  }
}


class FileManager {
  private directory: string;
  endwithStr = ".json";
  constructor(
    options: { directory?: string; endwithStr?: string } = {
      directory: __dirname,
      endwithStr: ".json",
    }
  ) {
    this.directory = options.directory || __dirname;
    if (options.endwithStr) this.endwithStr = options.endwithStr;
  }

  /**
   * 将数据写入文件，若文件没有则新建一个
   * @param filename
   * @param data
   * @returns
   */
  async writeJsonFile(filename: string, data: any):Promise<Object|NodeJS.ErrnoException> {
    if (!filename.endsWith(this.endwithStr)) {
      return Promise.reject(
        new Error("Filename must end with " + this.endwithStr)
      );
    }
    const filePath = path.join(this.directory, filename);
    const dirPath = path.dirname(filePath);

    // 确保目录存在
    await this.ensureDirectoryExists(dirPath);
    return new Promise<any|NodeJS.ErrnoException>((resolve, reject) => {
      fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  }  /**
  * 将数据写入文件，若文件没有则新建一个
  * @param filename
  * @param data
  * @returns
  */
 async writeFile(filename: string, data: any):Promise<string|NodeJS.ErrnoException> {
   if (!filename.endsWith(this.endwithStr)) {
     return Promise.reject(
       new Error("Filename must end with " + this.endwithStr)
     );
   }
   const filePath = path.join(this.directory, filename);
   const dirPath = path.dirname(filePath);

   // 确保目录存在
   await this.ensureDirectoryExists(dirPath);
   return new Promise<any|NodeJS.ErrnoException>((resolve, reject) => {
     fs.writeFile(filePath, data, (err) => {
       if (err) {
         reject(err);
       } else {
         resolve(data);
       }
     });
   });
 }

  // 读取JSON文件
  async readJsonFile(filename: string):Promise<Object|NodeJS.ErrnoException> {
    if (!filename.endsWith(this.endwithStr)) {
      return Promise.reject(
        new Error("Filename must end with " + this.endwithStr)
      );
    }
    const filePath = path.join(this.directory, filename);
    return new Promise<any|NodeJS.ErrnoException>((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  }
  async readFile(filename: string):Promise<string|NodeJS.ErrnoException> {
    if (!filename.endsWith(this.endwithStr)) {
      return Promise.reject(
        new Error("Filename must end with " + this.endwithStr)
      );
    }
    const filePath = path.join(this.directory, filename);
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  // 删除JSON文件
  async deleteJsonFile(filename: string):Promise<string|NodeJS.ErrnoException> {
    if (!filename.endsWith(this.endwithStr)) {
      return Promise.reject(
        new Error("Filename must end with" + this.endwithStr)
      );
    }
    const filePath = path.join(this.directory, filename);
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("");
        }
      });
    });
  }
  private async ensureDirectoryExists(dirPath: string){
    return new Promise((resolve, reject) => {
      fs.mkdir(dirPath, { recursive: true }, (err) => {
        if (err && err.code !== "EEXIST") {
          reject(err);
        } else {
          resolve("");
        }
      });
    });
  }
}

const JsonFile = new FileManager({
  directory: __dirname,
});
const typeAst = new LoadType().loadToPath(path.join(__dirname,"/basetype.ts"))
// console.log(typeAst.getTypeEnumsOfObject());

export { JsonFile,typeAst, FileManager  };
