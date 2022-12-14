import React , {useState,useContext,useEffect} from 'react'
import axios from 'axios';
import {GlobalState} from "../../../Globalstate";
import Loading from "../utils/loading/Loading"
import {useHistory , useParams} from "react-router-dom";
const initialState = {
    product_id : '', 
    title : '',
    price: 0 ,
    description : 'coolz',
    content : 'coolz',
    category : '',
    _id: ''
}
function CreateProduct() {
    const state = useContext(GlobalState);
    const [categories , setCategories] = state.categoriesAPI.categories
    const [title , setTitle] = useState('');
    const [content , setContent] = useState('');
    const [product , setProduct] = useState(initialState)
    const [description , setDescription] = useState('');
    const [category , setCategory] = useState('');
    const [price , setPrice] = useState(0);
    const [token] = state.token ;
    const [images , setImages] = useState(false);
    const [loading , setLoading] = useState(false);
    const [isAdmin] = state.userAPI.isAdmin ;
    const [edit , setEdit] = useState(false);
    //const history = useHistory();
    const [callback , setCallback] = state.productsAPI.callback;

    const param = useParams();
    const [products ]= state.productsAPI.products;
    useEffect(() => {
        if(param.id)
        {
            setEdit(true);
            products.forEach(product => {
                if(product._id === param.id)
                {
                    setProduct(product)
                    setImages(product.images)
                }
            })
        }
        else{
            setEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    } ,[param.id,products])

    const createProduct = async (e) =>{
        e.preventDefault();
        try{
            if(!isAdmin)
            {
                return alert("You are not an admin");
            }
            if(!images)
            {

                return alert("No images uploaded");
            }
            if(edit)
            {
                await axios.put(`/api/products/${product._id}`,{...product , images},{
                    headers:{Authorization: token}
                });
                console.log("Successfully updated");
                alert("Successfully updated!!")

                setProduct(product)


            }
            else{
                await axios.post("/api/products" ,{...product , images},{
                    headers : {Authorization:token}
                });
                alert("Successfully added");
                console.log("Successfully addded");
                
            }
            setCallback(!callback)

            setImages(false);
            
            setProduct(initialState)
            
            
            
            
            

        }catch(err)
        {
            alert(err.response.data.msg);
        }
    }
    const handleChangeInput = e => {
        const {name ,value} = e.target;
        setProduct({...product ,[name]:value})
    }
    const handleUpload = async (e) =>{
        e.preventDefault()
        try{
            if(!isAdmin)
            return alert("You are not an admin")

            const file = e.target.files[0];
            console.log(file);
            if(!file)
            return alert("File does not exist")

            if(file.size > 1024*1024)
            return alert("Image size too large");

            if(file.type !== 'image/jpeg' && file.type !=='image/png' )
            return alert("File format is incorrect")
            let formData = new FormData()
            formData.append('file' , file)

            //setLoading(true)

            const res = await axios.post('/api/upload' ,formData,{
                headers : {'content-type' : 'multipart/form-data' , Authorization: token }
            })

           console.log(res);

           setImages(res.data);
        }
        catch(err){
            alert(err.response.data.msg);
        }
    }
    const styleUpload = {
        display :images ? "block" : "none"
    }
    const deleteImage = async() => {
        try{
            if(!isAdmin)
            {
                return alert("You are not an admin")
            }
            //setLoading(true);
            await axios.post('/api/destroy',{public_id:images.public_id},{
                headers : {Authorization : token}
            })
            //setLoading(false);
            setImages(false);

        }catch(err)
        {
            alert(err.response.data.msg)
        }
    }
  return (
    <div className = "createproduct">
       <div className = "upload">
          <input type = "file" name ="file" id="file_ip" onChange={handleUpload}/>
          {
            loading ? <div id = "file_img"><Loading/></div>
          
            : <div id="file_img" style={styleUpload}>
                <img src = {images ? images.url : ''} alt=""/>
                <span id = "span" onClick = {deleteImage}>X</span>
              </div>
          }
         
       </div>
       <form onSubmit = {createProduct} >
       
    
        <label htmlFor = "product_id">Product ID</label>
        <input type = "text" name="product_id" id ="product_id" required value ={product.product_id} onChange = {handleChangeInput} disabled = {product._id}/>
        <br/>
        <label htmlFor="title">Title</label>
        <input type = "text" name="title" value={product.title} onChange = {handleChangeInput} />
        <br/>
        <label htmlFor="description">Description</label>
        <input type ="text" name = "description" value={product.description} required onChange = {handleChangeInput}
        />
        <br/>
        <label htmlFor="content">Content</label>
        <input type ="text" name = "content" value={product.content} required
           onChange = {handleChangeInput}
        />
        <br/>
        <label htmlFor="category">Category</label>
        <select name="category" value={product.category} onChange = {handleChangeInput}>
            <option value="">Please select a category</option>
            {
                categories.map(category => (
                    <option value={category._id} key={category._id}>
                        {category.commodityname}
                    </option>
                ))
            }
        </select>
        <br/>
        <label htmlFor ="price">Price</label>
        <input type ="number" name="price" value={product.price} required
        onChange = {handleChangeInput} />
        <br/>
        <button type="submit">{edit ? "Update" : "Create"}</button>
       </form>



    </div>
  )
}

export default CreateProduct