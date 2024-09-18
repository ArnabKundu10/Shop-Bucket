import React from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import {googleAuth} from "./api/googleAuth" 
const Login = () => {
   const responseGoogle = async (authResult)=>{
      try{
      if(authResult['code']){
      const result = await googleAuth (authResult['code']);
      const {email,name}= result.data.user;
      console.log('result.data.user---', result.data.user);
      }
      }catch(err) {
      console.error('Error while requesting google code : ', err);
      }
      }
      const googleLogin = useGoogleLogin({
      onSuccess: responseGoogle,
      onError: responseGoogle,
      flow: 'auth-code'
      })
  return (
    <div>
      <button onClick={googleLogin}>
         login button
      </button>
    </div>
  )
}

export default Login ;
