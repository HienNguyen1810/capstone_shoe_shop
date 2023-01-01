import React, { useState } from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse, Empty, Table, Tooltip } from 'antd';
import moment from 'moment';
import { apiHandler } from '../../../utils/api-handler';
import userService from '../../../apis/userApi';
import {
	getUserProfile,
	orderHistory,
} from '../../../redux/features/userSlice';

const { Panel } = Collapse;

const HistoryList = () => {
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
			render: (namePro) => (
				<Tooltip placement="topLeft" title={namePro}>
					{namePro}
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
				return <p>{number}</p>;
			},
		},
	];
	const orderHistorySelector = useSelector(orderHistory);

	const onChange = (key) => {};
	if (!orderHistorySelector?.length) return <Empty />;
	return (
		<Collapse defaultActiveKey={['1']} onChange={onChange}>
			{orderHistorySelector?.map((orderItem, idx) => {
				const orderDetailMappingKey = orderItem?.orderDetail?.map(
					(item, id) => ({
						...item,
						key: id + 1,
						id: id + 1,
					})
				);
				return (
					<Panel
						header={
							<PanelHeader dateTime={orderItem?.dateTime} id={orderItem?.id} />
						}
						key={orderItem?.id}
					>
						<Table
							columns={columns}
							dataSource={orderDetailMappingKey}
							size="medium"
							pagination={false}
						/>
					</Panel>
				);
			})}
		</Collapse>
	);
};

const PanelHeader = ({ dateTime, id }) => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const successCallback = () => {
		dispatch(getUserProfile());
	};
	const failCallback = () => {
		setIsLoading(false);
	};
	const onFinally = () => {
		setIsLoading(false);
	};
	const handleDelete = (e) => {
		e.stopPropagation();
		setIsLoading(true);

		const service = userService.deleteOrder({
			orderId: id,
		});
		apiHandler({
			service,
			successMessage: 'Delete order successfully!',
			errorMessage: 'Delete order failed!',
			failCallback,
			successCallback,
			onFinally,
		});
	};
	return (
		<div className="flex items-center gap-x-4">
			<p>
				Orders have been placed on{' '}
				{dateTime ? moment(dateTime).format('MM/DD/YYYY HH:mm:ss') : null}
			</p>
			<div
				className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#b1d9ff94]"
				onClick={handleDelete}
			>
				<MdOutlineDeleteOutline size={14} />
			</div>
		</div>
	);
};

export default HistoryList;
