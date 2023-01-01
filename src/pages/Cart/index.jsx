import React from 'react';
import { Col, Row, Table } from 'antd';
import CartSubmitOrder from './components/CartSubmitOrder';
import useCart from './hook';

const Cart = () => {
	const {
		cartListDraftSelector,
		cartListSelector,
		rowSelection,
		keyCartListSelector,
		columns,
		handleRemoveCartSelected,
		handleRemoveAll,
	} = useCart();

	return (
		<div>
			<h1 className="text-left border-b border-b-[#DEDDDC] text-[40px] py-6 pt-16 font-medium">
				Carts
			</h1>
			<Row className="mt-6">
				<Col span={24} className="flex items-center mb-6">
					<button
						style={{
							boxShadow:
								'0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)',
						}}
						className={`bg-[#EB5757] text-white  rounded-[4px] p-2 mr-6 ${
							keyCartListSelector.length > 0
								? 'transition-all duration-150 ease-out active:scale-75 '
								: 'cursor-not-allowed'
						} `}
						onClick={handleRemoveCartSelected}
					>
						Remove Selected Product
					</button>
					<button
						style={{
							boxShadow:
								'0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)',
						}}
						className={`bg-[#EB5757] text-white  rounded-[4px] p-2 ${
							cartListSelector.length > 0
								? 'transition-all duration-150 ease-out active:scale-75 '
								: 'cursor-not-allowed'
						} `}
						onClick={handleRemoveAll}
					>
						Remove All
					</button>
				</Col>
				<Col span={24}>
					<Table
						rowSelection={{
							type: 'checkbox',
							...rowSelection,
						}}
						columns={columns}
						dataSource={cartListDraftSelector}
						size="medium"
						pagination={false}
					/>
				</Col>
				<Col span={24} style={{ display: 'flex' }} className="mt-10">
					<CartSubmitOrder />
				</Col>
			</Row>
		</div>
	);
};
export default Cart;
