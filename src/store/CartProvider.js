import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount:0
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

    //Below returns the index of the item in cart which has same id as item being added
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      };
      updatedItems = [...state.items]; //copy of state items
      updatedItems[existingCartItemIndex] = updatedItem; //replace item at index with updated item
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE_ITEM'){

    const removingCartItemIndex = state.items.findIndex((item) => item.id === action.id)

    const removingCartItem = state.items[removingCartItemIndex]
    const updatedTotalAmount = state.totalAmount - removingCartItem.price;

    let updatedItems;

    if (removingCartItem.amount === 1) {
      updatedItems = state.items.filter( item => item.id !== action.id)
    } else {
      const updatedItem = {
        ...removingCartItem,
        amount: removingCartItem.amount - 1
      };
      updatedItems = [...state.items];
      updatedItems[removingCartItemIndex] = updatedItem;

    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }

  return defaultCartState

}

function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = item => {
    dispatchCartAction({ type:"ADD_ITEM", item:item })
  }

  const removeItemFromCartHandler = id => {
    dispatchCartAction({ type:"REMOVE_ITEM", id:id })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider
      value={cartContext}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
