const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/cantina', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  cpf: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['merendeira', 'nutricionista'] }
});

userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

const User = mongoose.model('User', userSchema);

app.use(express.json());

app.post('/signup', async (req, res) => {
  try {
    const { name, email, cpf, password, role } = req.body;
    const user = new User({ name, email, cpf, password, role });
    await user.save();
    res.status(201).send('Usuario criado corretamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Não funcionou');
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('Usuario nao encontrado');
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).send('Senha invalida');
    res.status(200).send('Login feito');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao logar');
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao puxar users');
  }
});

app.listen(PORT, () => {
  console.log(`Server rodando na porta http://localhost:${PORT}`);
});
