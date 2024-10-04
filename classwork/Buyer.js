import EventEmmiter from "events";

export default class Buyer{
    #name;
    #email;
    constructor(name, email){
        this.#name= name;
        this.#email= email;
    }
    getName() { return this.#name}
    getEmail() { return this.#email}
    notify(){
        console.log(`Sales is on! ${this.getName()}, ${this.getEmail()}`)
    }
}