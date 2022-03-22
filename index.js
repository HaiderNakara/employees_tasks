var express = require("express");
const bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());

let employees = [];

app.get("/", (req, res) => {
  res.send(employees);
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  const emp = employees.find((e) => e._id === id);
  if (emp) {
    return res.send(emp);
  } else {
    return res.status(404).send("Employee not found");
  }
});
app.post("/", (req, res) => {
  const emp = req.body;
  const isExist = employees.find((e) => e._id === emp._id);
  if (isExist) {
    return res.status(400).send("Employee already exists");
  }

  employees.push(req.body);
  return res.send(req.body);
});
app.delete("/:id", (req, res) => {
  employees = employees.filter((emp) => emp._id !== req.params.id);
  return res.send("Employee deleted");
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});

