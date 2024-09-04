import EventEmitter from 'events'
export default class Dice{
    emit = new EventEmitter();
    roll(){
        const result=  Math.floor(Math.random()*6)+1
        this.emit.emit("rolled", result);
    }
}