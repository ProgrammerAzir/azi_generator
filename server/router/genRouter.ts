import {Router} from 'express'
import JsonFile from '../dao/dao'
import configRouter from './config/configRouter'
const router = Router()
// router.get('/',(req, res, next)=>{
//     JsonFile.writeJsonFile('asd/a.json',{
//         id:1
//     })
// })
router.use('/config',configRouter)
export default router