
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'})
//root 폴더에 있는 upload폴더를 file(image)가 업로드되는 공간으로 설정


app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMERDATA WHERE isDeleted = 0",
        (err, rows, fields) => {
            res.send(rows); //select문으로 가져온 데이터는 rows라는 변수로 처리 
        }
    );
});

//사용자가 upload 폴더의 파일들에 접근해 image를 확인하기 위해
//사용자는 /image로 접근을 하는데 이걸 /upload로 맵핑
//multer 라이브러리가 자동으로 fileName을 겹치지 않게 생성해줌
app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req,res)=>{
    let sql = 'INSERT INTO CUSTOMERDATA VALUES (null, ?, ?, ?,?,?,?, 0, now())';
    let image = '/image/' + req.file.filename;
    let name= req.body.name;
    let birthday= req.body.birthday;
    let gender= req.body.gender;
    let address= req.body.address;
    let contact= req.body.contact;
    // console.log(name);
    // console.log(image);
    // console.log(birthday);
    // console.log(gender);
    // console.log(job);
    let params = [image, name, birthday, gender, address, contact];
    connection.query(sql, params,
        (err, rows, fields)=> {
            res.send(rows);
            // console.log(err);
            // console.log(rows);
        })
})

app.delete('/api/customers/:id', (req, res)=>{
    let sql = "UPDATE CUSTOMERDATA SET isDeleted = 1 WHERE id= ?";
    let params = [req.params.id];
    connection.query(sql,params,
        (err, rows, fields)=>{
            res.send(rows);
        }
        )
})

app.listen(port, ()=> console.log(`Listening on port ${port}`));