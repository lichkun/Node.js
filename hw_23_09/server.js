import express from "express";
import "dotenv/config";
import siteRouter from "./routers/site-routes.js";
import exphbs from "express-handlebars";
import { products } from "./data/products.js";

const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

const app = express();
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.json());

app.get("/", (req, res) => {
  res.render("home", {
    title: "My app",
  });
});
app.get("/contacts", (req, res) => {
  res.render("contacts", {
    contacts: ["str Sadovaya 3", "str. Sadovaya 10"],
    isShow: true,
  });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/products", (req, res) => {
  res.render("products", {
    products,
  });
});

app.use("/products", siteRouter);
app.all("*", (req, res) => {
  console.log(req.url);
  res.status(404).json("Not Found");
});

app.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}`),
);
