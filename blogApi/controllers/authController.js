const User = require('../models/User');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const config = require('../config/config');

const { validationResult } = require('express-validator');

const logger = require('../utils/logger');



exports.signup = async (req, res, next) => {

  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({ errors: errors.array() });

    }



    const { firstName, lastName, email, password } = req.body;





    let user = await User.findOne({ email });

    if (user) {

      return res.status(400).json({ msg: 'User already exists' });

    }





    user = new User({

      firstName,

      lastName,

      email,

      password,

    });





    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);



    await user.save();



    res.status(201).json({ msg: 'User created successfully' });

  } catch (err) {

    logger.error(`Error in signup: ${err.message}`);

    res.status(500).send('Server Error');

  }

};



exports.login = async (req, res, next) => {

  try {

    const { email, password } = req.body;





    let user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({ msg: 'Invalid Credentials' });

    }





    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {

      return res.status(400).json({ msg: 'Invalid Credentials' });

    }



    const payload = {

      user: {

        id: user.id,

      },

    };



    jwt.sign(

      payload,

      config.jwtSecret,

      { expiresIn: config.tokenExpiresIn },

      (err, token) => {

        if (err) throw err;

        res.json({ token });

      }

    );

  } catch (err) {

    logger.error(`Error in login: ${err.message}`);

    res.status(500).send('Server Error');

  }

};

  
