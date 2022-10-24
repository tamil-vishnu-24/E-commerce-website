import React  , {useContext} from 'react'
import {Routes , Route} from "react-router-dom";
import Products from "./products/Products.js"
import DetailProduct from "./detailProducts/DetailProduct.js"
import Registeruser from "./auth/RegisterUser"
import Login from "./auth/userLogin"
import Cart from "./cart/Cart.js"
import NotFound from "./utils/Notfound.js"
import {GlobalState} from "../../Globalstate" ;
export default function Pages() {

    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged ;
       
    return (
        <Routes>
            <Route path = "/" element ={<Products/>}/>
            <Route path = "/detail/:id" element = {<DetailProduct/>} />
            <Route path = "/login" element = {isLogged ? <NotFound/> :  <Login/>}/>
            <Route path = "/cart" element = {<Cart/>}/>
            <Route path = "*" element = {<NotFound/>}/>
            <Route path = "/register" element ={isLogged ? <NotFound/> : <Registeruser/>}/>
        </Routes>
    )
}
