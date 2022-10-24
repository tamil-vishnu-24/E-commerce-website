import React ,{useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from "../../../../Globalstate";
function ProductItem({products , isAdmin}) {
  const state = useContext(GlobalState);
  const addCart = state.userAPI.addCart ;

  return (
    <div className = "product_card">
    {
      isAdmin && <input type = "checkbox" checked = {products.checked}/>
    }
      <img src ={products.images.url} alt ="" />
       <div className = "product_box">
         <h2>${products.description}</h2>
         <span>${products.price}</span>
         <p>${products.description}</p>
      </div>
      <div className ="row_btn">
      {
        isAdmin ?
        <>
        <Link id ="row_btn" to="#" >
            Delete
        </Link>
        <Link id ="btn_view" to = {`/edit_product/${products._id}`}>
            Edit
        </Link>

        </>
        : <>
        <Link id ="row_btn" to="#" onClick = {() => addCart(products)}>
            Buy
        </Link>
        <Link id ="btn_view" to = {`/detail/${products._id}`}>
            View 
        </Link>
        </>

      }
        
      </div>

      
    </div>
  

  )
}

export default ProductItem ;