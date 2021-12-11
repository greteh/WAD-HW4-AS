const express = require('express'); // moodul
const pool = require('./database');
const cors = require('cors'); // a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const app = express(); //  a module with functions or objects or variables assigned to it

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static('Public'));

app.listen(3000, () => {
    console.log("Server is listening to port 3000")
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/posts', async (req, res) => {
    try {
        console.log("get posts request has arrived");
        const posts = await pool.query(
            "SELECT * FROM PostTable"
        );
        res.render('posts', {posts: posts.rows});
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/singlepost/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(req.params.id);
        console.log("get a single post request has arrived");
        const posts = await pool.query(
            "SELECT * FROM PostTable WHERE id = $1", [id]
        );
        res.render('singlepost', {posts: posts.rows[0]});
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/posts/:id', async (req, res) => {
    try {
        const {id} = req.params;
        console.log("get a post request has arrived");
        const Apost = await pool.query(
            "SELECT * FROM PostTable WHERE id = $1", [id]
        );
        res.json(Apost.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post('/posts', async (req, res) => {
    try {
        const post = req.body;
        console.log(post);
        const newpost = await pool.query(
            "INSERT INTO PostTable(title, body, likes) values ($1, $2, $3) RETURNING *", [post.title, post.body, post.likes]
        );
        res.redirect('posts');
    } catch (err) {
        console.error(err.message)
    }
});
app.get('/create', (req, res) => {
    res.render('create');
});
app.use((req, res) => {
    res.status(404).render('404');
});