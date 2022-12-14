import React , {useContext,useEffect,useState} from 'react'
import {Link} from "react-router-dom"
import {GlobalState} from "../../../Globalstate.js"
import CartItem from "../utils/cartitem/cartItem"
import Loading from "../utils/loading/Loading";
import axios from "axios" ;

export default function Cart() {

  const state = useContext(GlobalState);
   
  const [total , setTotal] = useState(0);
     const [token] = state.token ;
    const [cart , setCart] = state.userAPI.cart;
    const [callback,setCallback] = state.userAPI.callback;
    const[add , setAdd] = useState(false);
    const addToCart = async () => {
      await axios.patch('/user/addcart' , {cart} , {
        headers : {Authorization : token}
  
      })
    }
  
    
    const increment = (id) => {
      cart.forEach(item => {
        if(item._id === id)
        {
          item.quantity += 1
        }
      })
      setCart([...cart])
      addToCart()
    }
    const decrement = (id) => {
      cart.forEach(item => {
        if(item._id === id)
        {
          item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1 ;
        }
      })
      setCart([...cart])
      addToCart()
    }
    const deleteProduct = (id) => {
      if(window.confirm("Are you sure to delete this product from cart"))
      {
        cart.forEach((item , index) => {
          if(item._id === id)
          {
            cart.splice(index,1)
          }
        })
        setCart([...cart])
        addToCart()
      }
    }
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
  const placedOrder = () => {
    setCart([]);
    alert("You have placed order successfully");
  }

    return (
      <>
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

            <div className = "amount">
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

           </div>
            


        </div>

        ))
      }
        

       
      </div>
      {cart.length === 0 && <Loading/>}

      <div className = "total">
        <h1>Total : ${total}</h1>
        <button onClick={placedOrder}>Place order</button>
      </div>
      </>
  
    )
  
}
