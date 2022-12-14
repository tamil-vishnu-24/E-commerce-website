import React  , {useContext} from 'react'
import {Routes , Route} from "react-router-dom";
import Products from "./products/Products.js"
import DetailProduct from "./detailProducts/DetailProduct.js"
import Registeruser from "./auth/RegisterUser"
import Login from "./auth/userLogin"
import OrderHistory from "./History/Orderhistory"
import Cart from "./cart/Cart.js";
import Categories from "./categories/Categories"
import NotFound from "./utils/Notfound.js"
import {GlobalState} from "../../Globalstate" ;
import CreateProducts from "./createProduct/CreateProduct"
export default function Pages() {

    const state = useContext(GlobalState);
    const [isLogged] = state.userAPI.isLogged ;
    const [isAdmin] = state.userAPI.isAdmin ;
    return (
        <Routes>
            <Route path = "/" element ={isLogged ? <Products/> : <Products/>}/>
            <Route path = "/detail/:id" element = {<DetailProduct/>} />
            <Route path = "/login" element = {isLogged ? <NotFound/> :  <Login/>}/>
            <Route path = "/cart" element = {isLogged ? <Cart/> : <NotFound/>}/>
            <Route path = "*" element = {<NotFound/>}/>
            <Route path = "/history" element={isLogged ? <OrderHistory/> : <NotFound/>}/>
            <Route path = "/category" element={isAdmin? <Categories/> : <NotFound/>}/>
            <Route path = "/register" element ={isLogged ? <NotFound/> : <Registeruser/>}/>
            <Route path = '/create_product' element ={isAdmin ? <CreateProducts/> : <NotFound/> }/>
            <Route path = '/edit_product/:id' element ={isAdmin ? <CreateProducts/> : <NotFound/> }/>
            <Route path ="/history/:id" element ={isLogged? <DetailProduct/> : <NotFound/>}/>
        </Routes>
    )
}
