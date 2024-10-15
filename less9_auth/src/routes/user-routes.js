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

let users= [];
userRoutes.post("/user/signin", (req, res) => {
  const { login,password } = req.body;

  const user = users.find(u=> u.login == login && u.password ==password);
  if(user){
    req.session.user = { login, password };
    res.cookie("user", login, {
      httpOnly: true,
      maxAge: 1000000,
    }); 
    res.redirect("/");
  }
  else{
    console.log('Пользователь с таким логином и паролем не найден.');
  }
 
});
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

  users.push({ login, email, password: password });

  req.session.user = { login, email };
  res.cookie("user", login, {
    httpOnly: true,
    maxAge: 1000000,
  });
  res.redirect("/");
});

export default userRoutes;
