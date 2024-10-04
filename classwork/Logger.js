import EventEmitter from 'events';
export default class Logger{
    emit = new EventEmitter()
    informationEmit(){
        this.emit.emit("information")
    }
    warningEmit(){
        this.emit.emit("warning")
    }
    errorEmit(){
        this.emit.emit("error")
    }
    informationLogger(){
        console.log("information log")
    }
    warningLogger(){
        console.log("warning log")
    }
    errorLogger(){
        console.log("error log")
    }
}