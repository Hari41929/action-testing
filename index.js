import express from 'express';
import connection from './model/db.js';
const app = express();
const port = 8000;

app.use(express.static("public"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get("/api/:id", (req, res) => {
    res.json({
        name: "hari",
        age: 21,
        tech: "full stack",
        urId: req.params.id
    });
});

app.post("/addUser",  (req, res) => {
         if (!req.body) {
            return res.status(400).json({ error: "Request body is missing" });
        }

        const { email, username, password } = req.body;
        console.log("Received data:", { email, username, password });
        const query = "insert into sample(email,username,password) values(?,?,?);"
        connection.query(query, [email, username, password], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Database error" });
            }
            res.json({ message: "User data logged successfully" });
        });
});

app.get('/getUser', (req, res) => {
    connection.query("select * from sample", (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`port is running on ${port}`);
});
