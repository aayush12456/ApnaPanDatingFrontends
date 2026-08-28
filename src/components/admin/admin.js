import {View,Text,ScrollView} from 'react-native' 
import { useEffect,useState } from 'react'
import axios from 'axios'
import io from "socket.io-client";
import AdminCard from '../common/adminCard/adminCard';
const socket = io.connect("http://192.168.29.169:4000")
const Admin=()=>{
const BASE_URL = "http://192.168.29.169:4000";    
const id=1
const [allUserArray,setAllUserArray]=useState({})

useEffect(() => {
    const fetchRegisterUsers = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `${BASE_URL}/user/allRegisterUser/${id}`
          );
          setAllUserArray(response?.data );
        }
      } catch (error) {
        // console.error("Error fetching matches:", error);
      }
    };
  
    fetchRegisterUsers();
  
    socket.on("getRegisterUser", (newUser) => {
  
      setAllUserArray(newUser)
    });
  
    return () => {
      socket.off("getRegisterUser");
    };
  }, [id]);
  console.log('all user array',allUserArray)
return (
    <>
    <ScrollView>
    {
        allUserArray?.users?.map((user,index)=>{
            return (
                <AdminCard userObj={user} key={index}/>
            )
        })
    }
    </ScrollView>
    </>
)
}
export default Admin