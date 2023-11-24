'use client'

import axios from 'axios';
import { fetchToken } from 'src/lib/auth';
import { store } from 'src/redux/store';
import { set, remove } from 'src/redux/Features/Auth/authSlice';


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
  const token =  fetchToken();
  return (null !== token) ? token : false;
}

export { handleLogin, isLoggedIn };
