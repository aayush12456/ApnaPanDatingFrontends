
import { ScrollView,RefreshControl } from "react-native";
import { useEffect,useState } from "react";
import axios from 'axios'
import io from "socket.io-client";
import ReportCard from "../common/reportCard/reportCard";
import { Text } from "react-native-paper";
const socket = io.connect("http://192.168.29.169:4000")
const ReportUser=()=>{
    const BASE_URL = "http://192.168.29.169:4000";
    const id=1
    const [reportUser,setReportUser]=useState({})
    const [refreshing, setRefreshing] = useState(false);
    // useEffect(() => {
    //     const fetchReportUsers = async () => {
    //       try {
    //         if (id) {
    //           const response = await axios.get(
    //             `${BASE_URL}/user/getReportUser/${id}`
    //           );
    //           setReportUser(response?.data );
    //         }
    //       } catch (error) {
    //         // console.error("Error fetching matches:", error);
    //       }
    //     };
      
    //     fetchReportUsers();
      
    //     socket.on("getReportUser", (newUser) => {
      
    //       setReportUser(newUser)
    //     });
      
    //     return () => {
    //       socket.off("getReportUser");
    //     };
    //   }, [id]);
    const fetchReportUsers = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `${BASE_URL}/user/getReportUser/${id}`
          );
    
          setReportUser(response?.data);
        }
      } catch (error) {
        console.log("Error fetching report users:", error);
      }
    };
      console.log('fetch report user array',reportUser)
      const onRefresh = async () => {
        setRefreshing(true);
      
        await fetchReportUsers();
      
        setRefreshing(false);
      };

      useEffect(() => {
        fetchReportUsers();
      
        socket.on("getReportUser", (newUser) => {
          setReportUser(newUser);
        });
      
        return () => {
          socket.off("getReportUser");
        };
      }, [id]);
return (
    <>
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
    {
      reportUser?.reportUser?.length>0?    reportUser?.reportUser?.map((user,index)=>{
            return (
               <ReportCard user={user} key={index}/>
            )
        }):<Text style={{textAlign:'center',color:'white',paddingTop:40,fontSize:16}}>No report user is there</Text>
    }
    </ScrollView>


    </>
)
}
export default ReportUser