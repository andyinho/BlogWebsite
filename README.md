# BlogWebsite
This is a blog website using EJS, MongoDB/Mongoose, Express, Node, and Body-Parser. It will be used to post updates about personal milestones, current learning stack, and more!

## Version History & Commits

###### 0.1 Version
Basic structure of blog - Home, About, Compose, and Contact Page. EJS templating for each post. You can compose a post through the /compose route. All posts are saved as objects to the posts array in the app.js file. Home page displays all posts in data by oldest to newest. No DB yet - all posts are deleted once server is restarted.

###### 0.2 Version
A Posts file is created. Posts now have their own page when clicked on - URL is unique to post title. Deleted unnecessary variables. Updated About page, title in the header, and brand name. Other minor changes were made.

###### 0.3 Version
Database added - uses MongoDB and Mongoose to build schema for localhost. Revamped Home.ejs, About.ejs, and Compose.ejs - Bootstrap 5. Reorganized header.ejs and footer.ejs to better fit with overall look. Background image was added for Home page - later redesigned and removed to give a more simplistic look.

###### 0.4 Version
Displays posts by most recent to oldest. Added cards to display title, < 100 word character count, and image at the top of the card - Bootstrap 5. An Edit.ejs file has been added to route to an edit page for requested post - very basic layout of feature, not yet completed. Removed unnecessary images. Added a required tag to the title and content of the postSchema. Fixed bug where nav bar tabs were highlighted and expanded past viewport size on screens < 767px.
