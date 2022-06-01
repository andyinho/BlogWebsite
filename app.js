//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const aboutContent = "I live in Portland, Oregon but originally from Hood River. It's a small city located in the beautiful Colombia River Gorge about an hour from Portland. Being from a small city definitely had it's benefits. My friends lived nearby, school was always a few minutes away, and the community was always kind and welcoming. Early on I developed a passion for soccer and continued with it until the end of my college years. I played Division 2 and loved every moment of it. After I graduated with a bachelors in exercise and sports science with an empahsis in physical therapy, in 2020, I continued playing soccer in local leagues and pick up games throughout the Portland area. Although I was still involved with soccer, it didn't take nearly as much time as it did before which meant I had tons of spare time. During this time was when I wrote my first 'Hello World!' - it was exhilarating.";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//empty array which title and content get pushed to and saved
let posts = [];

let title = [];
let content = [];

app.get('/', function(req, res) {
  res.render('home', {
    home: homeContent,
    newPost: posts
  }); // res.render: assemble dynamic EJS file / res.sendFile: send complete static HTML file

});

app.get('/about', function(req, res) {
  res.render('about', {
    about: aboutContent
  });
});

app.get('/contact', function(req, res) {
  res.render('contact', {
    contact: contactContent
  });
});

app.get('/compose', function(req, res) {
  res.render('compose');
})

app.get('/post', function(req, res) {
  res.render('post');
})

app.post('/compose', function(req, res) {

  // stores input for both title and content
  const post = {
    title: req.body.postTitle,
    content: req.body.postContent
  };

  // pushed into global variable 'posts'
  posts.push(post);

  res.redirect('/');
});

//getting a dynamic website URL's
app.get('/post/:postName', function(req, res) {

  //replaces any spaces and uppercase letters w/ '-' and lowercase
  const requestedTitle = req.params.postName.toLowerCase().replaceAll('-',' ');

  posts.forEach(function(post) {

    const storedTitle = post.title.toLowerCase().replaceAll('-',' ');

    //renders new page with post title and content matching post/:postName
    if (storedTitle === requestedTitle) {
      res.render('post', {
        title: post.title,
        content: post.content
      })
    }
  });

});





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
