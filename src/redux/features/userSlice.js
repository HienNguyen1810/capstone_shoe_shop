import { createSelector } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import EventBus from '../../utils/EventBus';
import userService from '../../apis/userApi';

export const getUserProfile = createAsyncThunk(
	'user/get-user-profile',
	async (_, { signal }) => {
		try {
			const response = await userService.getProfile();
			return response.data.content;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
export const getProductFav = createAsyncThunk(
	'user/get-user-product-fav',
	async (_) => {
		try {
			const response = await userService.getProductFav();
			return response.data.content.productsFavorite;
		} catch (error) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		userProfile: null,
		status: 'idle',
		productFav: [],
	},
	reducers: {
		setProductFavEmpty: (state, action) => {
			state.productFav = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserProfile.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(getUserProfile.fulfilled, (state, action) => {
				state.userProfile = action.payload;
				state.status = 'idle';
			})
			.addCase(getProductFav.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(getProductFav.fulfilled, (state, action) => {
				state.productFav = action.payload;
			});
	},
});

export const userLoading = (state) => state.userReducer.status;
export const userProfile = (state) => state.userReducer.userProfile;
export const orderHistory = createSelector(userProfile, (userProfile) => {
	return userProfile?.ordersHistory
		?.map((item) => ({
			id: item.id,
			orderDetail: item.orderDetail,
			dateTime: new Date(item.date),
		}))
		.sort((a, b) => {
			return b.dateTime.getTime() - a.dateTime.getTime();
		});
});
export const productFav = (state) => state.userReducer.productFav;
export const productFaveMappingKey = createSelector(
	productFav,
	(productFav) => {
		return productFav.map((item) => item.id);
	}
);

export const { setProductFavEmpty } = userSlice.actions;

export default userSlice.reducer;
