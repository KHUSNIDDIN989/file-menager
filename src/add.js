import {open} from "node:fs/promises"
import {resolve} from "node:path"
import { cwd } from "node:process"
import displayCuurnetDirectory from ""


export default async function([newFileName]){
    let filehandle
    try{
     const pathToFile = resolve(cwd(), newFileName)
     filehandle = await open(pathToFile, 'w')
     displayCuurnetDirectory()   
    }catch(error){
        console.log(error.message)
    }finally{
        filehandle.close()
    }
}