import React , { useContext} from 'react'
import axios from 'axios' ;
import {GlobalState} from "../../Globalstate.js" ;
import {Link} from "react-router-dom";
import Menu from "./icons/bar.svg" ;
import close from "./icons/xmark.svg" ;
import Cart from "./icons/shoppingcart.svg";
import "./Header.css"
import "../../App.css"
function Header() {
    const state = useContext(GlobalState)
    const [isLogged ] = state.userAPI.isLogged;
    const[isAdmin ] = state.userAPI.isAdmin;

    const [cart] = state.userAPI.cart

    const logoutUser = async () => {
        await axios.get('/user/logout')
        localStorage.clear()
        window.location.href = "/" ;
    }
    const adminRouter = () => {
      return (
        <>
        <li><Link to = "/create_product">Create Product</Link></li>
        <li><Link to = "/category">Categories</Link></li>
        </>
      )
    }
    const loggedRouter = () => {
      return (
        <>
         
         <li><Link to ="/history">History</Link></li>
         <li><Link to ="/" onClick = {logoutUser}>Logout</Link></li>
        </>
      )
    }
  return (
       <header>
        <div className = "menu">
            <img src = {Menu} alt = " " width = "30" />
        </div>
        <div className = "logo">
        <h1>
          <Link to = "/">{isAdmin ? 'Admin' : 'SHOP'}</Link>
        </h1>

        </div>
        
        <ul>
          {/* <li><Link to="/">Home</Link></li>
          <li><Link to="/">About Us</Link></li> */}
          <li><Link to = "/">{isAdmin ? 'Products' : 'shop'}</Link></li>
          {/* <li><Link to="/">Products</Link></li> */}
          {isAdmin && adminRouter()}
          {
            isLogged ? loggedRouter() : <li><Link to ="/login">Login</Link></li>
          }
          {/* <li><Link to="/login"> Login</Link></li> */}
          <li>
            <img src = {close} alt = " " width ="30" className ="menu"/>
          </li>
        </ul>
        {
          isAdmin ? ''
          : <div className = "cart-icon">
               <span>{cart.length}</span>
               <Link to = "/cart">
                  <img src = {Cart} alt =" " width ="30"/>
               </Link>
            </div>
        }
        

        </header>
    

  )
}

export default Header ;