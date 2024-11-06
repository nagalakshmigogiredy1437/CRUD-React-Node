const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb",
});

con.connect(function (err) {
  if (err) {
    console.error("Error connecting: " + err);
  }
  console.log("Connected successfully");
});

app.post("/post", (req, res) => {
  console.log(req.body);
  const { name, email } = req.body;
  const sql = "INSERT INTO students (name, email) VALUES (?, ?)";
  con.query(sql, [name, email], (err, result) => {
    if (err) {
      console.error("Error inserting data: ", err);
      return res.status(500).send("Failed to insert data.");
    }
    res.send("Student data inserted successfully");
  });
});

app.get("/", (req, res) => {
  const sql = "select * from students";
  con.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      console.log(data);
      return res.json(data);
    }
  });
});

app.post("/update/:id", (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  const sql = "UPDATE students SET name = ?, email = ? WHERE id = ?";

  con.query(sql, [name, email, id], (err, result) => {
    if (err) {
      console.error("Error updating data: ", err);
      return res.json(err);
    }
    res.send("Student data updated successfully");
  });
});

app.get("/student/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT name, email FROM students WHERE id = ?"; // Corrected SQL syntax

  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error retrieving student data: ", err);
      return res.json(err);
    } else {
      return res.send(result[0]);
    }
  });
});
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM students WHERE id = ?"; // Corrected SQL syntax

  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleted student data: ", err);
      return res.json(err);
    } else {
      return res.send("deleted successfully");
    }
  });
});

app.listen(3001, () => {
  console.log("app listening on 3001");
});
