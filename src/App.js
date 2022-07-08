import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import StopsContainer from './components/stops/Stops';

function App() {
	return (
		<Provider store={store}>
			<StopsContainer />
		</Provider>
	);
}

export default App;
