import { Router } from "express";
import { products } from "../data/products.js";
import { createProductMiddleware } from "../middlewares/product-middleware.js";
const siteRouter = Router();

siteRouter
  .route("/")
  .get((req, res) => {
    res.status(200).json(products);
  })
  .post(createProductMiddleware, (req, res) => {
    res.status(201).json(req.new_product);
  });

siteRouter.get("/:id", (req, res, next) => {
  const id = +req.params.id;
  if (isNaN(id)) {
    return next();
  }

  const product = products.find((u) => u.id === id);
  if (!product) {
    return next();
  }

  res.status(200).send(product);
});

export default siteRouter;
