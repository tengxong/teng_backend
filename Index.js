const express = require('express')
const app = express()
const cors = require('cors')
const bodyPaser = require('body-parser') 
const mysql = require('mysql')
const cookieparser =require('cookie-parser')
const port = 5003

const connection = mysql.createConnection({
  host: 'mydb.cu6unrorcuye.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: '1234jack',
  database: 'vite',
})

connection.connect()

// app.use(
//   cors({
//     origin: "https://frontend-wang-web.vercel.app",
//     credentials: true, // ເປີດ
//   })
// );

app.use(cookieparser())

app.use(bodyPaser.urlencoded({extended:false}));
app.use(bodyPaser.json());

app.get('/got/:id',(req,res) =>{

  var id =req.params.id;
  var params = [id]

  var sql ='SELECT * FROM user WHERE id'
    cls
    connection.query(sql,params,(err, rows, fields) =>{
        if(err) throw err
         res.send(rows)
    })

}) 

// chapter 14. ການທົດລອງອັບເດດຂໍ້ມູນ
app.put("/updateuser", (req, res) => {
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var id = req.body.id;
  var params = [email, username, password, firstname, lastname, id];
  var sql = `UPDATE users SET email = ?, username = ?, password=?, firstname=?,lastname=? WHERE id = ? `;
  connection.query(sql, params, (err, rows, fields) => {
    if (err) throw err;
    res.send("update Successfully");
  });
});

//  login page
app.post("/login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var params = [email, password];
  var sql = "SELECT id FROM users WHERE email = ? AND password = ?";
  connection.query(sql, params, (err, rows, fields) => {
    if (err) {
      throw err;
    } else {
      if (rows.length > 0) {
        res.cookie("login", rows[0].id); // Using cookie
        let data = {
          status: 200,
          message: "success",
        };
        res.send(data);
      } else {
        res.send("faild");
      }
    }
  });
});

// Route Cookie
app.post("/isLogIn", (req, res) => {
  console.log(req.cookies); // ການແຊັກເພື່ອເບີ່ງມີcookie ຫຍັງແດ່
  if (req.cookies.login) {
    let data = {
      status: 200,
      message: "logged in",
    };
    res.send(data);
  } else {
    res.send("No cookie");
  }
  res.send("Login");
});

app.listen(port)