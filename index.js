const express = require('express');

const app = express();

app.use(express.json());

const users = [
  {
    name: 'Prateek',
    kidneys: [{ healthy: true }, { healthy: false }],
  },
  {
    name: 'John',
    kidneys: [{ healthy: false }, { healthy: false }],
  },
  {
    name: 'Jane',
    kidneys: [{ healthy: true }, { healthy: true }],
  },
];

//route to check how many kidneys and their health status
app.get('/', (req, res) => {
  const name = req.query.name;

  const requestedUser = users.find((user) => user.name === name);

  if (!requestedUser) {
    res.statusCode = 404;
    res.json({ message: 'User not found' });
  }

  const totalKidneys = requestedUser.kidneys.length;

  let healthyKidneys = 0;

  requestedUser.kidneys.forEach((k) => {
    if (k.healthy) healthyKidneys++;
  });

  const unhealthyKidneys = totalKidneys - healthyKidneys;

  res.statusCode = 200;
  res.json({
    name: requestedUser.name,
    totalKidneys,
    healthyKidneys,
    unhealthyKidneys,
  });
});

//route to add a new kidney
app.post('/', (req, res) => {
  const { name, kidneyStatus } = req.body;

  console.log(name, kidneyStatus);

  const requestedUser = users.find((user) => user.name === name);

  if (!requestedUser) {
    res.statusCode = 404;
    res.json({
      message: 'User not found',
    });
  } else {
    users
      .find((user) => user.name === name)
      .kidneys.push({ healthy: kidneyStatus });

    res.json({ message: 'Kidney inserted successfully' });
  }
});

//route to edit the kidney

app.put('/', (req, res) => {
  const { name, kidneyStatus, kidneyId } = req.body;

  const requestedUser = users.find((user) => user.name === name);

  if (!requestedUser) {
    res.statusCode = 404;
    res.json({ message: 'User not found' });
  } else {
    users.find((user) => user.name === name).kidneys[kidneyId].healthy =
      kidneyStatus;

    res.sendStatus = 200;
    res.json({ message: 'Kidney health updated' });
  }
});

//route to delete a kidney
app.delete('/', (req, res) => {
  const { name, kidneyId } = req.body;

  const requestedUser = users.find((user) => user.name === name);

  if (!requestedUser) {
    res.statusCode = 404;
    res.json({ message: 'User not found' });
  } else {
    users.find((user) => user.name === name).kidneys.splice(kidneyId, 1);

    res.json({ message: 'Kidney removed successfuly' });
  }
});

app.listen(3000);
