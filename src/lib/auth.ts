import jwt from 'jsonwebtoken';
import { store } from '/src/redux/store';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "/src/redux/hooks";
import { set, remove } from '/src/redux/Features/Auth/currentUserSlice';
import { redirect } from 'next/navigation'


const verifyToken = async (token) => {

  if (!token) {
    return null;
  }
  try {
    const validState = await jwt.verify(token, process.env.NEXT_PUBLIC_SECRET);
    console.log("USER: ValidState", validState);
    return validState;
  } catch(err) {
    console.error(err);
  }
};

const useToken = (decoded = false) => {
  const [token, setToken] = useState(null);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setToken((!decoded) ? accessToken : verifyToken(accessToken));
    }
  }, [accessToken, decoded]);

  return token;
}

export { verifyToken, useToken }
