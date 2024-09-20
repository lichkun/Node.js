import path from "node:path"
import fs from "node:fs"
import { fileURLToPath } from "node:url";
import { Transform } from "node:stream";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentStream = fs.createReadStream(
    path.resolve(__dirname, "files", "short.txt"),{
        encoding: "utf-8"
    });
    
    
const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback){
        this.push(chunk.toString().toUpperCase());
        callback();
    }
})

let content ="";

contentStream.on("data", (chunk)=>{
    content+=chunk;
})

contentStream.on("end", ()=>{
    for(let i =0; i<content.length;i++){
        setTimeout(()=>{
            process.stdout.write(content[i]);
        },i*100)
    }
})

contentStream.pipe(upperCaseTransform).pipe(process.stdout)

