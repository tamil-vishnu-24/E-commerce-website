import React , {useContext} from 'react'
import {GlobalState} from "../../../Globalstate"
import ProductItem from "../utils/productItem/ProductItem.js"

export default function Products() {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  console.log(products);
  return (
    <div className ="products">
     {
         products.map(product => {
              return <ProductItem key ={product._id} products ={product} />
         })
     }
    </div>
  )
}
