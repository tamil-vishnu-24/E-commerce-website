import React , {useState,useContext} from 'react'
import {GlobalState} from "../../../Globalstate.js"
import axios from 'axios';
function Categories() {

    const state = useContext(GlobalState);
    const [categories , setCategories] = state.categoriesAPI.categories
    const [category,setCategory] = useState('');
    const [token] = state.token ;
    const [onEdit , setOnEdit] = useState(false);
    const [id , setID] = useState('');
    
    const [callback,setCallback] = state.categoriesAPI.callback;
    const createCategory = async e =>{
      e.preventDefault();
      try{
        if(onEdit)
        {
          // eslint-disable-next-line no-template-curly-in-string
          const res = await axios.put(`/api/category/${id}` , {commodityname:category},{
            headers : {Authorization: token}
          })
          alert(res.data.msg)
        }
        else
        {const res = await axios.post('/api/category' , {commodityname:category},{
          headers : {Authorization: token}
        })
        alert(res.data.msg)
      }
        setOnEdit(false)
        setCategory(' ')
        setCallback(!callback);
        
      } catch(err)
      {
          alert(err.response.data.msg)
      }
          
    }
    const editCategory = async(id,name) =>{
      setID(id)
      setCategory(name)
      setOnEdit(true)
      // const res = await axios.patch("/api/category", {id : ._id},{commodityname:category})
    }
    const deleteCategory = async id =>{
      try{
        const res = await axios.delete(`/api/category/${id}` ,{
          headers : {Authorization : token}
        })
        alert(res.data.msg);
        setCallback(!callback)
      }catch(err)
      {
        alert(err.response.data.msg)
      }
      // eslint-disable-next-line no-template-curly-in-string
      
    }
  return (
    <div className="categories">
       <form onSubmit = {createCategory}>
        <label htmlFor="category">Category</label>
        <input type = "text" name="category" value={category} required
          onChange = {e => setCategory(e.target.value)}
        />

        <button type="submit">{onEdit ? "Update" : "save"}</button>

       </form>
       <div className = "col">
         {

            categories.map(category => (
              <div className = "row" key = {category._id}>
                  <p>{category.commodityname}</p>
                  <div>
                    <button onClick = {() => editCategory(category._id ,category.commodityname)}>Edit</button>
                    <button onClick ={() => deleteCategory(category._id)}>Delete</button>
                  </div>
              </div>
            ))
         }

       </div>
    </div>
  )
}

export default Categories