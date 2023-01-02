import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { TiSocialFacebookCircular } from 'react-icons/ti';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, notification, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { omit } from 'lodash';
import useAuth from '../hooks/use-auth';
import { apiHandler } from '../utils/api-handler';
import userService from '../apis/userApi';
import '../styles/login.less';

const Login = () => {
	const { setAuth } = useAuth();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);

	const successCallback = (values) => {
		setIsLoading(false);
		setAuth(omit(values.content, ['accessToken']));
		localStorage.setItem('token', JSON.stringify(values.content.accessToken));
		localStorage.setItem('email', JSON.stringify(values.content.email));

		navigate(from, { replace: true, state: '' });
	};

	const failCallback = () => {
		setIsLoading(false);
	};

	const onFinish = (values) => {
		setIsLoading(true);
		const service = userService.signIn(values);
		apiHandler({
			service,
			successMessage: 'login successfully!',
			errorMessage: 'login failed',
			failCallback,
			successCallback,
		});
	};
	const onFinishFailed = () => {
		setIsLoading(false);
	};

	const antIcon = (
		<LoadingOutlined
			style={{
				fontSize: 24,
			}}
			spin
		/>
	);

	return (
		<section className="login max-w-[1120px] mx-auto">
			<h1 className="text-left border-b border-b-[#DEDDDC] text-[40px] py-6 pt-16">
				Login
			</h1>
			<div className="max-w-[500px] mx-auto mt-6">
				<Form
					name="basic"
					layout="vertical"
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="Email"
						name="email"
						className="form-item"
						rules={[
							{
								required: true,
								message: 'Please input your email!',
							},
							{
								type: 'email',
								message: 'The input is invalid E-mail!',
							},
						]}
					>
						<Input placeholder="email" />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						className="form-item"
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
						]}
					>
						<Input.Password placeholder="password" />
					</Form.Item>

					<div className="flex items-center gap-3 mb-6">
						<Link
							to="/register"
							className="register ml-auto text-[#152AEB] hover:underline"
						>
							Register now ?
						</Link>
						<button
							disabled={isLoading}
							className={`text-white bg-[#6200EE] text-sm font-medium py-4 px-7 rounded-[50px] active:scale-75 transition-all ease-in duration-150 ${
								isLoading ? 'cursor-wait' : ''
							}`}
						>
							{isLoading && <Spin indicator={antIcon} />} Login
						</button>
					</div>
				</Form>
				<LoginFacebook />
			</div>
		</section>
	);
};

const LoginFacebook = () => {
	const responseFacebook = (response) => {
		axios({
			url: 'https://shop.cyberlearn.vn/api/Users/facebooklogin',
			method: 'post',
			data: {
				facebookToken: response.accessToken,
			},
		}).then((res) => {
			//Lưu vào localstorage
			if (!res?.data?.content?.accessToken || !res?.data?.content?.email) {
				notification.warning({
					message: <p>failed to login facebook, please try again!</p>,
				});
				return;
			}
			localStorage.setItem(
				'token',
				JSON.stringify(res.data.content.accessToken)
			);
			localStorage.setItem('email', JSON.stringify(res.data.content.email));
		});
	};

	return (
		<div>
			<FacebookLogin
				appId="1321515251962852"
				autoLoad={true}
				fields="name,email,picture"
				onClick={(props) => (
					<button
						disabled
						className="flex gap-3 items-center bg-[#1877F2] text-white p-3 w-full rounded-2xl active:scale-90 transition-all ease-in duration-200"
					>
						<TiSocialFacebookCircular size={40} color="white" />
						<span className="text-xl font-normal">Continue with Facebook</span>
					</button>
				)}
				callback={responseFacebook}
			/>
		</div>
	);
};
export default Login;
