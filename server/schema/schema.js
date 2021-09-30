const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
} = graphql;

const admin = require('firebase-admin');
const serviceAccount = require('../service_account.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				return Author.findById(parent.authorId);
			},
		},
	}),
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			async resolve(parent, args) {
				console.log(parent);
				const booksRef = await admin.firestore().collection('books');
				const booksSnap = await booksRef
					.where('authorId', '==', parent.id)
					.get()
					.then((snap) => {
						snap.forEach((doc) => {
							console.log(doc.id);
						});
					});
				return booksSnap.docs.map((book) => book.data());
			},
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: {
				id: { type: GraphQLID },
			},
			resolve(parent, args) {
				return Book.findById(args.id);
			},
		},
		author: {
			type: AuthorType,
			args: {
				id: { type: GraphQLID },
			},
			async resolve(parent, args) {
				const authors = await admin.firestore().doc(`authors/${args.id}`).get();
				return authors.docs.map((author) => author.data());
				// return Author.findById(args.id);
			},
		},
		books: {
			type: new GraphQLList(BookType),
			async resolve(parent, args) {
				const books = await admin.firestore().collection('books').get();
				return books.docs.map((book) => book.data());
			},
		},
		authors: {
			type: new GraphQLList(AuthorType),
			async resolve(parent, args) {
				const authors = await admin.firestore().collection('authors').get();
				return authors.docs.map((author) => author.data());
				// return Author.find({});
			},
		},
	},
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				let author = new Author({
					name: args.name,
					age: args.age,
				});
				return author.save();
			},
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				authorId: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				let book = new Book({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId,
				});
				return book.save();
			},
		},
		deleteBook: {
			type: BookType,
			args: {
				id: { type: GraphQLID },
			},
			resolve(parent, args) {
				console.log('called', args);
				return Book.findByIdAndRemove(args.id);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
