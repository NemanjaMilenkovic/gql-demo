import { useQuery } from '@apollo/client';
import Book from './Book';
import { getBooksQuery } from '../queries/queries';

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
