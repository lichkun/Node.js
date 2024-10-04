import { products } from "../data/products.js";

export const createProductMiddleware = (req, res, next) => {
  if (!req.body || !req.body.price || !req.body.title) {
    res.status(400).json({
      title: "Body is empty",
    });
  }

  const body = req.body;
  const new_id = products.length + 1;
  const new_product = { id: new_id, ...body };
  products.push(new_product);

  req.new_product = new_product;
  next();
};
