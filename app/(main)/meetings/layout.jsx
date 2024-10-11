"use client";

import { useUser } from '@clerk/nextjs';
import { BarLoader } from 'react-spinners';

const AppLayout = ({ children }) => {
  const { isLoaded, user } = useUser();
  return (
    <>
  {!isLoaded && <BarLoader width={"100%"} color='#36d7b7'/>}
  {children}  
    </>
  )
};

export default AppLayout;
