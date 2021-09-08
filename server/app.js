const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
app.use(
	'/graphql',
	graphqlHTTP({ schema, graphiql: process.env.NODE_ENV == 'development' })
);

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Express is listening on port ${PORT}`);
});
