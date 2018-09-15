var express = require("express"); // (import) the express module and create an Express application.
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var seedDB = require("./seeds");


//When extended property is set to true, 
//the URL-encoded data will be parsed with the qs library.
//when extended property is set to false, 
//the URL-encoded data will instead be parsed with the querystring library.

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
    {
        name: "s", 
        image:"https://farm4.staticflickr.com/3828/9531852967_8299e728fc.jpg",
        description: "This is a huge granite hill, no bathrooms"
        
    }, function(err, campground){
       if(err){
           console.log(err);
       } else {
           console.log("NEWLY CREATED");
           console.log(campground);
       } 
    });



var campgrounds = [
        {},
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

//INDEX -show all campgrounds
app.get("/campgrounds", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
            console.log(err)
        } else {
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
    
});

//create - add new campgrounds
app.post("/campgrounds", function(req, res) {
    
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var des = req.body.description;
    var newCampground = {name: name, image: image, description: des}
    // create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
    
});


//NEW -show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

// SHOW -shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
    req.params.id
    //render show template with that campground
    res.send("THIS WILL BE THE SHOW PAGE ONE DAY!");
    
});


app.listen(process.env.PORT, process.env.IP, function(){
  console.log("The YelpCamp Server Has Started!");  
});

//start server: node app.js