// import requirements
const express = require("express");
const mongoose = require("mongoose");
// const cookieParser = require("cookies-parser");
// swapping
const app = express();
const port = 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("veiw engine", "ejs");
app.use(express.static("./public"));
// app.use(cookieParser());

// routes
app.use(require("./routes/authroute"));

// listen and mongoose connect
mongoose
  .connect(
    "mongodb+srv://fury:mnm@cluster0.6lai5xn.mongodb.net/authjsonwebtoken"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`server start from localhost : ${port}`);
    });
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });


// cookies
app.get("/set-cookies", (req, res) => {
  // res.setHeader("set-Cookie", "name=true"); another method
  res.cookie("newuser", false, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.send("cookies sets");
});
app.get("/read-cookies", (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    res.json(cookies)
});
// not found in route
app.get("*", (req, res) => {
  res.send("404 found");
});
