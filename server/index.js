const express = require('express');
const app = express();
const morgan = require('morgan')
// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});