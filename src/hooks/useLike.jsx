import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiHandler } from '../utils/api-handler';
import EventBus from './../utils/EventBus';
import userService from '../apis/userApi';
import { removeAll } from '../redux/features/cartSlice';
import {
	productFav,
	productFaveMappingKey,
	setProductFavEmpty,
} from '../redux/features/userSlice';
import useAuth from './use-auth';

export const useMayLike = (callback) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { setAuth } = useAuth();
	const productFaveMappingKeySelector = useSelector(productFaveMappingKey);
	const productFavSelector = useSelector(productFav);
	const email = JSON.parse(localStorage.getItem('email'));
	const token = JSON.parse(localStorage.getItem('token'));

	const isLogin = email && token;

	const logOut = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('email');
		dispatch(setProductFavEmpty());
		setAuth('');
		dispatch(removeAll());
	};

	const successCallback = () => {
		if (callback) return callback();
	};

	const failCallback = () => {
		logOut();
		navigate('/login', { replace: true, state: { from: location } });
	};

	useEffect(() => {
		EventBus.on('logout', () => {
			logOut();
		});
		return () => {
			EventBus.remove('logout');
		};
	}, []);

	const handleToggleLike = (e, value, productId) => {
		e.stopPropagation();
		const service = value
			? userService.getUserLike(productId)
			: userService.getUserUnLike(productId);
		apiHandler({
			service,
			successMessage: value
				? 'Like Product Successfully!'
				: 'Unlike Product Successfully!',
			errorMessage: 'Your session is expired, please login and try again!',
			successCallback,
			failCallback,
			// onFinally: () => setSubmitLoading(false),
		});
	};
	return {
		isLogin,
		productFaveMappingKeySelector,
		productFavSelector,
		handleToggleLike,
	};
};
