import { useQuery } from '@apollo/client';
import { useState } from 'react';

import { getBookQuery } from '../queries/queries';

function BookDetails(props) {
	const bookId = props.bookId;
	const book = useQuery(getBookQuery, {
		variables: {
			id: bookId,
		},
	});

	function displayBookDetails() {
		if (book.data && book.data.book) {
			console.log(book.data.book.name);
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
		}
	}
	return <div id="book-details">{displayBookDetails()}</div>;
}

export default BookDetails;
