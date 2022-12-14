import React ,{useState , useEffect} from 'react'
import axios from 'axios' ;
function UserAPI(token) {
    const [isLogged , setIsLogged] = useState(false);
    const [isAdmin , setIsAdmin] = useState(false);
    const [cart , setCart] = useState([]);
    const [order,setOrder] = useState([]);
    const [callback , setCallback] = useState(false);

    useEffect(() => {
        if(token){
            const getUser = async () => {
                try {
                       const res = await axios.get('/user/user' , {
                        headers : {Authorization: token}
                       })
                       setIsLogged(true);
                       res.data.role === 2 ?setIsAdmin(true) : setIsAdmin(false)
                       setCart(res.data.cart);
                       console.log(res);
                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    },[token , callback])
   
    useEffect(() => {
        if(token){
            const getHistory = async() => {
                
                try {
                    // if(isAdmin){
                    //     const res = await axios.get('/api/payment' ,{
                    //         headers : {Authorization:token}
                    //     })
                    //     setOrder(res.data);
                    // }
                    // else 
                    //{
                        const res = await axios.get('/user/user' , {
                            headers : {Authorization: token}
                           })
                           setIsLogged(true);
                           //res.data.role === 2 ?setIsAdmin(true) : setIsAdmin(false)
                           setOrder(res.data.cart);
                           console.log(res);

                    //}
                    
             } catch (err) {
                 alert(err.response.data.msg)
             }
            }
            getHistory()
        }
                
    },[token])
    const addCart = async (product) =>{
        if(!isLogged)
        {
            return alert("Please login to continue")
        }
        const check = cart.every(item => {
            return item._id !== product._id ;
        })
        if(check){
            setCart([...cart , {...product , quantity: 1}])

            await axios.patch('/user/addcart' , {cart : [...cart , {...product , quantity: 1}]},{
                headers : {Authorization:token}
            })
            alert("The product has been added to the cart");

        }else{
            alert("This product has been added already")
        }
    }


  return{
    isLogged : [isLogged , setIsLogged] ,
    isAdmin : [isAdmin , setIsAdmin] ,
    cart : [cart , setCart],
    order : [order,setOrder],
    addCart : addCart,
    callback : [callback,setCallback]
  }
    
  
}

export default UserAPI