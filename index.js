const express = require("express");
const app = express();
const knex = require("./connection");

app.use(express.json());

const PORT = 3000;
const tableName = "todo";

app.get("/get", async (req, res) => {
  try {
    const data = await knex(tableName).select("*");
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/post", async (req, res) => {
  try {
    const body = req.body;
    const todo = await knex("todo").insert(body);
    const new_todo_id = todo[0];
    const data = await knex("todo").where("todo_id", new_todo_id);
    res.send(data);
    console.log(body);
  } catch (error) {
    console.log(error);
  }
});

app.put("/update/:todo_id", async (req, res) => {
  try {
    const todo_id = req.params.todo_id;
    const body = req.body;
    const update = await knex("todo").where("todo_id", todo_id).update(body);
    const data = await knex("todo").where("todo_id", todo_id);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete/:todo_id", async (req, res) => {
  try {
    const todo_id = req.params.todo_id;
    const drop = await knex("todo").where("todo_id", todo_id).delete();
    const data = await knex("todo").where("todo_id", todo_id);
    res.send(data.toString());
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is work to http://localhost:${PORT}`);
});
