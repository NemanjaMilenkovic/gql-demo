import { gql } from '@apollo/client';

const getBooksQuery = gql`
	query getBooks {
		books {
			name
			id
		}
	}
`;

const getAuthorsQuery = gql`
	query getAuthors {
		authors {
			name
			id
		}
	}
`;

const getBookQuery = gql`
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

const addBookMutation = gql`
	mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			name
			id
		}
	}
`;

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery };
