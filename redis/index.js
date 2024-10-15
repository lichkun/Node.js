import redis from "redis";
const client = redis.createClient({
    url:"redis://127.0.0.1:6379"
})

client.connect().then(()=>{
    console.log("success")
    client.set("fruit", "orange").then(()=>{
        console.log("Added");
        client.get("fruit").then((res)=>{
            console.log(res);
            client.quit();
        })
    })
})
.catch(err=>console.log(err));