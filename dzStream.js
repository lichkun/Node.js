import path, { resolve } from "node:path"
import fs from "node:fs"
import log from "node:console"

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;


const readStream = fs.createReadStream(
    path.resolve(__dirname, "files", "big.txt"), 
    {
        encoding: "utf-8"
    }
)
//Task1
// const delay = ms => new Promise(resolve => setTimeout(resolve, ms))


// for await(const chunk of readStream){
//     for(const cnk of chunk){
//         console.log(cnk)
//         await delay(100);
//     }       
// }
//Task 2
// readStream.on("data", (chunk)=>{
//     console.log(chunk.toUpperCase())
// })
//Task 3
// const wrieStream = fs.createWriteStream(
//     path.resolve(__dirname, "files", "shortUPPERCASE.txt")
// );
// readStream.pipe(wrieStream);
 //Task4
// const replaceSpaces = new Transform({
//     transform(chunk, encoding, callback) {
//         const transformed = chunk.toString().replace(/\s/g, '-');
//         callback(null, transformed);
//     }
// });

// const addPrefix = new Transform({
//     transform(chunk, encoding, callback) {
//         const transformed = chunk.toString().split('\n').map(line => 'Prefix: ' + line).join('\n');
//         callback(null, transformed);
//     }
// });

// const addSuffix = new Transform({
//     transform(chunk, encoding, callback) {
//         const transformed = chunk.toString().split('\n').map(line => line + ' :Suffix').join('\n');
//         callback(null, transformed);
//     }
// });

// const inputFile = path.resolve('files', 'input.txt');
// const outputFile = path.resolve('files', 'output.txt');
// const readStream2 = fs.createReadStream(inputFile, { encoding: 'utf8' });
// const writeStream = fs.createWriteStream(outputFile);

// pipeline(
//     readStream2,
//     replaceSpaces,
//     addPrefix,
//     addSuffix,
//     writeStream,
//     (err) => {
//         if (err) {
//             console.error('Потік обробки завершився помилкою:', err);
//         } else {
//             console.log('Потік обробки завершено успішно.');
//         }
//     }
// );

//Task 5
    
let counter = 1;


readStream.on("data", (chunk)=>{
    counter+=chunk.split("\n").length-1
})

readStream.on("end", () => {
    console.log(`Rows count: ${counter}`);
});