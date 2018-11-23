const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// heroku uses the default port from env variable, to test in localhost this variable cannot be found so set 3000 if the env variable is not found for testing locally
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// logging
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log("unable to append to server.log");
    }    
  });
  next();
});

//maintenance
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// app.use is to use the middleware.. let users access the public folder for users to view the files
app.use(express.static(__dirname + "/public")); 

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// app.get will set the handler for HTTP get request
app.get('/', (req, res) => {
  // //res.send('Hello Express!');
  // res.send({
  //   name: 'Bob',
  //   hobbies: [
  //     "Music",
  //     "Movies",
  //     "learning"
  //   ]
  // });
  res.render('home.hbs', {
    pageDocumentTitle: 'Home Page',
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to our home page...'
  });
});

app.get('/about', (req, res) => {
  //res.send('<h1>Hello express!</h1>')
  res.render('about.hbs', {
    pageTitle: 'About Page template'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'An error occurred.... '
  });
});

// set port number to listen for requests
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}...`);
}); 