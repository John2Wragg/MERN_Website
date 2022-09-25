let express = require("express");
let app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const path = require('path');

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'build'))); // using build folder or react
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: "ThePassword" //can be moved to env file
  resve: false,
   saveUninitialized: false
}));

// using passport for authentication and security.

app.use(passport.initialize());
app.use(passport.session());


// setting up mongo DB using mongoose
var uri = "mongodb+srv://..." // change back to <password> when on Git
mongoose.connect(uri, { useNewUrlParser: true}, ()=> {
  console.log("Successfully connected to Mongo DB")
});

// mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

// adding plugin to mongoose schema - this will hash / salt passwords.
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

// configure the passport local mongoose
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// const testUser = new User ({
//   email: "test@email.com",
//   password: "testing123"
// });
//
// testUser.save();
// User.collection.deleteMany({}); uncomment to clear DB.

User.find(function(err,users){
  if(err){
    console.log(err)
  } else {
    console.log(users)
  }
});

app.route("/login")
  .get((req,res) => {
  res.render("login")
  })

  .post((req,res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });

    req.login(user, function(err){
      if (err){
        console.log(err)
        res.redirect("/login");
      } else {
        passport.authenticate("local")(req, res, function(){
          res.redirect("/index");
        });
      }
    })
});


app.route("/signup")

  .get((req,res) => {
    res.render("signup")
  })

  .post((req,res) => {
    User.register({username: req.body.username}, req.body.password, function(err, user){
      if(err){
        console.log(err)
        res.redirect("/signup");
      } else {
        passport.authenticate("local")(req,res, function(){
          res.redirect("/index");
        });
      }
    });
  });

app.get("/index", (req,res)=>{
  if (req.isAuthenticated()){
    res.render("index");
  } else {
    res.redirect("/login");
  }
})

app.get("/logout", (req,res) => {
  req.logout(function(err){
    if(err){
      console.log(err)
    } else {
      res.render("logout")
    }
  });
});

app.get("/calendar", (req,res)=>{
  // res.render("calendar")
  if (req.isAuthenticated()){
    res.sendFile(path.join(__dirname,'build','index.html'));
  } else {
    res.redirect("/login");
  }


});

app.listen(3000, function(){
  console.log("server on port 3000")
});
