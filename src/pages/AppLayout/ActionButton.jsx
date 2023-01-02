import React, { useEffect } from 'react';
import { BiUser } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Popover } from 'antd';
import { Tooltip } from 'antd';
import useAuth from '../../hooks/use-auth';
import EventBus from '../../utils/EventBus';
import { removeAll } from '../../redux/features/cartSlice';
import { setProductFavEmpty } from '../../redux/features/userSlice';

const activeStyle = {
	textDecoration: 'underline',
	color: '#1890ff',
};
const ActionButton = () => {
	const { setAuth } = useAuth();
	const dispatch = useDispatch();

	const email = JSON.parse(localStorage.getItem('email'));
	const token = JSON.parse(localStorage.getItem('token'));

	const isLogin = email && token;

	const text = (
		<p className="truncate w-[200px]">
			<Tooltip title={email && email}>{email && email}</Tooltip>
		</p>
	);

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
	const content = (
		<div className="flex flex-col">
			<NavLink
				to="user"
				className="w-full py-2"
				style={({ isActive }) => (isActive ? activeStyle : undefined)}
			>
				My Profile
			</NavLink>
			<button
				className="w-full py-2 text-left hover:text-[#1890ff]"
				onClick={logOut}
			>
				Logout
			</button>
		</div>
	);
	return (
		<>
			{isLogin ? (
				<Popover
					placement="bottomRight"
					title={text}
					content={content}
					trigger="click"
					className="truncate"
				>
					<div className="text-white cursor-pointer">
						<BiUser size={24} />
					</div>
				</Popover>
			) : (
				<>
					<NavLink
						to="login"
						className="hover:underline transition-all duration-150 ease-out active:scale-75 text-[#F6F6F6] opacity-80"
						style={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						Login
					</NavLink>
					<NavLink
						to="register"
						className="hover:underline transition-all duration-150 ease-out active:scale-75 text-[#F6F6F6] opacity-80"
						style={({ isActive }) => (isActive ? activeStyle : undefined)}
					>
						Register
					</NavLink>
				</>
			)}
		</>
	);
};

export default ActionButton;
