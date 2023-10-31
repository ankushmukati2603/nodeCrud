import axios from "axios";
import React, {useState,useEffect} from "react";
import { NavLink } from "react-router-dom";


function Home() {
    const[userData, setUserData]=useState([]);
    
    const[userInput, setUserInput]=useState({
        firstname:"",lastname:"",email:"",country:"",phone:"",about:""
    });
    const fetchAllUser=async()=>{
        const res=await axios.get("http://localhost:5000/readalluser");
        // console.log(res.data);
        setUserData(res.data);
    }
    useEffect(()=>{
        fetchAllUser();
    },[]);

    const handleChange = (e)=>{
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit =async(event)=>{
        event.preventDefault();
        // console.log(userInput);
        const res= await axios.post("http://localhost:5000/createuser", userInput);
        console.log(res);
        fetchAllUser();
        if(res.status===200){
            alert("Data Inserted");
        }
        
    }
    const handleDelete=async(id)=>{
        const res = await axios.delete(`http://localhost:5000/delete/${id}`);
        fetchAllUser();
        
    }

  return (
    <>
    <form onSubmit={handleSubmit}>
    <table  border={2}>
            <thead></thead>
            <tbody><tr>
                <th colSpan={2}>Create User Form</th>
            </tr>
            <tr>
                <th>First Name : </th>
                <td><input type="text" name="firstname" value={userInput.firstname} onChange={handleChange} /></td>
            </tr>
            <tr>
                <th>Last Name : </th>
                <td><input type="text" name="lastname" value={userInput.lastname} onChange={handleChange} /></td>
            </tr>
            <tr>
                <th>Email : </th>
                <td><input type="email" name="email" value={userInput.email} onChange={handleChange} /></td>
            </tr>
            <tr>
                <th>Country : </th>
                <td>
                    <select  onChange={handleChange} name="country" value={userInput.country}>
                        <option value="">Select</option>
                        <option value="India">India</option>
                        <option value="US">US</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>Phone : </th>
                <td><input type="number" name="phone" value={userInput.phone} onChange={handleChange} /></td>
            </tr>
            <tr>
                <th>About : </th>
                <td><input type="text" name="about" value={userInput.about} onChange={handleChange} /></td>
            </tr>
            <tr>
                <th colSpan={2}>
                    <button type="submit">Add User</button>
                   
                </th>
            </tr></tbody>
            
        
    </table>
    </form>
    <table >
        <thead>
            <tr>
                <th>SNo.</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>country</th>
                <th>Phone</th>
                <th>Action</th>
                
            </tr>
        </thead>
        <tbody>
            {userData.map((item,i)=>(
                <tr>
                    <td key={i+1}>{i+1}</td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                    <td>{item.country}</td>
                    <td>{item.phone}</td>
                    <td>
                        <NavLink to={`/readuser/${item._id}`}>Read User</NavLink> |
                        <NavLink to={`/updateuser/${item._id}`}>Update User</NavLink> |
                        <button onClick={()=>handleDelete(item._id)}>Delete User</button>
                    </td>
                </tr>

            ))}
            
        </tbody>
        
    </table>
    </>
  );
}

export default Home;
