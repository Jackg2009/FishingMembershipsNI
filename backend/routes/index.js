const express = require( 'express');

const userRoutes = require('./userRoutes');
const authRoutes = require( './authRoutes');
const clubRoutes = require("./clubRoutes");

const router = express.Router();

const baseURL = '/api';

router.use(`${baseURL}/users`, userRoutes);
router.use(`${baseURL}/auth`, authRoutes);
router.use(`${baseURL}/clubs`, clubRoutes);

module.exports = router;
