import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth.context';
import App from './App';
import { fetchProducts } from './redux/features/productSlice';
import store from './redux/store';
import './styles/app.less';

store.dispatch(fetchProducts({ keyword: '' }));
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<AuthProvider>
					<App />
				</AuthProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
