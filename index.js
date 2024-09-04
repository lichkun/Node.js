import chalk from "chalk";
import User from "./User.js";
import EventEmitter from "events";
import Buyer from "./Buyer.js";
// const user = new User("Alex", 32);
// console.log(chalk.blue(user.toString()));


// const emitter = new EventEmitter();
// emitter.on("on_click", (color)=> {
//     console.log(`clicked event. Color ${color}`)
// })
// emitter.emit("on_click", "red");

// const saleEvent = new EventEmitter();
// saleEvent.on("sale", ()=>{
//     buyers.forEach( buyer=>{
//         buyer.notify();
//     })
// });

// const buyers = [
//     new Buyer("John Doe", "john.doe@example.com"),
//     new Buyer("Jane Smith", "jane.smith@example.com"),
//     new Buyer("Alex Johnson", "alex.johnson@example.com")
// ] 

// saleEvent.emit("sale");

// console.log(saleEvent.getMaxListeners());

//Task 1
 const emitter = new EventEmitter();
// emitter.on("click", ()=>{
//     console.log("first handler")
// })
// emitter.on("click", ()=>{
//     console.log("second handler")
// })
// emitter.on("click", ()=>{
//     console.log("third handler")
// })
// emitter.emit("click");
//Task 2
// function listener1(){
//     console.log("fisrt handler")
// }
// function listener2(){
//     console.log("second handler")
// }
// emitter.on("error", listener1)
// emitter.on("error", listener2)

// emitter.emit("error");
// emitter.removeListener("error", listener1)
// emitter.emit("error");
//Task 3
// import Dice from "./Dice.js";
// const dice = new Dice();
// dice.emit.on("rolled", (result)=>{
//     console.log("thown a dice "+result);
// })
// dice.roll(); 
//Task 4
import Logger from "./Logger.js";
const logger = new Logger();
logger.emit.on("information", logger.informationLogger())
logger.emit.on("warning", logger.warningLogger())
logger.emit.on("error", logger.errorLogger())

logger.errorEmit();
 logger.informationEmit();
 logger.warningEmit();


