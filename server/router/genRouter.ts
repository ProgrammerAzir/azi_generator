import {Router} from 'express'
import {JsonFile} from '../dao/dao'
import config from './config/config'
import enums from './enums/enums'
const router = Router()
// router.get('/',(req, res, next)=>{
//     JsonFile.writeJsonFile('asd/a.json',{
//         id:1
//     })
// })
router.use('/config',config)
router.use('/enums',enums)
export default router