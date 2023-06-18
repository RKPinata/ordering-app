import React, { useContext, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

import styles from "./HeaderCartButton.module.css";

import CartIcon from "../Cart/CardIcon";
import CartContext from "../../store/cart-context";

function HeaderCardButton(props) {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const cartCtx = useContext(CartContext);

  const { items } = cartCtx; //same w items = cartCtx.items

  //finds the total number of food(adding up amount in cart items)
  const numberOfCartItems = items.reduce((accumulatedNumber, item) => {
    return accumulatedNumber + item.amount;
  },0 );

  const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump: ''}`;

  useEffect(() => {
    if (items.length === 0 ){
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    },300);

    return () => {
      clearTimeout(timer);
    };
  },[items]);

  /* ------ Below animation using framer motion ------ */

  /* const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const animationControls = useAnimation();

  const cartCtx = useContext(CartContext);

  const { items } = cartCtx; //same w items = cartCtx.items

  //finds the total number of food(adding up amount in cart items)
  const numberOfCartItems = items.reduce((accumulatedNumber, item) => {
    return accumulatedNumber + item.amount;
  }, 0);

  const btnClasses = `${styles.button}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    animationControls.start({
      x: [-10, 10, -10, 10, 0],
      transition: { duration: 0.3 },
    });

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items],animationControls);

  // Animation variants
  const animationVariants = {
    initial: { scale: 1 },
    animate: { scale: [1, 1.2, 1], transition: { duration: 0.3 } },
  }; */

  return (
    <motion.button
      className={btnClasses}
      onClick={props.onClick}
      //animate={animationControls}
    >
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </motion.button>
  );
}

export default HeaderCardButton;
