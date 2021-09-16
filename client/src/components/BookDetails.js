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
					<h3>{book.data.book.name}</h3>
					<p>{book.data.book.genre}</p>
					<p>{book.data.book.author.name}</p>
					<p>{book.data.book.author.age}</p>
					<ul className="other-books">
						{book.data.book.author.books.map((book) => (
							<li>{book.name}</li>
						))}
					</ul>
				</div>
			);
		}
	}
	return <div id="book-details">{displayBookDetails()}</div>;
}

export default BookDetails;
