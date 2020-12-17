import { act } from "react-dom/test-utils";

const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE_ITEM") {
    const newItems = state.cart.filter((item) => item.id !== action.payLoad);
    return { ...state, cart: newItems };
  }
  if (action.type === "INCREASE") {
    const tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payLoad) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === "DECREASE") {
    const tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payLoad) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }

        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }

  if (action.type === "GET_TOTAL") {
    let { total, amount } = state.cart.reduce(
      //reduce function
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;

        const itemTotal = amount * price;
        cartTotal.total += itemTotal;
        cartTotal.amount += amount;

        return cartTotal;
      },
      { total: 0, amount: 0 }
    );
    total = parseFloat(total.toFixed(2)); //Fixing totoal value with 2 floating point
    return { ...state, amount, total };
  }
  return state;
};

export default reducer;
