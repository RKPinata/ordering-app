import React, { useContext } from "react";

import styles from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";

import HeaderCartButton from "./HeaderCartButton";


function Header(props) {

  return (
    <>
      <header className={styles.header}>
        <h1>FakeRestaurant</h1>
        <HeaderCartButton onClick={props.onShowCart}>Cart</HeaderCartButton>
      </header> 
      <div className={styles['main-image']}>
        <img src={mealsImage} alt="A table of delicious food"/>
      </div>
    </> 
  );
}

export default Header;
