import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { apiHandler } from '../../../utils/api-handler';
import userService from '../../../apis/userApi';
import {
	cartList,
	removeAll,
	totalCartPrice,
} from '../../../redux/features/cartSlice';

const CartSubmitOrder = () => {
	const antIcon = (
		<LoadingOutlined
			style={{
				fontSize: 24,
			}}
			spin
		/>
	);

	const dispatch = useDispatch();
	const [submitLoading, setSubmitLoading] = useState(false);
	const cartTotalPriceSelector = useSelector(totalCartPrice);
	const cartListSelector = useSelector(cartList);

	const successCallback = () => {
		const ids = cartListSelector.map((item) => item.id);

		dispatch(removeAll());
	};

	const handleSubmitOrder = () => {
		setSubmitLoading(true);
		const email = JSON.parse(localStorage.getItem('email'));
		const orderDetail = cartListSelector.map((item) => ({
			productId: item.id,
			quantity: item.quantity,
		}));
		const service = userService.submitOrder({
			email,
			orderDetail,
		});
		apiHandler({
			service,
			successMessage: 'Order Successfully!',
			errorMessage: 'Order failed!',
			successCallback,
			onFinally: () => setSubmitLoading(false),
		});
	};

	return (
		<div className="ml-auto flex items-center gap-6">
			<p className="text-lg inline-block">
				<span>Total:</span>
				{cartTotalPriceSelector ? cartTotalPriceSelector : 0}
			</p>
			<button
				disabled={cartListSelector.length === 0 && !submitLoading}
				style={{
					boxShadow:
						'0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)',
				}}
				className={`bg-[#faa962] rounded-md p-3 text-white  hover:bg-[#F2994A] ${
					cartListSelector.length > 0
						? 'cursor-pointer transition-all duration-150 ease-out active:scale-75'
						: 'cursor-not-allowed'
				}`}
				onClick={handleSubmitOrder}
			>
				{submitLoading && <Spin indicator={antIcon} />} submit order
			</button>
		</div>
	);
};

export default CartSubmitOrder;
