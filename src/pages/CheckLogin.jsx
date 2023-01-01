import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const CheckLogin = () => {
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';
	const email = JSON.parse(localStorage.getItem('email'));
	const token = JSON.parse(localStorage.getItem('token'));

	return !email || !token ? <Outlet /> : <Navigate to={from} />;
};

export default CheckLogin;
