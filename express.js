const express = require('express');
const PORT = process.env.PORT;
const app = express();
const {Client} = require('pg');
const bodyParser = require('body-parser');
app.use(bodyParser());
const cors = require('cors');

app.use(cors());
const client = new Client({
    connectionString: "postgres://memo_list_user:uTtiyjjwdYsoXDB9Jw5Xesw6gyJGyLTW@dpg-cd088n4gqg4ftbmsl96g-a.oregon-postgres.render.com/memo_list",
    ssl:{resolveObjectURL:false}
});
client.connect();

app.use(express.static('public'));
app.get('/api/memo',(req,res)=>{
    client.query('SELECT * FROM memo_table;')
    .then(result=>{
        res.send(result.rows);
    })
});

app.post('/api/memo',(req,res)=>{
    let newDescription = req.body.description;
    client.query('INSERT INTO memo_table (description) VALUES ($1);',[newDescription])
    .then(()=>{
        res.send(newDescription);
    });
});

app.delete('/api/memo',(req,res)=>{
    let id = req.body.id;
    console.log(req.body);
    client.query('DELETE FROM memo_table WHERE id = $1',[id])
    .then((data)=>{
        res.send();
    })
});

app.listen(PORT,()=>{
    console.log('Listening on port',PORT);
});