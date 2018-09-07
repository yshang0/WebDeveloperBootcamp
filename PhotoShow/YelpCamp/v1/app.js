var express = require("express"); // (import) the express module and create an Express application.
var app = express();
var bodyParser = require("body-parser");


//When extended property is set to true, 
//the URL-encoded data will be parsed with the qs library.
//when extended property is set to false, 
//the URL-encoded data will instead be parsed with the querystring library.
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var campgrounds = [
        {name: "s", image:"https://farm4.staticflickr.com/3828/9531852967_8299e728fc.jpg"},
        {name: "g", image:"https://farm4.staticflickr.com/3624/3331133595_383a1c19c6.jpg"},
        {name: "y", image:"https://farm6.staticflickr.com/5042/5303791663_06cefbeb4c.jpg"},
        {name: "s", image:"https://farm4.staticflickr.com/3828/9531852967_8299e728fc.jpg"},
        {name: "g", image:"https://farm4.staticflickr.com/3624/3331133595_383a1c19c6.jpg"},
        {name: "y", image:"https://farm6.staticflickr.com/5042/5303791663_06cefbeb4c.jpg"},
        {name: "s", image:"https://farm4.staticflickr.com/3828/9531852967_8299e728fc.jpg"},
        {name: "g", image:"https://farm4.staticflickr.com/3624/3331133595_383a1c19c6.jpg"},
        {name: "y", image:"https://farm6.staticflickr.com/5042/5303791663_06cefbeb4c.jpg"}
        ];


//it shows a route definition. 
//The app.get() method specifies a callback function that will be invoked whenever there is an HTTP GET request with a path ('/') relative to the site root. 
//The callback function takes a request and a response object as arguments, and simply calls send() on the response to return the string.

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    
        
    res.render("campgrounds", {campgrounds:campgrounds});
});


app.post("/campgrounds", function(req, res) {
    
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("The YelpCamp Server Has Started!");  
});

//start server: node app.js