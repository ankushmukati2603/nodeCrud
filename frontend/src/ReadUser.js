import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";




function ReadUser() {
    const {id}=useParams();
    const[userData,setUserData]=useState([]);
    const fetchSingleUser = async ()=>{
        const res=await axios.get(`http://localhost:5000/read/${id}`);
        console.log(res);
        setUserData(res.data);
    }
    useEffect(()=>{
        fetchSingleUser();
    });
  return (
    <>
    <table>
        <tbody>
        <tr>
            <th>First Name : </th>
            <td>{userData.firstname}</td>
        </tr>
        <tr>
            <th>Last Name</th>
            <td>{userData.lastname}</td>
        </tr>
        <tr>
            <th>Email</th>
            <td>{userData.email}</td>
        </tr>
        <tr>
            <th>Country</th>
            <td>{userData.country}</td>
        </tr>
        <tr>
            <th>Phone</th>
            <td>{userData.phone}</td>
        </tr>
        <tr>
            <th>About</th>
            <td>{userData.about}</td>
        </tr>
        <tr>
            <th><NavLink to={`/`}>Back</NavLink></th>
        </tr>
        </tbody>
        
    </table>
    </>
  );
}

export default ReadUser;
