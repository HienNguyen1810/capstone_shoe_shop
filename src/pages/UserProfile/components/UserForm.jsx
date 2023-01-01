import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Input, Radio, Row } from 'antd';
import { apiHandler } from '../../../utils/api-handler';
import { getUserProfile, userProfile } from '../../../redux/features/userSlice';
import userService from './../../../apis/userApi';
import FileUpload from './FileUpload';

const UserForm = () => {
	const dispatch = useDispatch();

	const [formInstant] = Form.useForm();
	const userProfileSelector = useSelector(userProfile);
	const [submitLoading, setSubmitLoading] = useState(false);

	const handleSubmitForm = (value) => {
		const service = userService.updateProfile(value);
		apiHandler({
			service,
			successMessage: 'Update User Profile Successfully!',
			errorMessage: 'Update User Profile failed!',
			successCallback,
			onFinally: () => setSubmitLoading(false),
		});
	};

	const successCallback = () => {
		setSubmitLoading(false);
		dispatch(getUserProfile());
	};

	useEffect(() => {
		if (userProfileSelector) {
			formInstant.setFieldsValue(userProfileSelector);
		}
	}, [JSON.stringify(userProfileSelector)]);

	return (
		<Row>
			<Col span={6} className="flex justify-center">
				<FileUpload />
			</Col>
			<Col flex={1}>
				<Form layout="vertical" form={formInstant} onFinish={handleSubmitForm}>
					<Row gutter={[12, 12]}>
						<Col span={12}>
							<Form.Item
								name="email"
								label="E-mail"
								rules={[
									{
										type: 'email',
										message: 'The input is not valid E-mail!',
									},
									{
										required: true,
										message: 'Please input your E-mail!',
									},
								]}
							>
								<Input placeholder="please input e-mail..." readOnly />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name="phone" label="Phone">
								<Input placeholder="please input your phone number..." />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Name"
								name="name"
								rules={[
									{
										required: true,
										message: 'Please input your name!',
									},
								]}
							>
								<Input placeholder="please input your name..." />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="Password" name="password">
								<Input
									readOnly
									type="password"
									placeholder="please input your password..."
								/>
							</Form.Item>
						</Col>
						<Col offset={12} span={10}>
							<Form.Item name="gender">
								<Radio.Group>
									<Radio value={true}>Male</Radio>
									<Radio value={false}>FeMale</Radio>
								</Radio.Group>
							</Form.Item>
							<button className="text-white bg-[#6200EE] text-sm font-medium py-4 px-7 rounded-[50px] active:scale-75 transition-all ease-in duration-150">
								Submit
							</button>
						</Col>
					</Row>
				</Form>
			</Col>
		</Row>
	);
};

export default UserForm;
