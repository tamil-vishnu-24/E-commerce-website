import React , {useState , useEffect} from 'react';
import axios from "axios"

function CategoryAPI() {
    const [categories,setCategories] = useState([])
    const [callback , setCallback] = useState(false);

    const getCategories = async() => {
        const res = await axios.get('/api/category')
        console.log(res.data.items);
        setCategories(res.data.items);
  } 
    useEffect(() => {
       
        getCategories()
        

    },[callback])
    return {
    
        categories : [categories,setCategories],
        callback : [callback,setCallback]
    }  
}

export default CategoryAPI