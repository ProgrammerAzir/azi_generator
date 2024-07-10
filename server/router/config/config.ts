import express, { Router } from "express";
import {  FileManager, typeAst } from "../../dao/dao";
const router = Router();
router.post("/type", express.json(), async (req, res, next) => {
  const body = req.body;
  const code = body.code;
  if (code) {
    const TsFileLoader = new FileManager({
      endwithStr: ".ts",
    });
    const file = await TsFileLoader.writeFile("basetype.ts",code)
    if(!(typeof file == 'string')){
        res.json({
            status:400,
            message:file.message
        })
        return
    }
    res.json({
        status:200
    })
  }
});
router.get("/type",async (req,res,next)=>{
    const TsFileLoader = new FileManager({
        endwithStr: ".ts",
      });
      const file = await TsFileLoader.readFile("basetype.ts")
      if(!(typeof file == 'string')){
        res.json({
            status:400,
            message:file.message
        })
        return
    }
    res.json({
        status:200,
        code:file
    })
})


export default router;
