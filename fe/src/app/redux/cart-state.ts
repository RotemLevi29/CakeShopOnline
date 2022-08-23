import CartModel from 'src/app/models/cart.model';

// Cart State: 
export class CartState {
    public cart: CartModel[] = [];
}

// Cart Action Types:
export enum CartActionType {
    cartDownloaded = "cartDownloaded",
    cartAdded = "cartAdded",
    cartUpdated = "cartUpdated",
    cartDeleted = "cartDeleted"
}

// Cart Action: 
export interface CartAction {
    type: CartActionType;
    payload: any;
    // More specific type list:
    // payload: CartModel[] | CartModel | number;
}

// Cart Action Creators: 
export function cartDownloadedAction(cart: CartModel[]): CartAction {
    return { type: CartActionType.cartDownloaded, payload: cart };
}
export function cartAddedAction(cart: CartModel): CartAction {
    return { type: CartActionType.cartAdded, payload: cart };
}
export function cartUpdatedAction(cart: CartModel): CartAction {
    return { type: CartActionType.cartUpdated, payload: cart };
}
export function cartDeletedAction(id: string): CartAction {
    return { type: CartActionType.cartDeleted, payload: id };
}

// Cart Reducer:
export function cartReducer(currentState: CartState = new CartState(), action: CartAction): CartState {
    
    const newState = { ...currentState };

    switch(action.type) {
        case CartActionType.cartDownloaded: // Here payload is all cart (CartModel[])
            newState.cart = action.payload;
            break;
        case CartActionType.cartAdded: // Here payload is the added cart (CartModel)
            newState.cart.push(action.payload);
            break;
        case CartActionType.cartUpdated: { // Here payload is the updated cart (CartModel)
            const index = newState.cart.findIndex(p => p.id === action.payload.id);
            newState.cart[index] = action.payload;
            break;
        }
        case CartActionType.cartDeleted: { // Here payload is the deleted cart's id (number)
            const index = newState.cart.findIndex(p => p.id === action.payload);
            newState.cart.splice(index, 1);
            break;
        }
    }

    return newState;
}