const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//To use ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("public"));
app.use(express.static(__dirname + '/public'));

let workItems = [];
let items = ["Srikanth", "Rao", "Parcha"];

app.get("/", function(req, res){
  let today = new Date();
  let currentDay = today.getDay();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("en-US", options)
  res.render("list", {
    listTitle: day,
    newListItems: items
  });

})

app.post("/", function(req, res){
  // console.log(req.body);
  let item = req.body.newItem

  if (req.body.list == "Work List"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }
})

// ///////////work
app.get("/work", function(req, res){
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  })
})

app.post("/work", function(req, res){
  console.log(req.body);
  let workItem = req.body.newItem;
  workItems.push(workItem);
  res.redirect("/work");
})

app.get("/about", function(req, res){
  res.render("about");
})


app.listen(3000, function(){
  console.log("The server is up and running om port 3000");
})
