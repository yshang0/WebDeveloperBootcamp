var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);



//adding a new cat to the DB

// var george = new Cat({
//     name:"George",
//     age: 11,
//     temperament: "g"
// });

// george.save(function(err, cat){
//     if(err){
//         console.log("")
        
//     } else {
//         console.log("we just saved");
//          console.log(cat);
//     }
// });

//retrieve all cats from the DB and console.log each one

Cat.find({}, function(err, cats){
    if(err){
        console.log("no");
        console.log(err);
    } else {
        console.log("all the cats.....");
        console.log(cats);
    }
});

Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
}, function(err, cat){
    if(err) {
        console.log("ss");
    } else {
        console.log(cat);
    }
});