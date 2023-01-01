import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { notification, Tooltip } from 'antd';
import ActionCart from './components/ActionCart';
import QuantityInput from './components/QuantityInput';
import {
	cartDraft,
	cartList,
	cartSelected,
	getCartSelected,
	removeAll,
	removeCartSelected,
} from '../../redux/features/cartSlice';

const useCart = () => {
	const dispatch = useDispatch();
	const cartListDraftSelector = useSelector(cartDraft);
	const cartListSelector = useSelector(cartList);
	const keyCartListSelector = useSelector(cartSelected);

	const rowSelection = {
		onChange: (_selectedRowKeys, selectedRows) => {
			selectedRows = selectedRows.map((item) => item.id);
			dispatch(getCartSelected(selectedRows));
		},
		getCheckboxProps: (record) => ({
			disabled: record.name === 'Disabled User',
			// Column configuration not to be checked
			name: record.name,
		}),
	};

	const columns = [
		{
			key: 'id',
			title: 'id',
			dataIndex: 'id',
			width: 80,
			render: (text) => <span>{text}</span>,
		},
		{
			key: 'image',
			title: 'image',
			dataIndex: 'image',
			width: 120,
			render: (img) => <img className="w-[85px] object-cover" src={img} />,
		},
		{
			key: 'name',
			title: 'name',
			dataIndex: 'name',
			ellipsis: {
				showTitle: false,
			},
			render: (namePro, data) => (
				<Tooltip placement="topLeft" title={namePro}>
					<Link to={`/detail/${data.id}`} className="text-[#1890ff]">
						{namePro}
					</Link>
				</Tooltip>
			),
		},
		{
			key: 'price',
			title: 'price',
			dataIndex: 'price',
			width: 120,
		},
		{
			key: 'quantity',
			title: 'quantity',
			dataIndex: 'quantity',
			render: (number, data) => {
				return <QuantityInput number={number} data={data} />;
			},
		},
		{
			key: 'total',
			title: 'total',
			dataIndex: 'total',
			width: 120,
		},
		{
			key: 'action',
			title: 'action',
			dataIndex: 'action',
			render: (_, data) => {
				return <ActionCart data={data} />;
			},
		},
	];

	const handleRemoveCartSelected = () => {
		dispatch(removeCartSelected(keyCartListSelector));
		notification.success({
			message: <p>remove product successfully!</p>,
		});
	};

	const handleRemoveAll = () => {
		dispatch(removeAll());
		notification.success({
			message: <p>remove product all successfully!</p>,
		});
	};

	return {
		cartListDraftSelector,
		cartListSelector,
		rowSelection,
		keyCartListSelector,
		columns,
		handleRemoveCartSelected,
		handleRemoveAll,
	};
};

export default useCart;
