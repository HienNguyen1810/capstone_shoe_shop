import axios from 'axios';
import axiosClient from './axiosClient';

const productService = {
	getAllProduct(param = '') {
		return axios.get(`https://shop.cyberlearn.vn/api/Product?keyword=${param}`);
	},
	getProductById: (id) => {
		return axios.get(`https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`);
	},
	getProductByCategory: (categoryId) => {
		return axiosClient.get(
			`Product/getProductByCategory?categoryId=${categoryId}`
		);
	},
};
export default productService;
