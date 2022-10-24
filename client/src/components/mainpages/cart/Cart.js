import React , {useContext,useEffect,useState} from 'react'
import {Link} from "react-router-dom"
import {GlobalState} from "../../../Globalstate.js"
import CartItem from "../utils/cartitem/cartItem"
import Loading from "../utils/loading/Loading"

export default function Cart() {

  const state = useContext(GlobalState);
   
  const [cart] = state.userAPI.cart;
  const [total , setTotal] = useState(0);
  console.log(cart);

  useEffect (() => {
    const getTotal = () => {
        const total = cart.reduce((prev , item) => {
          return prev + (item.price * item.quantity)
        },0)

        setTotal(total);
    }

    getTotal()
  },[cart])
  
  if(cart.length===0)
    return <h2 style={{textAlign : 'center'}}>Cart is Empty</h2>


    return (
      <>
      <div className ="cart">
       {
           cart.map(product => {
                return <CartItem key ={product._id} cartproducts ={product} 
                />
           })
       }
      </div>
      {cart.length === 0 && <Loading/>}

      <div className = "total">
        <h1>Total : ${total}</h1>
        <Link to = "#1">Payment</Link>

      </div>
      </>
  
    )
  
}
