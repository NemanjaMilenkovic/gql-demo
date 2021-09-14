import { useQuery, gql } from '@apollo/client';
import Book from './Book';

const getBooksQuery = gql`
	query getBooks {
		books {
			name
			id
		}
	}
`;
function BookList() {
	const data = useQuery(getBooksQuery);

	return (
		<div className="main">
			<ul id="book-list">
				<Book
					book={
						data.loading ? (
							<div>Loading books...</div>
						) : (
							data.data.books.map((book) => {
								return <li key={book.id}>{book.name}</li>;
							})
						)
					}
				/>
			</ul>
		</div>
	);
}

export default BookList;
