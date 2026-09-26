import { Image,View } from "react-native"
import { Text,Button } from "react-native-paper"
import phone from '../../../assets/adminIcon/phone.png'
import mail from '../../../assets/adminIcon/mail.png'
import { Dropdown } from 'react-native-paper-dropdown';
import io from "socket.io-client";
import axios from "axios";
import { useState,useEffect } from "react"
const socket = io.connect("http://192.168.29.169:4000")
// const socket = io.connect("https://roommanagementsystembackend-1.onrender.com")
// const socket = io.connect("http://16.16.224.95:4000")
const AMOUNT_OPTIONS = [
    { label: '₹1', value: '1' },
    { label: '₹21', value: '21' },
  ];
const Access=({accessObjs})=>{
    console.log('access objs detail',accessObjs)
    const BASE_URL = "http://192.168.29.169:4000";
    // const BASE_URL = "https://roommanagementsystembackend-1.onrender.com";
    // const BASE_URL = "http://16.16.224.95:4000";
    const [amount, setAmount] = useState(null);
    const [accessObj,setAccessObj]=useState({})
    const [accessDataObj,setAccessDataObj]=useState({})
    const loginId=accessObj.loginId
    // console.log('loginId access',loginId)
    const accessHandler=async(accessObjs)=>{
        const sendAccessObj={
            id:accessObjs.loginId,
            name:accessObjs.name,
            phoneNumber:accessObjs.phone,
            amounts:`₹${amount}`
        }
        // console.log('access ds',accessObj)
        try {
            const response = await axios.post(
              `${BASE_URL}/user/accessAmount/${sendAccessObj.id}`,
              sendAccessObj,
            );
            // console.log("response in amount", response.data);
           
            socket.emit('accessAmount', response?.data)
          } catch (error) {
            console.error("Error in Add/Update Staff", error.message);
          }
    }


    useEffect(() => {
      const fetchAccessHandler = async () => {
        try {
          if (accessObjs.loginId) {
            const response = await axios.get(
              `${BASE_URL}/user/getAccessAmount/${accessObjs.loginId}`
            );
            setAccessObj(response?.data);
          }
        } catch (error) {}
      };
  
      fetchAccessHandler();
  
      socket.on("getAccessAmount", (newUser) => {
        setAccessObj(newUser);
      });
  
      return () => {
        socket.off("getAccessAmount");
      };
    }, [accessObjs.loginId]);
// console.log('Access obj',accessObj)

useEffect(()=>{
  if(accessObj?.accessData?.length>0){
  const finalAccessObj=accessObj?.accessData.filter((access)=>access.loginId==accessObjs.loginId && access.phone==accessObjs.phone)
  setAccessDataObj(finalAccessObj)
  }
},[accessObj,loginId],accessObj?.accessData)

// console.log('access data',accessDataObj)
const showAccessObj=accessDataObj[0]
// console.log('show access objs',showAccessObj)

const revokeAccessHandler=async(id)=>{
  try {
      const response = await axios.post(
        `${BASE_URL}/user/revokeAccessAmount/${id}`,
        accessObj ,
      );
      // console.log("response in amount", response.data);
     
      socket.emit('deleteAccessAmount', response?.data)
    } catch (error) {
      console.error("Error in Add/Update Staff", error.message);
    }
}

const formattedAmount = showAccessObj?.amount
  ? showAccessObj.amount.replace("₹", "")
  : "";
return (
    <>

     <View style={{alignItems:"center",marginBottom:5,marginTop:20}}>
        <Image
          source={{ uri: accessObjs?.image }}
          style={{
            width: 130,
            height: 130,
            borderRadius: 85,
          }}
        />
        <Text style={{color: "white", fontSize:18,fontWeight:"700",textAlign:'center',paddingTop:9}}>{accessObjs?.name}</Text>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: "#ccc",
            marginHorizontal: 15,
            marginBottom: 10,
            marginTop:9
          }}
        />
            <View style={{flexDirection:"row",gap:25,marginLeft:42,marginRight:42,marginTop:5}}>
              <Image source={phone} style={{ width: 18, height:18,tintColor:'white' }}/>
              <Text style={{fontSize:15,color:"white"}}>{accessObjs?.phone}</Text>
            </View>

            <View
          style={{
            height: 1,
            backgroundColor: "#ccc",
            marginHorizontal: 15,
            marginBottom: 10,
            marginTop:15
          }}
        />

       

          
          <View style={{flexDirection:"row",gap:25,marginTop:5,marginLeft:42,marginRight:42,marginBottom:40}}>
              <Image source={mail} style={{ width: 18, height:18,tintColor:"white" }}/>
              <Text style={{fontSize:15,color:'white'}}>{accessObjs?.email}</Text>
            </View>
            <View
          style={{
            height: 1,
            backgroundColor: "#ccc",
            marginHorizontal: 15,
            marginBottom: 10,
            marginTop:-20
          }}
        />
<View
  style={{
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  }}
>
  <Dropdown
    label="Select Amount"
    options={AMOUNT_OPTIONS}
    value={amount || formattedAmount}
    onSelect={(value) => setAmount(value)}
    mode="outlined"
  />
</View>
          <View style={{ width: '100%', overflow: 'hidden' }}>
         {showAccessObj?
         <Button
         mode="contained"
         style={{
           height: 50, // Set the desired height
           borderRadius:11,
           color: '#FFFFFF',
            fontSize: 16, 
            justifyContent:'center',
            marginTop: 20,
            marginLeft: 12,
            marginRight: 20,
            backgroundColor: "red",
         }}
         contentStyle={{ height: 50 }}
         onPress={()=>revokeAccessHandler(showAccessObj._id)}
       >
     Revoke  Access

       </Button>:
         <Button
                      mode="contained"
                      style={{
                        height: 50, // Set the desired height
                        borderRadius:11,
                        color: '#FFFFFF',
                         fontSize: 16, 
                         justifyContent:'center',
                         marginTop: 20,
                         marginLeft: 12,
                         marginRight: 20,
                         backgroundColor: "#007BFF",
                      }}
                      contentStyle={{ height: 50 }}
                      onPress={()=>accessHandler(accessObjs)}
                    >
                    Access
         
                    </Button>}
      </View>
    </>
)
}
export default Access