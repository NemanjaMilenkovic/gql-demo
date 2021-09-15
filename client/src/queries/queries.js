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
		}
	}
`;

export { getAuthorsQuery, getBooksQuery };
