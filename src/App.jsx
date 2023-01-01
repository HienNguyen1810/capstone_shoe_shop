import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppLayout } from './pages/AppLayout';
import CheckLogin from './pages/CheckLogin';
import ProtectedRoute from './pages/ProtectedRoute';
import './styles/app.less';

const Cart = lazy(() => import('./pages/Cart'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const SearchFilter = lazy(() => import('./pages/SearchFilter'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const Detail = lazy(() => import('./pages/Detail'));

function App() {
	return (
		<Routes>
			<Route element={<CheckLogin />}>
				<Route path="/" element={<AppLayout />}>
					<Route path="login" element={<Login />} />
				</Route>
			</Route>

			<Route element={<CheckLogin />}>
				<Route path="/" element={<AppLayout />}>
					<Route path="register" element={<Register />} />
				</Route>
			</Route>

			<Route path="/" element={<AppLayout />}>
				<Route index element={<Home />} />
			</Route>

			<Route path="/" element={<AppLayout />}>
				<Route path="search-filter" element={<SearchFilter />} />
			</Route>

			<Route path="/" element={<AppLayout />}>
				<Route path="detail/:id" element={<Detail />} />
			</Route>
			<Route element={<ProtectedRoute />}>
				<Route path="/" element={<AppLayout />}>
					<Route path="cart" element={<Cart />} />
				</Route>
			</Route>

			<Route element={<ProtectedRoute />}>
				<Route path="/" element={<AppLayout />}>
					<Route path="user" element={<UserProfile />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
