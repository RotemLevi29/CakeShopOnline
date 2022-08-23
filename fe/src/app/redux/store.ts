import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";
import { productsReducer } from "./products-state";
import { cartReducer } from "./cart-state";
import { categoriesReducer } from "./categories-state";

const reducers = combineReducers({ 
    cartState: cartReducer, 
    productsState: productsReducer, 
    authState: authReducer,
    categoriesState: categoriesReducer
    
});

const store = createStore(reducers);

export default store;