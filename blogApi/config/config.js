module.exports = {

    jwtSecret: process.env.JWT_SECRET || 'blogapitoken',

    dbUri: 'mongodb+srv://test1:sam12345@test1.t5ytgy8.mongodb.net/?retryWrites=true&w=majority&appName=test1',

    tokenExpiresIn: process.env.TOKEN_EXPIRES_IN || '1h',

  };

  
