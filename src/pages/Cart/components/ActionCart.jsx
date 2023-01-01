import React from 'react';
import { useDispatch } from 'react-redux';
import { notification } from 'antd';
import { removeCart, saveEditCart } from '../../../redux/features/cartSlice';

const ActionCart = ({ data }) => {
	const dispatch = useDispatch();
	const handleEditCart = () => {
		dispatch(saveEditCart({ id: data.id }));
	};
	const handleDeleteCart = () => {
		dispatch(removeCart({ id: data.id }));
		notification.success({
			message: <p>remove product {data.name} successfully!</p>,
		});
	};
	return (
		<div className="flex items-center gap-6">
			<button
				style={{
					boxShadow:
						'0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)',
				}}
				className="bg-[#6200EE] text-white w-[80px] h-[30px] rounded-[4px] transition-all duration-150 ease-out active:scale-75"
				onClick={() => handleEditCart()}
			>
				<span className="font-medium text-white text-sm">EDIT</span>
			</button>
			<button
				style={{
					boxShadow:
						'0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)',
				}}
				className="bg-[#EB5757] text-white w-[80px] h-[30px] rounded-[4px] transition-all duration-150 ease-out active:scale-75"
				onClick={() => handleDeleteCart()}
			>
				<span className="font-medium text-white text-sm">DELETE</span>
			</button>
		</div>
	);
};

export default ActionCart;
