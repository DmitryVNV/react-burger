import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { modalReducer } from './modal';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	modal: modalReducer,
	order: orderReducer
});