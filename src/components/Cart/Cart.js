import React, { useContext } from "react";

import styles from "./Cart.module.css";
import Modal from "../UI/Modal";

import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

function Cart(props) {
  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id)
  };

  const cartItemAddHandler = (item) => {
    cartContext.addItem({...item,amount:1})
  };

  const cartItems = cartContext.items.map((item) => {
    const removeHandler = () => {
      cartItemRemoveHandler(item.id);
    } //alternative handler if not using bind()

    return (
      <CartItem
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onRemove={removeHandler} //alternative to below
        onAdd={cartItemAddHandler.bind(null, item)}
      ></CartItem>
    );
  });

  return (
    <Modal onClose={props.onClose}>
      <ul className={styles["cart-items"]}> {cartItems}</ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;
