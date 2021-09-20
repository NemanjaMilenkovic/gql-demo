const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

const uri =
	'mongodb+srv://user:gKt0wGWik1dkv1u7@cluster0.ncm9r.mongodb.net/gql-demo?retryWrites=true&w=majority';

mongoose
	.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to database');
	});

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Express is listening on port ${PORT}`);
});
