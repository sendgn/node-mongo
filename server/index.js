const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:2717/mydb', { useNewUrlParser: true });

const { User } = require('./models');

const app = express();
app.use(bodyParser.json());

app.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

app.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
});

app.post('/users', async (req, res) => {
    let user = new User(req.body);
    user = await user.save();
    res.send(user);
});

app.put('/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.send(user);
});

app.delete('/users/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
});

app.listen(8888);
