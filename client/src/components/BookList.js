import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Book from './Book';
import { GET_BOOKS_QUERY, DELETE_BOOK_MUTATION } from '../queries/queries';
import BookDetails from './BookDetails';

function BookList() {
	const [selected, setSelected] = useState(null);
	const data = useQuery(GET_BOOKS_QUERY);
	const [deleteBook] = useMutation(DELETE_BOOK_MUTATION);

	const onDelete = (bookId) => {
		deleteBook({
			variables: {
				id: bookId,
			},
			refetchQueries: [{ query: GET_BOOKS_QUERY }],
		});
	};
	return (
		<div className="main">
			<ul id="book-list">
				<Book
					book={
						data.loading ? (
							<div>Loading books...</div>
						) : (
							data.data.books.map((book) => {
								return (
									<li
										key={book.id}
										onClick={() => {
											setSelected(book.id);
										}}
									>
										{book.name}
										<button
											onClick={() => {
												onDelete(book.id);
											}}
										>
											x
										</button>
									</li>
								);
							})
						)
					}
				/>
			</ul>
			<BookDetails bookId={selected} />
		</div>
	);
}

export default BookList;
