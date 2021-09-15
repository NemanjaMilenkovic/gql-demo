import BookList from './components/BookList';
import AddBook from './components/AddBook';

function App() {
	return (
		<div className="main">
			<h1>Reading list</h1>
			<BookList />
			<AddBook />
		</div>
	);
}

export default App;
