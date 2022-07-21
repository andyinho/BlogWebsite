//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const homeContent = "Weekly articles about coding, personal milestones and projects - come follow the journey!";

const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//connnects to database called blogDB
mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true
});

//creates schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

//compiles schema into a model
const Post = mongoose.model('Post', postSchema);

app.get('/', function(req, res) {

  // finds all the posts in the post collection and renders them in the home page based on most recent
  Post.find().sort({
    $natural: -1
  }).exec(function(err, posts) {
    res.render('home', {
      home: homeContent,
      newPost: posts
    }); // res.render: assemble dynamic EJS file / res.sendFile: send complete static HTML file
  })

});

app.get('/compose', function(req, res) {
  res.render('compose');
})

app.get('/post', function(req, res) {
  res.render('post');
})

app.post('/compose', function(req, res) {

  //stores info for both title and content from form, creates new data
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postContent
  });

  //saves to database, redirects to homepage if no console.error();
  post.save(function(err) {
    if (!err) {
      res.redirect('/');
    }
  });
});

//getting a dynamic website URL's
app.get('/post/:title', function(req, res) {
  const requestedPostTitle = req.params.title;

  //looks through DB and finds matching title, renders page w title and content of matching title
  Post.findOne({
    title: requestedPostTitle
  }, function(err, post) {
    res.render('post', {
      title: post.title,
      content: post.content
    });
  });
});

app.get('/edit', function(req, res) {
  res.render('edit');
})

app.get('/edit/:postId', function(req, res) {
  const requestedPostId = req.params.postId;

  Post.findOneAndUpdate({
    _id: requestedPostId
  }, {
    $set: {
      title: req.body.editTitle,
      content: req.body.editContent
    }
  }, {
    new: true
  }, function(err, post) {
    if (err) {
      console.log(err);
    } else {
      res.render('edit', {
        title: post.title,
        content: post.content
      });
    }
  })
});

app.post('/edit', function(req, res) {

  //stores info for both title and content from form, creates new data
  const post = new Post({
    title: req.body.editTitle,
    content: req.body.editContent
  });

  //saves to database, redirects to homepage if no console.error();
  post.save(function(err) {
    if (!err) {
      res.redirect('/');
    }
  });
})


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

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
