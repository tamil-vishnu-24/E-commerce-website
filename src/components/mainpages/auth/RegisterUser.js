import React ,{useState} from 'react'
import {Link} from "react-router-dom";
import axios from 'axios';
export default function  RegisterUser() {
  const [user , setUser] = useState({
    name:'' , email:'' , password: '' ,phonenumber : ''
  })

  const onChangeInput = e => {
    const {name , value} = e.target;
    setUser({...user , [name]:value})
  }
  const registerSubmit = async e =>{
    e.preventDefault();
    try{
      await axios.post('/user/register' , {...user})
      localStorage.setItem('firstLogin' , true)

      window.location.href = "/";

    } catch (err) {
      alert(err.response.data.msg)
    }
  }
  return (
    <div className = "login-page">
      <form onSubmit ={registerSubmit}>
        <input type = "text" name = "name" required value = {user.name} onChange = {onChangeInput}/>
        <input type = "email" name="email"  required value ={user.email} onChange={onChangeInput}/>
        <input type ="password" name="password" required value ={user.password} onChange={onChangeInput}/>
        <input type = "number" name ="phonenumber" required value ={user.phonenumber} onChange ={onChangeInput}/>
        <div className ="row">
          <button type = "submit">Register</button>
          <Link to = "/login">Login</Link>
        </div>
      </form>
    </div>
  )
}
