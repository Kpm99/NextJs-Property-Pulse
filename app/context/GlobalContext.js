"use client"

import { createContext, useContext, useEffect, useState } from "react";
import getUnreadMessageCount from "../actions/getUnreadMessageCount";
import { useSession } from "next-auth/react";
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
    const {data:session} = useSession()
   
  useEffect(()=>{
    if(session && session.user){
        getUnreadMessageCount().then((res)=>{
            console.log("res",res);
            
            if(res){
                setUnreadCount(res)
            }
        }).catch((err)=>{
            console.log(err);
            
        })
    }
  },[getUnreadMessageCount,session])
  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
};

 const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export default useGlobalContext;
