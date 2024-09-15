import axios from "axios";

export default class ProductAPI{
    constructor(){
        this.baseUrl = "http://localhost:3000/products";
        this.buffer = []
    }

    async Get(){
        try{
            const response  = await axios.get(this.baseUrl);
            this.buffer = response.data;
            console.log("Products in buffer:", this.buffer)
        }
        catch(error){
            console.error("Error fetcing roducts:", error);
        }
    }
    async Post(product){
        try{
            const response  = await axios.post(this.baseUrl,product);
            this.buffer.push(response.data)
            console.log("Added in products:", response.data)
        }
        catch(error){
            console.error("Error fetcing roducts:", error);
        }
    }
    async Put(id, product){
        try{
            const response  = await axios.put(`${this.baseUrl}/${id}`, product);
            const index = this.buffer.findIndex(p=> p.id == id)
            if(index !== -1){
                this.buffer[index] = response.data;
            }
            console.log("Updated product:", response.data)
        }
        catch(error){
            console.error("Error fetcing roducts:", error);
        }
    }
    async Delete(id){
        try{
            await axios.delete(`${this.baseUrl}/${id}`);
            this.buffer= this.buffer.filter(p=>p.id !==id)
            console.log("Products in buffer :", this.buffer)
        }
        catch(error){
            console.error("Error fetcing roducts:", error);
        }
    }
}