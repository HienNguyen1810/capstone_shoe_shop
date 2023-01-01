import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/use-auth';
import EventBus from '../utils/EventBus';
import { removeAll } from '../redux/features/cartSlice';
import { setProductFavEmpty } from '../redux/features/userSlice';

const ProtectedRoute = () => {
	const { auth, setAuth } = useAuth();
	const location = useLocation();
	const dispatch = useDispatch();

	const token = localStorage.getItem('token');
	const email = localStorage.getItem('email');
	const logOut = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('email');
		dispatch(setProductFavEmpty());
		setAuth('');
		dispatch(removeAll());
	};
	useEffect(() => {
		EventBus.on('logout', () => {
			logOut();
		});
		return () => {
			EventBus.remove('logout');
		};
	}, []);
	return auth?.email || (JSON.parse(token) && JSON.parse(email)) ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default ProtectedRoute;
