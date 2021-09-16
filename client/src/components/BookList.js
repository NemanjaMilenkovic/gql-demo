import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Book from './Book';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

function BookList() {
	const [selected, setSelected] = useState(null);
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
								return (
									<li
										key={book.id}
										onClick={() => {
											setSelected(book.id);
										}}
									>
										{book.name}
										<button>x</button>
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
