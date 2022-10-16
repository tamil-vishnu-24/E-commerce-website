import React from 'react'
import {Routes , Route} from "react-router-dom";
import Products from "./products/Products.js"
import Login from "./auth/userLogin"
import Cart from "./cart/Cart.js"
import NotFound from "./utils/Notfound.js"
export default function Pages() {
       
    return (
        <Routes>
            <Route path = "/" element ={<Products/>}/>
            <Route path = "/login" element = {<Login/>}/>
            <Route path = "/cart" element = {<Cart/>}/>
            <Route path = "*" element = {<NotFound/>}/>
        </Routes>
    )
}
