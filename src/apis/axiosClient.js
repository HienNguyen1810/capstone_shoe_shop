import axios from 'axios';

const baseUrl = 'https://shop.cyberlearn.vn/api/';
const getToken = () => JSON.parse(localStorage.getItem('token'));

const axiosClient = axios.create({
	baseURL: baseUrl,
	headers: {
		'Content-Type': 'application/json',
	},
});
// export const cancelTokenSource = axios.CancelToken.source();
// Add a request interceptor
axiosClient.interceptors.request.use(
	function (config) {
		// config.cancelToken = cancelTokenSource.token;
		config.headers['Authorization'] = `Bearer ${getToken()}`;
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

// Add a response interceptor
axiosClient.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		console.log(error);
		return Promise.reject(error);
	}
);

export default axiosClient;
