const express = require('express');

const app = express();
const port = 8080;

const EventEmitter = require('eventemitter3');
const jobEmitter = new EventEmitter();

jobEmitter
  .on('after-creating-something', async (payload) => {
    await taskToBeProcessedAsynchronously('task after creating something');
  })
  .on('after-updating-something', async (payload) => {
    await taskToBeProcessedAsynchronously('task after updating something');
  });

app.use(express.json());

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const taskToBeProcessedAsynchronously = async (task) => {
  await sleep(3000);
  console.log('task processed -', task);
};

// create something
app.post('/something', async (req, res) => {
  jobEmitter.emit('after-creating-something');
  res.sendStatus(200);
});

// update something
app.put('/something/:id', async (req, res) => {
  jobEmitter.emit('after-updating-something');
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
