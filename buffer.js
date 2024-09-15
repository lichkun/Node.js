import ProductAPI from "./ProductAPI.js";

const obj = new ProductAPI();
await obj.Get();
await obj.Post({id: 4, name: "Product4", price: 400});
await obj.Put(2, {name: "UdatedProduct", price: 450})
await obj.Delete(2);