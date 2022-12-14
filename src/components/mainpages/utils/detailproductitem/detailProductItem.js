import {useContext} from "react"
import  {Link} from "react-router-dom";
import {GlobalState} from "../../../../Globalstate"
import ProductItem from "../productItem/ProductItem.js"

function DetailProductItem({detailproduct}) {
    const state = useContext(GlobalState);
    const [products] = state.productsAPI.products ;
    const addCart = state.userAPI.addCart;
  return (
    <>
    <div>
        {/*<img src ={detailproduct.images.url} alt =""/>*/}
        <h2>{detailproduct.title}</h2>
        <h2>{detailproduct.category}</h2>
        <h5>#id: {detailproduct.product_id}</h5>
        <span>{detailproduct.price}</span>
        <p>{detailproduct.description}</p>
        <p>{detailproduct.content}</p>
        <Link to = "/cart" className = "cart"
        onClick = {() => addCart(detailproduct)}>
           Buy Now
        </Link>

    </div>
    <div>
        <h2>Related Products</h2>
        <div className = "products">
        {
            products.map(product => {
                return product.category === detailproduct.category
                   ? <ProductItem products = {product}/> : null
            })
        }
        </div>
    </div>
    </>
  )
}

export default DetailProductItem