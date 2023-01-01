import { combineReducers } from 'redux';
import cartSlice from './features/cartSlice';
import productSlice from './features/productSlice';
import userSlice from './features/userSlice';

const rootReducer = combineReducers({
	productReducer: productSlice,
	userReducer: userSlice,
	cartReducer: cartSlice,
});
export default rootReducer;
