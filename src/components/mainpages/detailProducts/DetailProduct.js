import React , {useContext , useState , useEffect} from 'react'
import {useParams , Link} from "react-router-dom"
import {GlobalState} from "../../../Globalstate"
import DetailProductItem from "../utils/detailproductitem/detailProductItem.js"

function DetailProduct() {
    const params = useParams()
    console.log(params)
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products ;
    const [detailProduct , setDetailProduct] = useState([]);
    useEffect(() => {
        if(params.id){
            products.forEach(product => {
                if(product._id === params.id)
                {
                    setDetailProduct(product)
                }
                
            })
            }
        } , [params.id , products]
    )
  return (
    <div className = "detailProduct">
        <DetailProductItem detailproduct = {detailProduct}/>

    </div>
  )
}

export default DetailProduct