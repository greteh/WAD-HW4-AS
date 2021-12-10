const express = require('express');
const app = express();
// listen for requests on port 3000
// register the ejs view engine
app.set('view engine', 'ejs')
app.listen(3000);
/* app.get() is used to respond to Get requests, and it takes two arguments:
1- arg1: represents what path/url you want to listen to (e.g., '/' listens to index path)
2- arg2: represents a function that takes in request and response objects */
app.get('/posts', (req, res) => {
    /*res.sendFile('./views/index.html', { root: __dirname }); */
    res.render('posts');
});

app.get('/addnewpost', (req, res) => {
    /*res.sendFile('./views/index.html', { root: __dirname }); */
    res.render('addnewpost');
});

app.get('/singlepost', (req, res) => {
    /*res.sendFile('./views/index.html', { root: __dirname }); */
    res.render('singlepost');
});

app.use((req, res) => {
    /*res.status(404).sendFile('./views/404.html', { root: __dirname });*/
    res.status(404).render('404');
});