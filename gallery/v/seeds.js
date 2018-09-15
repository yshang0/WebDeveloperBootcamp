var mongoose = require("mongoose");
var Campground = require("./models/campground");

var data = [
    {name: ""},
    {
        
    }
]

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err) {
            console.log(err);
        }else {
            console.log("removed campgrounds!");
        }
    });
    
    //add a few campgrounds
    Campgrounds.create
    
    
    
    //add a few comments
}
module.exports = seedDB;


