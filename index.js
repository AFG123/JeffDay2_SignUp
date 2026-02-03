require('dotenv').config();
const express = require('express');
const { connect } = require('mongoose');
const app = express();
const connectDB = require('./config/db');
const Athlete = require('./models/Athlete');
const athleteRoutes = require('./routes/athleteRoutes');
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use('/', athleteRoutes);

app.listen(3000);