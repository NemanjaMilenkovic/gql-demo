const express = require('express');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
console.log(process.env.MONGODB_USERNAME);
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.ncm9r.mongodb.net/gql-demo?retryWrites=true&w=majority`;

mongoose
	.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to database');
	});

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Express is listening on port ${PORT}`);
});
