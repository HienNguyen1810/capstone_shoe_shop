import React from 'react';
import { useDispatch } from 'react-redux';
import { notification } from 'antd';
import { changeAmount, plusOrSubOne } from '../../../redux/features/cartSlice';

const QuantityInput = ({ number, data }) => {
	const dispatch = useDispatch();

	let maxQty = data.maxQuantity ? Number(data.maxQuantity) : 1;

	const changeAmountNumber = (e) => {
		if (Number(e.target.value) > Number(data.maxQuantity)) {
			notification.warning({
				message: (
					<p>
						max quantity of {data.name} is {data.maxQuantity}, please try again!
					</p>
				),
			});
		}
		dispatch(changeAmount({ id: data.id, amount: Number(e.target.value) }));
	};

	const plusOne = () => {
		if (Number(data.quantity) === Number(data.maxQuantity)) {
			notification.warning({
				message: (
					<p>
						max quantity of {data.name} is {data.maxQuantity}, please try again!
					</p>
				),
			});
		}
		dispatch(plusOrSubOne({ id: data.id, isAdd: true }));
	};

	const subOne = () => {
		if (Number(data.quantity) === 1) {
			notification.warning({
				message: <p>min quantity of {data.name} is 1, please try again!</p>,
			});
			return;
		}

		dispatch(plusOrSubOne({ id: data.id, isAdd: false }));
	};

	return (
		<div className="flex gap-5">
			<button
				style={{
					boxShadow:
						'0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)',
				}}
				className="bg-[#6200EE] text-white w-[40px] h-[30px] rounded-[4px] transition-all duration-150 ease-out active:scale-75"
				onClick={plusOne}
			>
				+
			</button>
			<input
				type="number"
				min={1}
				value={Number(data.quantity)}
				max={maxQty}
				className="w-16"
				onChange={changeAmountNumber}
			/>
			<button
				style={{
					boxShadow:
						'0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)',
				}}
				className="bg-[#6200EE] text-white w-[40px] h-[30px] rounded-[4px] transition-all duration-150 ease-out active:scale-75"
				onClick={subOne}
			>
				-
			</button>
		</div>
	);
};

export default QuantityInput;
