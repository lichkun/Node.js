import { Router } from "express";
import bcrypt from "bcrypt";
import validator from "validator";

const userRoutes = Router();
userRoutes.get("/user/signin", (req, res) => {
  res.render("form_auth");
});

userRoutes.get("/user/signup", (req, res) => {
  res.render("form_register");
});
userRoutes.get("/user/logout", (req,res)=>{
  req.session.destroy();
  res.clearCookie("user");
  res.redirect("/")
})

userRoutes.post("/user/signup", (req, res) => {
  const { login, email, password, confirm_password } = req.body;

  if (!login || !email || !password || !confirm_password) {
    return res.status(400).send("All fields are required.");
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send("Invalid email.");
  }

  if (password !== confirm_password) {
    return res.status(400).send("Passwords do not match.");
  }

  users.push({ login, email, password: hash });

  req.session.user = { login, email };
  res.cookie("user", login, {
    httpOnly: true,
    maxAge: 1000000,
  });
  res.redirect("/");
});

export default userRoutes;
