const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

function addNewTask(tasks, taskId, text, priority) {
  tasks.push({
    taskId: taskId,
    text: text,
    priority: priority,
  });
}

function sortTaskByPriority(tasks) {
  let taskCopy = tasks;
  let result = taskCopy.sort((a, b) => a.priority - b.priority);
  return result;
}

function editTaskPriority(tasks, taskId, priority) {
  tasks.forEach((ele) => {
    if (ele.taskId === taskId) {
      ele.priority = priority;
    }
  });
}

function updateTaskText(tasks, taskId, text) {
  tasks.forEach((ele) => {
    if (ele.taskId === taskId) {
      ele.text = text;
    }
  });
}

function deleteTask(tasks, taskId) {
  return tasks.filter((ele) => ele.taskId !== taskId);
}

function filterByPriority(tasks, priority) {
  return tasks.filter((ele) => ele.priority === priority);
}

app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  addNewTask(tasks, taskId, text, priority);
  res.json({ tasks: tasks });
});

app.get('/tasks', (req, res) => {
  res.json({ tasks: tasks });
});

app.get('/tasks/sort-by-priority', (req, res) => {
  let result = sortTaskByPriority(tasks);
  res.json({ tasks: result });
});

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  editTaskPriority(tasks, taskId, priority);
  res.json({ tasks: tasks });
});

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  updateTaskText(tasks, taskId, text);
  res.json({ tasks: tasks });
});

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  tasks = deleteTask(tasks, taskId);
  res.json({ tasks: tasks });
});

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = filterByPriority(tasks, priority);
  res.json({ tasks: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
