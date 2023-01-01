import React, { useEffect } from 'react';
import { AiOutlineHistory } from 'react-icons/ai';
import { MdSecurity } from 'react-icons/md';
import { RiHeart3Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';
import _ from 'lodash';
import ChangePassTab from './components/ChangePassTab';
import HistoryList from './components/HistoryList';
import ProductFavourite from './components/ProductFavourite';
import UserForm from './components/UserForm';
import EventBus from '../../utils/EventBus';
import { getUserProfile, userProfile } from '../../redux/features/userSlice';
import './index.less';

const UserProfile = () => {
	const dispatch = useDispatch();
	const onChangeTab = (key) => {};

	useEffect(() => {
		dispatch(getUserProfile());
	}, []);

	return (
		<section className="mt-24">
			<div
				className=" my-[46px] pl-7 py-[7px] bg-gradient-to-b "
				style={{
					background: 'linear-gradient(180deg, #F21299 0%, #1B02B5 100%)',
				}}
			>
				<h1 className="text-[40px] font-[400] text-white">Profile</h1>
			</div>
			<UserForm />
			<Tabs
				defaultActiveKey="1"
				onChange={onChangeTab}
				items={[
					{
						label: (
							<div className="flex items-center gap-3">
								<AiOutlineHistory />
								<span>Order history</span>
							</div>
						),
						key: '1',
						children: <HistoryList />,
					},
					{
						label: (
							<div className="flex items-center gap-3">
								<RiHeart3Line />
								<span>Favourite</span>
							</div>
						),
						key: '2',
						children: <ProductFavourite />,
					},
					{
						label: (
							<div className="flex items-center gap-3">
								<MdSecurity />
								<span>Change Password</span>
							</div>
						),
						key: '3',
						children: <ChangePassTab />,
					},
				]}
			/>
		</section>
	);
};

export default UserProfile;
