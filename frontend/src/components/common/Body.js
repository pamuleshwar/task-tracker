import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../../constant'
import { useDispatch } from 'react-redux'
import { addUser } from '../../store/userSlice'

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const findUser = async () => {
    try{
      const response = await axios.get(`${BASE_URL}/auth/me`,{withCredentials : true});

      if(!response){
        navigate("/login");
      }

      dispatch(addUser(response?.data?.data));
    }catch(err){
      console.log(err.message);
    }
  };

  useEffect(() => {
    findUser();
  },[]);


  return (
    <div>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Body