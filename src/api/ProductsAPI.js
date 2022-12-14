import  {useState , useEffect} from "react" ;
import axios from 'axios' ;
/* function ProductsAPI(){
     const  [products , setProducts] = useState([])
     const getProducts = async () => {
        const res = await axios.get("/api/products")

        setProducts(res.data.products);
        console.log(res.data);
    }

     useEffect(() =>{
        getProducts()
     },[])
     return {
        products : [products , setProducts]
     }
} */

function ProductsAPI(){
   const [products , setProducts] = useState([])
   const [callback , setCallback] = useState(false);

   const getProducts = async () => {
      const res = await axios.get("/api/products")
      setProducts(res.data.products)
      console.log(res.data.result);
   }

   useEffect(() => {
      getProducts()
   },[callback])
   return{
      products : [products , setProducts],
      callback : [callback,setCallback]
   }
}


export default ProductsAPI ;