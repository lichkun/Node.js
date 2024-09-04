 export default class User{
    #_name;
    #_age;
    constructor(name, age){
        this.#_age = age;
        this.#_name = name;
    }
    getName(){
        return this.#_name;
    }
    getAge(){
        return this.#_age;
    }
    toString(){
        return `Name:${this.#_age} Age:${this.#_name}`;
    }
}
const PI = 3.14