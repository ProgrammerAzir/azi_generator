import express, { Router } from "express";
import { JsonFile, typeAst } from "../../dao/dao";
import { clone } from "radash";
const router = Router();
interface DataItem {
  name: string;
  code: string;
  type?: string;
  description?:string;
  list: {
    lable: string;
    value: string;
    color: string;
  }[];
}
router.get("/", async (req, res, next) => {
  const data = await JsonFile.readJsonFile("dict/dict.json");
  res.json({dict:data});
});
router.post("/", express.json(), async (req, res, next) => {
  const body = req.body;
  const { add, edit, del } = body;
  let datalist = (await JsonFile.readJsonFile("dict/dict.json")) as DataItem[];  
  if (add) {
    // 检查是否已存在相同code的数据项，如果不存在则添加
    if (!datalist.some((item) => item.code === add.code)) {
      datalist.push(add);
    } else {
      // 可选：返回错误或忽略添加
      console.log("Item with code already exists:", add.code);
    }
  }

  if (edit) {
    // 查找并替换已存在的数据项
    const index = datalist.findIndex((item) => item.code === edit.code);
    if (index !== -1) {
      datalist[index] = { ...datalist[index], ...edit }; // 浅合并或根据需要深合并
    } else {
      // 可选：返回错误或忽略编辑
      console.log("Item with code not found:", edit.code);
    }
  }

  if (del) {
    // 查找并删除数据项
    const index = datalist.findIndex((item) => item.code === del);
    if (index !== -1) {
      datalist.splice(index, 1);
    } else {
      // 可选：返回错误或忽略删除
      console.log("Item with code not found for deletion:", del);
    }
  }

  // 写入文件（这里假设JsonFile有writeJsonFile方法）
  await JsonFile.writeJsonFile("dict/dict.json", clone(datalist) );

  // 响应更新后的数据列表（可选）
  res.json(datalist);
});
export default router;
