
var Post = require("./models/post");
var User = require("./models/user");


User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
   if(err){
       console.log(err);
   } else {
       console.log(user);
   }
});