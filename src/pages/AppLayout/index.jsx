import React, { Suspense, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet } from 'react-router-dom';
import LoadingPage from './../../components/LoadingPage';
import { totalCartQuantity } from '../../redux/features/cartSlice';
import { getProductFav } from '../../redux/features/userSlice';
import ActionButton from './ActionButton';

const activeStyle = {
	textDecoration: 'underline',
	color: '#1890ff',
};
export const AppLayout = (props) => {
	const dispatch = useDispatch();

	const cartQuantitySelector = useSelector(totalCartQuantity);
	const email = JSON.parse(localStorage.getItem('email'));
	const token = JSON.parse(localStorage.getItem('token'));

	const isLogin = email && token;

	useEffect(() => {
		if (isLogin) {
			dispatch(getProductFav());
		}
	}, [isLogin]);

	return (
		<div className="max-w-[1300px] my-0 m-auto px-[10px]">
			<header className="header relative">
				<div className="header-top flex justify-between bg-black p-2">
					<Link to="/" className="cursor-pointer ml-[24px]">
						<img src="/image 3.png" className="object-cover" alt="" />
					</Link>
					<div className="header-action flex text-white items-center gap-6 mr-[20px]">
						<NavLink
							to="/search-filter"
							className="flex items-center gap-1 text-xl hover:text-[#1890ff]"
							style={({ isActive }) => (isActive ? activeStyle : undefined)}
						>
							<BiSearch />
							<span>Search</span>
						</NavLink>
						<NavLink to="cart" className="flex gap-2">
							<img src="/image 8.png" alt="card" className="cursor-pointer" />
							<p className="text-2xl">
								({cartQuantitySelector ? cartQuantitySelector : 0})
							</p>
						</NavLink>
						<ActionButton />
					</div>
				</div>
				<div className="header-bottom pt-[16px] pl-[24px] absolute w-[100%]">
					<ul className="flex gap-[24px]">
						<li className="">
							<NavLink
								style={({ isActive }) => (isActive ? activeStyle : undefined)}
								to={'/'}
							>
								Home
							</NavLink>
						</li>
						<li>
							<a href="#">Men</a>
						</li>
						<li>
							<a href="#">Woman</a>
						</li>
						<li>
							<a href="#">Kid</a>
						</li>
						<li>
							<a href="#">Sport</a>
						</li>
					</ul>
				</div>
			</header>

			<Suspense
				fallback={
					<div
						className="w-full h-full flex items-center justify-center"
						style={{ height: '100vh' }}
					>
						<LoadingPage />
					</div>
				}
			>
				<Outlet />
			</Suspense>

			<footer className="pt-[106px] ">
				<div className="max-w-[1136px] mx-auto grid grid-cols-3 gap-[67px] py-9">
					<div className="border-r border-r-[#DEDDDC]">
						<h3 className="font-[700] text-xl mb-[6px]">GET HELP</h3>
						<ul>
							<li className="text-base">Home</li>
							<li className="text-base">Nike</li>
							<li className="text-base">Adidas</li>
							<li className="text-base">Contact</li>
						</ul>
					</div>
					<div className="border-r border-r-[#DEDDDC]">
						<h3 className="font-[700] text-xl mb-[6px]">SUPPORT</h3>
						<ul className="text-base">
							<li className="text-base">About</li>
							<li className="text-base">Contact</li>
							<li className="text-base">Help</li>
							<li className="text-base">Phone</li>
						</ul>
					</div>
					<div>
						<h3 className="font-[700] text-xl mb-[6px]">REGISTER</h3>
						<ul className="text-base">
							<li className="text-base">register</li>
							<li className="text-base">login</li>
						</ul>
					</div>
				</div>
				<div className="bg-[#D9D9D9] text-center py-5">
					<span className="text-xl font-[400]">
						© 2022 Cybersoft All Rights Reserved | Design Theme by Trương Tấn
						Khải.
					</span>
				</div>
			</footer>
		</div>
	);
};
