import axios from 'axios';
import axiosClient from './axiosClient';

const userService = {
	signUp: (param) => {
		return axios.post('https://shop.cyberlearn.vn/api/Users/signup', param);
	},
	signIn: (datas) => {
		return axios.post('https://shop.cyberlearn.vn/api/Users/signin', datas);
	},
	getProfile: () => {
		return axiosClient.post(`Users/getProfile`);
	},
	updateProfile: (params) => {
		return axiosClient.post(`Users/updateProfile`, params);
	},
	submitOrder: (params) => {
		return axiosClient.post('Users/order', params);
	},
	getProductFav: () => {
		return axiosClient.get('Users/getproductfavorite');
	},
	getUserLike: (params) => {
		return axiosClient.get(`Users/like?productId=${params}`);
	},
	getUserUnLike: (params) => {
		return axiosClient.get(`Users/unlike?productId=${params}`);
	},
	changePassWord: (params) => {
		return axiosClient.post('Users/changePassword', params);
	},
	deleteOrder: (params) => {
		return axiosClient.post('Users/deleteOrder', params);
	},
};
export default userService;
