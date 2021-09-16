import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, getBooksQuery } from '../queries/queries';
import { addBookMutation } from '../queries/queries';

function AddBook() {
	const [formState, setFormState] = useState({
		name: '',
		genre: '',
		authorId: '',
	});

	const data = useQuery(getAuthorsQuery);
	const [addBook] = useMutation(addBookMutation);

	const submitForm = (e) => {
		e.preventDefault();
		addBook({
			variables: {
				name: formState.name,
				genre: formState.genre,
				authorId: formState.authorId,
			},
			refetchQueries: [{ query: getBooksQuery }],
		});
	};

	return (
		<form
			id="add-book"
			onSubmit={(e) => {
				submitForm(e);
			}}
		>
			<div className="field">
				<label>Book name:</label>
				<input
					type="text"
					onChange={(e) => {
						console.log(formState);
						setFormState({ ...formState, name: e.target.value });
					}}
				/>
			</div>
			<div className="field">
				<label>Genre:</label>
				<input
					type="text"
					onChange={(e) => {
						console.log(formState);
						setFormState({ ...formState, genre: e.target.value });
					}}
				/>
			</div>
			<div className="field">
				<label>Author:</label>
				<select
					onChange={(e) => {
						return setFormState({
							...formState,
							authorId: e.target.value,
						});
					}}
				>
					<option>Select author</option>
					{data.loading
						? null
						: data.data.authors.map((author) => {
								return (
									<option key={author.id} value={author.id}>
										{author.name}
									</option>
								);
						  })}
				</select>
			</div>
			<button type="submit">+</button>
		</form>
	);
}

export default AddBook;
