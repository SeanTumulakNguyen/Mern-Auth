const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// connect to database
mongoose
	.connect(process.env.CLOUD_DATABASE, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => console.log('DB CONNECTED'))
	.catch((err) => console.log('DB CONNECTION ERROR', err));

// import routes
const authRoutes = require('./routes/auth');

// app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// app.use(cors())
if ((process.env.NODE_ENV = 'development')) {
	app.use(cors({ origin: `http://localhost:3000` }));
}

// middleware
app.use('/api', authRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
