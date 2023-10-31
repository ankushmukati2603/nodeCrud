import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



function UpdateUser() {
    const[inputUser, setInputUser]=useState({
        firstname:"",lastname:"",email:"",country:"",phone:"",about:""
    });
    const {id}=useParams();
    const fetchSingleUser = async ()=>{
        const res=await axios.get(`http://localhost:5000/read/${id}`);
        console.log(res);
        setInputUser({
            firstname:res.data.firstname,
            lastname:res.data.lastname,
            email:res.data.email,
            country:res.data.country,
            phone:res.data.phone,
            about:res.data.about,
        });
    }
    useEffect(()=>{
        fetchSingleUser();
    },[]);
    const handleChange = (e)=>{
        setInputUser({
            ...inputUser,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit =async(event)=>{
        event.preventDefault();
        const res= await axios.put(`http://localhost:5000/updateuser/${id}`, inputUser);
        if(res.status==200){
            window.location='/';
        }
        
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
                <td><input type="text" name="firstname" value={inputUser.firstname} onChange={handleChange} /></td>
            </tr>
            <tr>
                <th>Last Name : </th>
                <td><input type="text" name="lastname" value={inputUser.lastname} onChange={handleChange} /></td>
            </tr>
            <tr>
                <th>Email : </th>
                <td><input type="email" name="email" value={inputUser.email} onChange={handleChange} /></td>
            </tr>
            <tr>
                <th>Country : </th>
                <td>
                    <select  onChange={handleChange} name="country" value={inputUser.country}>
                        <option value="">Select</option>
                        <option value="India">India</option>
                        <option value="US">US</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>Phone : </th>
                <td><input type="number" name="phone" value={inputUser.phone} onChange={handleChange} /></td>
            </tr>
            <tr>
                <th>About : </th>
                <td><input type="text" name="about" value={inputUser.about} onChange={handleChange} /></td>
            </tr>
            <tr>
                <th colSpan={2}>
                    <button type="submit">Update User</button>
                </th>
            </tr></tbody>
            
        
    </table>
    </form>
    <table ></table>
    </>
  );
}

export default UpdateUser;
