const express = require('express');

const app = express();
const port = 8080;

app.use(express.json());

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const taskToBeProcessedAsynchronously = async (task) => {
  await sleep(3000);
  console.log('task processed -', task);
};

// create something
app.post('/something', async (req, res) => {
  await taskToBeProcessedAsynchronously('task after creating something');
  res.sendStatus(200);
});

// update something
app.put('/something/:id', async (req, res) => {
  await taskToBeProcessedAsynchronously('task after updating something');
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
