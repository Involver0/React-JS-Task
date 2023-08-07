/////////////////////////////// Required ////////////////////////////

const express = require('express');
const mysql = require('mysql2');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { authenticate } = require('./middleware');

const server = express();
server.use(express.json());
server.use(cors());

/////////////////////////////// Config ////////////////////////////

const mysqlConfig = {
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'eventsdb',
};
const dbPool = mysql.createPool(mysqlConfig).promise();
/////////////////////////////// Schemas ////////////////////////////
const userSchema = joi.object({
  name: joi.string().trim().required(),
  email: joi.string().email().trim().lowercase().required(),
  password: joi.string().required(),
});

const userLoginSchema = joi.object({
  email: joi.string().email().trim().lowercase().required(),
  password: joi.string().required(),
});

/////////////////////////////// Test ////////////////////////////

server.get('/', authenticate, (req, res) => {
  console.log(req.user);
  res.status(200).send({ message: 'Success' });
});
/////////////////////////////// Login ////////////////////////////
server.post('/login', async (req, res) => {
  let payload = req.body;
  try {
    payload = await userLoginSchema.validateAsync(payload);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'All fields required' });
  }
  try {
    const [data] = await dbPool.execute(
      `SELECT * FROM organizers WHERE email = ?`,
      [payload.email]
    );

    if (!data.length) {
      return res.status(400).send({ error: 'Email or password did not match' });
    }
    const isPasswordMatching = await bcrypt.compare(
      payload.password,
      data[0].password
    );
    if (isPasswordMatching) {
      const token = jwt.sign(
        { email: data[0].email, id: data[0].id },
        'abc123'
      );
      return res.status(200).send({ token });
    }

    return res.status(400).send({ error: 'Email or password did not match' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Server Error' });
  }
});
/////////////////////////////// Register ////////////////////////////

server.post('/register', async (req, res) => {
  let payload = req.body;

  try {
    payload = await userSchema.validateAsync(payload);
  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    // Encrypt the password
    const encryptedPassword = await bcrypt.hash(payload.password, 10);
    // Insert the user into the database
    const [response] = await dbPool.execute(
      `INSERT INTO organizers (name, email, password)
        VALUES (?, ?, ?)`,
      [payload.name, payload.email, encryptedPassword]
    );
    console.log([response]);
    res.status(201).send({ success: 'user is created' });
  } catch (err) {
    return res.status(400).send({ error: 'user is not created' });
  }
});
/////////////////////////////// Attendee get ////////////////////////////
server.get('/attendees', async (_, res) => {
  try {
    const [attendees] = await dbPool.execute(
      'Select * FROM eventsdb.attendees'
    );
    return res.json(attendees);
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
});
/////////////////////////////// Attendee post ////////////////////////////
server.post('/attendees', authenticate, async (req, res) => {
  try {
    const authUser = req.user.id;
    console.log(authUser);
    const payload = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      age: req.body.age,
      Organizers_id: authUser,
    };

    const response = await dbPool.query('INSERT INTO attendees SET ?', payload);
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: 'Internal server error' });
  }
});
/////////////////////////////// Attendee put ////////////////////////////
server.put('/attendees/:id', authenticate, async (req, res) => {
  try {
    const attendeeId = req.params.id;
    const authUser = req.user.id;
    const payload = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      age: req.body.age,
      Organizers_id: authUser,
    };
    const [response] = await dbPool.execute(
      'UPDATE attendees SET email = ?, first_name = ?, last_name = ?, age = ? WHERE id = ?',
      [
        payload.email,
        payload.first_name,
        payload.last_name,
        payload.age,
        attendeeId,
      ]
    );

    if (response.affectedRows === 0) {
      return res.status(404).json({
        status: 404,
        error: 'Attendee not found',
      });
    }

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send(req.user);
  }
});
/////////////////////////////// Attendee delete ////////////////////////////
server.delete('/attendees/:id', authenticate, async (req, res) => {
  try {
    const attendeeId = req.params.id;

    const [response] = await dbPool.execute(
      'DELETE FROM attendees WHERE id = ?',
      [attendeeId]
    );

    if (response.affectedRows === 0) {
      return res.status(404).json({
        status: 404,
        error: 'Attendee not found',
      });
    }

    res.status(200).json({ message: 'Attendee deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
});

server.listen(8080, () => console.log('Server is listening to 8080 port'));
