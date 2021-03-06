import { useQuery } from '@apollo/client';
import { GET_BOOK_QUERY } from '../queries/queries';

function BookDetails(props) {
	const bookId = props.bookId;
	const book = useQuery(GET_BOOK_QUERY, {
		variables: {
			id: bookId,
		},
	});

	function displayBookDetails() {
		if (book.data && book.data.book) {
			return (
				<div>
					<h3>
						<strong>{book.data.book.name}</strong>
					</h3>
					<p>
						Genre: <strong>{book.data.book.genre}</strong>
					</p>
					<p>
						Author: <strong>{book.data.book.author.name}</strong>
					</p>
					<br />
					<p>Other titles by {book.data.book.author.name}:</p>
					<ul className="other-books">
						{book.data.book.author.books.map((book) => (
							<li>
								<strong>{book.name}</strong>
							</li>
						))}
					</ul>
				</div>
			);
		} else if (props.bookId) {
			return (
				<h4>
					<div>Loading book details...</div>
				</h4>
			);
		}
	}
	return <div id="book-details">{displayBookDetails()}</div>;
}

export default BookDetails;
