import React , {useState , useEffect,useContext} from 'react'
import {Link} from "react-router-dom"
import axios from "axios" ;
import {GlobalState} from "../../../../Globalstate" 


function Cart({cartproducts}) {
     const state = useContext(GlobalState);
     const [token] = state.token ;
    const [cart , setCart] = state.userAPI.cart;
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
      cart.forEch(item => {
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
    
    
  return (
    <>
    <div>
    
        {/*<img src ={detailproduct.images.url} alt =""/>*/}
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

    </div>
    
    </>

  )
  }

  export default Cart;