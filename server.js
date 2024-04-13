const express = require("express");
const articleRouter = require("./routes/articles");
const mongoose = require("mongoose");
const Article = require("./dbModels/articles");
const methodOverride = require("method-override");
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/blog");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: "desc" });
    res.render("articles/index", { articles: articles });
  } catch (error) {
    console.log(error);
  }
});
app.use("/articles", articleRouter);
app.listen(5000);
