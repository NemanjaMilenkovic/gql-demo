// import { gql } from 'apollo-boost';
// import { graphql } from 'react-apollo';
import { useQuery, gql } from '@apollo/client';

const getBooksQuery = gql`
	{
		books {
			name
			id
		}
	}
`;

function BookList() {
	const { name } = useQuery(getBooksQuery);
	console.log(name);
	return (
		<div className="main">
			<ul id="book-list">
				<li>Book Name</li>
			</ul>
		</div>
	);
}

export default BookList;
