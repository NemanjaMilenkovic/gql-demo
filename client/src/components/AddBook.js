import { useQuery } from '@apollo/client';
import { getAuthorsQuery } from '../queries/queries';

function AddBook() {
	const data = useQuery(getAuthorsQuery);
	// console.log(data.data.authors);

	return (
		<form id="add-book">
			<div className="field">
				<label>Book name:</label>
				<input type="text" />
			</div>
			<div className="field">
				<label>Genre:</label>
				<input type="text" />
			</div>
			<div className="field">
				<label>Author:</label>
				<select>
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
			<button>+</button>
		</form>
	);
}

export default AddBook;
