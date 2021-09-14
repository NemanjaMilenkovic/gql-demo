const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(
	'/graphql',
	graphqlHTTP({ schema, graphiql: process.env.NODE_ENV == 'development' })
);

const uri = 'mongodb://localhost:27017/gql-demo';

mongoose
	.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to database');
	});

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Express is listening on port ${PORT}`);
});
