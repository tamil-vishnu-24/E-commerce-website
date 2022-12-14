import React , {useContext} from 'react'
import {GlobalState} from "../../../Globalstate"
import ProductItem from "../utils/productItem/ProductItem.js"
import Loading from "../utils/loading/Loading"
export default function Products() {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  console.log(products);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token
  const [callback , setCallback] = state.productsAPI.callback
  return (
    <>
    <div className ="products">
     {
         products.map(product => {
              return <ProductItem key ={product._id} products ={product} 
                isAdmin = {isAdmin} token={token} callback ={callback} setCallback={setCallback}
              />
         })
     }
    </div>
    {products.length === 0 && <Loading/>}
    </>

  )
}
