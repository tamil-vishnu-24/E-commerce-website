import React , {useContext} from 'react'
import {GlobalState} from "../../../Globalstate"
import {Link} from "react-router-dom"
function Orderhistory() {
    const state = useContext(GlobalState)
    const order = state.userAPI.order ;
    const [cart , setCart] = state.userAPI.cart;
  return (
    <div>
    {
      cart.map(cartproducts => (
        <div className = "detail-cart">
         <div className ="box-detail">
         <div>
              <h2>{cartproducts.title}</h2>
              <h2>{cartproducts.category}</h2>
              <h5>#id: {cartproducts.product_id}</h5>
         </div>
          
          <span>{cartproducts.price * cartproducts.quantity}</span>
          <p>{cartproducts.description}</p>
          <p>{cartproducts.content}</p>
          <p>Sold: {cartproducts.sold}</p>

          {/* <div className = "amount">
               <button onClick = {() => decrement(cartproducts._id)}>-</button>
               <span>{cartproducts.quantity}</span>
               <button onClick = {() => increment(cartproducts._id)}>+</button>
          </div>
          <div className = "delete" onClick = {() => deleteProduct(cartproducts._id)}>
               X
          </div>
          <Link to = "/cart" className = "cart">
              Buy Now
          </Link>
          <div className = "history-page">
          <table>
          <thead>
          <tr>
          <th>Payment ID</th>
          <th>Date of Purchased</th>
          </tr>
          </thead>
          <tbody>

          </tbody>
          </table>
          </div>
           */}

         </div>
         <Link id ="btn_view" to = {`/history/${cartproducts._id}`}>
            View 
        </Link>


      </div>

      ))
    }
      

     
    </div>
  )
}

export default Orderhistory;