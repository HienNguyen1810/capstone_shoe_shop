import { createSelector } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		cartList: [],
		cartSelected: [],
		status: 'idle',
		cartListDraft: [],
	},
	reducers: {
		addCartDetail: (state, action) => {
			const index = state.cartList.findIndex(
				(element) => element.id.toString() === action.payload.id.toString()
			);
			if (index !== -1) {
				if (
					state.cartList[index].quantity + action.payload.quantity >
					action.payload.maxQuantity
				) {
					return;
				}
				state.cartList[index].quantity += action.payload.quantity;
				state.cartList[index].total =
					state.cartList[index].quantity * state.cartList[index].price;
			} else {
				action.payload.total = action.payload.quantity * action.payload.price;
				state.cartList.push(action.payload);
			}
			state.cartListDraft = state.cartList;
		},

		removeCart: (state, action) => {
			const newCartList = state.cartList.filter(
				(item) => item.id.toString() !== action.payload.id
			);
			state.cartList = newCartList;
			state.cartListDraft = newCartList;
		},

		removeAll: (state, action) => {
			state.cartList = [];
			state.cartListDraft = [];
		},

		removeCartSelected: (state, action) => {
			state.cartList = state.cartList.filter(
				(item) => !action.payload.includes(item.id)
			);
			state.cartSelected = [];
			state.cartListDraft = state.cartList;
		},

		plusOrSubOne: (state, action) => {
			const index = state.cartListDraft.findIndex(
				(element) => element.id.toString() === action.payload.id.toString()
			);
			if (action.payload.isAdd) {
				let qty = state.cartListDraft[index].quantity + 1;
				if (qty > state.cartListDraft[index].maxQuantity) return;
				state.cartListDraft[index].quantity += 1;
			} else {
				state.cartListDraft[index].quantity -= 1;
			}
			state.cartListDraft[index].total =
				state.cartListDraft[index].price * state.cartListDraft[index].quantity;
			if (state.cartListDraft[index].quantity === 1) return;
		},

		changeAmount: (state, action) => {
			const index = state.cartListDraft.findIndex(
				(element) => element.id.toString() === action.payload.id.toString()
			);

			const qty =
				Number(action.payload.amount) >= state.cartListDraft[index].maxQuantity
					? Number(state.cartListDraft[index].maxQuantity)
					: Number(action.payload.amount);
			state.cartListDraft[index].quantity = qty;
			state.cartListDraft[index].total = state.cartListDraft[index].price * qty;
		},

		saveEditCart: (state, action) => {
			let cartUpdated = state.cartListDraft.find(
				(item) => item.id.toString() === action.payload.id.toString()
			);
			let index = state.cartListDraft.findIndex(
				(item) => item.id.toString() === action.payload.id.toString()
			);
			state.cartList[index] = { ...cartUpdated };
		},

		getCartSelected: (state, action) => {
			state.cartSelected = action.payload;
		},
	},
});

export const {
	addCartDetail,
	plusOrSubOne,
	changeAmount,
	saveEditCart,
	removeCart,
	getCartSelected,
	removeCartSelected,
	removeByIds,
	removeAll,
} = cartSlice.actions;

export const cartList = (state) => state.cartReducer.cartList;
export const cartSelected = (state) => state.cartReducer.cartSelected;
export const totalCartQuantity = createSelector(cartList, (cartList) =>
	cartList.reduce((acum, current) => acum + current.quantity, 0)
);

export const totalCartPrice = createSelector(cartList, (cartList) => {
	return cartList.reduce((acum, current) => acum + current.total, 0);
});

export const cartDraft = (state) => {
	return state.cartReducer?.cartListDraft?.map((item) => ({
		...item,
		key: item.id,
	}));
};

export default cartSlice.reducer;
