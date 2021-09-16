import { gql } from '@apollo/client';

const GET_BOOKS_QUERY = gql`
	query getBooks {
		books {
			name
			id
		}
	}
`;

const GET_AUTHORS_QUERY = gql`
	query getAuthors {
		authors {
			name
			id
		}
	}
`;

const GET_BOOK_QUERY = gql`
	query getBook($id: ID) {
		book(id: $id) {
			id
			name
			genre
			author {
				id
				name
				age
				books {
					name
					id
				}
			}
		}
	}
`;

const ADD_BOOK_MUTATION = gql`
	mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			name
			id
		}
	}
`;

const DELETE_BOOK_MUTATION = gql`
	mutation DeleteBook($id: ID!) {
		deleteBook(id: $id) {
			name
		}
	}
`;

export {
	GET_BOOKS_QUERY,
	GET_AUTHORS_QUERY,
	GET_BOOK_QUERY,
	ADD_BOOK_MUTATION,
	DELETE_BOOK_MUTATION,
};
