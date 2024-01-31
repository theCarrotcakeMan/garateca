'use client'

import axios from 'axios';
import { fetchToken } from 'src/lib/auth';
import { store } from 'src/redux/store';
import { set, remove } from 'src/redux/Features/Auth/authSlice';
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { set as setUser, remove as removeUser } from 'src/redux/Features/Auth/currentUserSlice';
import { set as setAuth, remove as removeAuth } from 'src/redux/Features/Auth/authSlice';
import { redirect } from 'next/navigation'

const handleLogin = async (e: React.FormEvent) => {

  e.preventDefault();

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const endpoint = `${baseUrl}auth`;
  const target = e.target as typeof e.target & {
      email: { value: string },
      password: { value: string },
  };
  const email     = target.email.value;
  const password  = target.password.value;
  console.log(endpoint);
  await axios.post(endpoint, { email, password })
              .then( (response) => {
                if(response.status === 200){
                  const token = response.data.jwt;
                  const dispatched = store.dispatch(set(token));

                  window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}courses`;
                }

              }, (error) => {
                console.log('Login failed from the start', error);
              });


}

const isLoggedIn = () => {

  const dispatch      =  useAppDispatch();
  const decodedToken  =  fetchToken(true);
  var response = null;
  if(decodedToken){
    response = false;
    // TODO: Validate real user object instead
    if(decodedToken?.name === 'TokenExpiredError'){
      response = false;
    }
    // dispatch( (decoded?.name !== 'TokenExpiredError') ? setUser(decoded.user) : removeUser());
  }
  return response;
}

// Redirect after successful login
const loginRedirect = () => {

}

// Redirect after successful login
const logoutRedirect = () => {
  console.log("Logout redirect");
  //redirect('/');
}

// What happens when token is no longer valid
const faultyTokenCallback = () => {

  const dispatch      =  useAppDispatch();
  console.log("This is a faulty token, cleaning the shack");

  // Dispatch events to the Redux store
  // TODO: Only dispatch these events if the store contains information and is not null
  dispatch(removeUser());
  dispatch(removeAuth());

  logoutRedirect();
}



export { handleLogin, isLoggedIn, faultyTokenCallback };
