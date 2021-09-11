const mongoose = require('mongoose');
const schema = mongoose.Schema;

const authorSchema = new Schema({
	name: String,
	age: String,
});

module.exports = mongoose.model('Author', bookSchema);
