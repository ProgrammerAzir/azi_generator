import fs from "fs";
import path from "path";
import url from "url";

class JsonFileManager {  
    private directory:string
    constructor(directory = './') {  
        this.directory = directory;  
    }  
  
    /**
     * 将数据写入文件，若文件没有则新建一个
     * @param filename 
     * @param data 
     * @returns 
     */ 
    async writeJsonFile(filename:string, data:any) {  
        if (!filename.endsWith('.json')) {  
            return Promise.reject(new Error('Filename must end with .json'));  
        }  
        const filePath = path.join(this.directory, filename);  
        const dirPath = path.dirname(filePath);  
  
        // 确保目录存在  
        await this.ensureDirectoryExists(dirPath); 
        return new Promise((resolve, reject) => {  
            fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {  
                if (err) {  
                    reject(err);  
                } else {  
                    resolve(JSON.parse(data));  
                }  
            });  
        });  
    }  
  
    // 读取JSON文件  
    async readJsonFile(filename:string) {  
        if (!filename.endsWith('.json')) {  
            return Promise.reject(new Error('Filename must end with .json'));  
        }  
        const filePath = path.join(this.directory, filename);  
        return new Promise((resolve, reject) => {  
            fs.readFile(filePath, 'utf8', (err, data) => {  
                if (err) {  
                    reject(err);  
                } else {  
                    resolve(JSON.parse(data));  
                }  
            });  
        });  
    }  
  
    // 删除JSON文件  
    async deleteJsonFile(filename:string) {  
        if (!filename.endsWith('.json')) {  
            return Promise.reject(new Error('Filename must end with .json'));  
        }  
        const filePath = path.join(this.directory, filename);  
        return new Promise((resolve, reject) => {  
            fs.unlink(filePath, err => {  
                if (err) {  
                    reject(err);  
                } else {  
                    resolve('');  
                }  
            });  
        });  
    }  
    private async ensureDirectoryExists(dirPath:string) {  
        return new Promise((resolve, reject) => {  
            fs.mkdir(dirPath, { recursive: true }, err => {  
                if (err && err.code !== 'EEXIST') {  
                    reject(err);  
                } else {  
                    resolve('');  
                }  
            });  
        });  
    }  
}  
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
console.log(__dirname);

const JsonFile = new  JsonFileManager(__dirname)
export default JsonFile