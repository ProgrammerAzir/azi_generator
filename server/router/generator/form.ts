import express, { Router } from "express";
import { JsonFile, typeAst } from "../../dao/dao";
import { clone } from "radash";
const router = Router();
interface RowSearchItem {
    key: string;
    lable: string;
    type: string;
    component: string;
    dict_code: string | null;
  }
  
  interface RowItem {
    key: string;
    lable: string;
    type: string;
    width: number;
    dict_code: string | null;
  }
  
  interface FormItem {
    key: string;
    lable: string;
    type: string;
    dict?: string | null;
    dict_code?: string | null;
    component: string;
    required?: boolean;
    rules?: string[];
  }
  
  interface TableConfig {
    id: number;
    name: string;
    tablename: string;
    pagination: boolean;
    row_search: RowSearchItem[];
    row: RowItem[];
    add_form: FormItem[];
    edit_form: FormItem[];
    detail: RowItem[];
  }
router.get("/", async (req, res, next) => {
    const data = await JsonFile.readJsonFile("generator/form.json");
    res.json({dict:data});
});
router.post("/add", express.json(), async (req, res, next) => {
    const body = req.body as Omit<TableConfig,'id'> ;
    //查询id最大的那一项的id
    
    const id =( (await JsonFile.readJsonFile("generator/form.json"))as TableConfig[])
});
export default router;
