import React , { useContext} from 'react'
import {GlobalState} from "../../Globalstate.js" ;
import {Link} from "react-router-dom";
import Menu from "./icons/bar.svg" ;
import close from "./icons/xmark.svg" ;
import cart from "./icons/shoppingcart.svg";
import "./Header.css"
import "../../App.css"
function Header() {
    const value = useContext(GlobalState)
  return (
       <header>
        <div className = "menu">
            <img src = {Menu} alt = " " width = "30" />
        </div>
        
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">About Us</Link></li>
          <li><Link to="/">Products</Link></li>
          <li><Link to="/login"> Login</Link></li>
          <li>
            <img src = {close} alt = " " width ="30" className ="menu"/>
          </li>
        </ul>
      
        
        <div className = "cart-icon">
          <span>0</span>
          <Link to = "/cart">
             <img src = {cart} alt =" " width ="30"/>
          </Link>
        </div>
        </header>
    

  )
}

export default Header ;