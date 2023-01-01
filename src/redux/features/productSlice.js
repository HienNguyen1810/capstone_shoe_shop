import {
	createAsyncThunk,
	createSelector,
	createSlice,
} from '@reduxjs/toolkit';
import _ from 'lodash';
import productService from '../../apis/productApi';

export const fetchProducts = createAsyncThunk(
	'products/fetchAllProducts',
	async (params, { getState }) => {
		const { keyword } = params;
		const searchParams = getState().productReducer.filter.searchText || keyword;

		const response = await productService.getAllProduct(searchParams);
		return response.data.content;
	}
);

export const fetchProductDetail = createAsyncThunk(
	'products/fetchProductDetail',
	async (productId) => {
		const response = await productService.getProductById(productId);
		return response.data.content;
	}
);
const productSlice = createSlice({
	name: 'products',
	initialState: {
		filter: {
			searchText: '',
			priceOrder: 'desc',
		},
		status: 'idle',
		productList: [],
		selectedProduct: null,
	},
	reducers: {
		setSearchText: (state, action) => {
			state.filter.searchText = action.payload;
		},
		setPriceOrder: (state, action) => {
			state.filter.priceOrder = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.productList = action.payload;
				state.status = 'idle';
			})
			.addCase(fetchProductDetail.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(fetchProductDetail.fulfilled, (state, action) => {
				state.selectedProduct = action.payload;
				state.status = 'idle';
			});
	},
});

export const { setSearchText, setPriceOrder } = productSlice.actions;

export const productList = (state) => state.productReducer.productList;
export const loadingProduct = (state) => state.productReducer.status;
export const selectedProduct = (state) => state.productReducer.selectedProduct;
export const searchText = (state) => state.productReducer.filter.searchText;
export const priceOrder = (state) => state.productReducer.filter.priceOrder;

export const productListFilter = createSelector(
	productList,
	priceOrder,
	(productList, priceOrder) =>
		_.orderBy([...productList], ['price'], [priceOrder])
);

export default productSlice.reducer;
