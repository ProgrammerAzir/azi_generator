import express, { Router } from "express";
import {  FileManager, typeAst } from "../../dao/dao";
const router = Router();
router.get("/",async (req,res,next)=>{
    const enums = typeAst.getTypeEnumsOfObject()
    res.json({
      enums
    })
  })
export default router;