import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Form, Input, Radio, Row } from 'antd';
import { apiHandler } from '../utils/api-handler';
import userService from '../apis/userApi';

const Register = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const [_isLoading, setIsLoading] = useState(false);

	const successCallback = (values) => {
		setIsLoading(false);

		navigate('/login', { replace: true });
	};

	const onFinish = (values) => {
		setIsLoading(true);
		const service = userService.signUp(values);
		apiHandler({
			service,
			successMessage: 'Register successfully!',
			errorMessage: 'Register failed!',
			successCallback,
		});
	};
	const onFinishFailed = () => {
		setIsLoading(false);
	};
	return (
		<section className="login max-w-[1120px] mx-auto">
			<h1 className="text-left border-b border-b-[#DEDDDC] text-[40px] py-6 pt-16">
				Register
			</h1>
			<div>
				<Form
					form={form}
					className="mt-6"
					layout="vertical"
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Row gutter={[150, 16]}>
						<Col span={12}>
							<Form.Item
								label="Email"
								name="email"
								rules={[
									{
										type: 'email',
										message: 'The input is invalid E-mail!',
									},
									{
										required: true,
										message: 'Please input your email!',
									},
								]}
							>
								<Input placeholder="email" />
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
								<Input placeholder="name" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Password"
								name="password"
								rules={[
									{
										required: true,
										message: 'Please input your password!',
									},
								]}
								hasFeedback
							>
								<Input type="password" placeholder="password" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Phone"
								name="phone"
								rules={[
									{
										required: true,
										message: 'Please input your phone!',
									},
								]}
							>
								<Input placeholder="phone" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Password confirm"
								name="passwordConfirm"
								dependencies={['password']}
								hasFeedback
								rules={[
									{
										required: true,
										message: 'Please confirm your password!',
									},
									({ getFieldValue }) => ({
										validator(_, value) {
											if (!value || getFieldValue('password') === value) {
												return Promise.resolve();
											}
											return Promise.reject(
												new Error(
													'The two passwords that you entered do not match!'
												)
											);
										},
									}),
								]}
							>
								<Input type="password" placeholder="password confirm" />
							</Form.Item>
						</Col>
						<Col span={12} className="mt-10">
							<Form.Item name="gender">
								<Radio.Group>
									<Radio value={true}>Male</Radio>
									<Radio value={false}>FeMale</Radio>
								</Radio.Group>
							</Form.Item>
						</Col>
						<Col offset={12} className="block text-center">
							<button className="text-white bg-[#6200EE] text-sm font-medium py-4 px-7 rounded-[50px] active:scale-75 transition-all ease-in duration-150 inline-block">
								Submit
							</button>
						</Col>
					</Row>
				</Form>
			</div>
		</section>
	);
};

export default Register;
