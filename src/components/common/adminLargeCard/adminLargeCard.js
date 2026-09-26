import { Text, Card ,Button} from "react-native-paper";
import { useState,useEffect} from "react";
import { View,Image,ScrollView,StyleSheet,Dimensions,Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import back from '../../../../assets/signUpFormIcon/back.png'
import play from '../../../../assets/myProfileIcons/play.png'
import { passVideoDataSliceActions } from "../../../Redux/Slice/passVideoSlice/passVideoSlice";
import { playVideoModalActions } from "../../../Redux/Slice/playVideoModalSlice/playVideoModalSlice";
import { useDispatch,useSelector } from "react-redux";
import PlayVideo from "../playVideo/playVideo";
import { getFieldRegisterUserData } from "../../../Redux/Slice/getFieldRegisterUserSlice/getFieldRegisterUserSlice";
import AdminSmallCard from "../adminSmallCard/adminSmallCard";
const AdminLargeCard=({userObj})=>{
    const [active, setActive] = useState(0);
    const width = Dimensions.get('window').width - 50;
    const height = width * 1.2;
  

    const navigation=useNavigation()
    const dispatch = useDispatch()
    const backHandler=()=>{
        navigation.goBack()
      }

      const change = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== active) {
          setActive(slide);
        }
      };

      const playVideoHandler=()=>{
        dispatch(passVideoDataSliceActions.passVideoDatas(userObj))
        dispatch(playVideoModalActions.playVideoModalToggle())
      }

      const rows=[]
      for(let i=0;i<userObj?.interest?.length;i+=2){
        rows.push(userObj.interest.slice(i,i+2))
      }

      useEffect(()=>{
  if(userObj?._id){
dispatch( getFieldRegisterUserData(userObj?._id))
  }
      },[userObj?._id])

      const fieldRegisterObj=useSelector((state)=>state.fieldReport.getFieldRegisterUser)
      // console.log('fied register admin',fieldRegisterObj)

      const finalRegister=useSelector((state)=>state?.profileDeleteArray?.deleteProfileArrayObj)
      // console.log('final register',finalRegister)

      const replyMailHandler=(userObj)=>{
        const replyObj={
          name:userObj.firstName,
          phone:userObj.phone,
          email:userObj.email
        }
        navigation.navigate('ReplyMailPage',{formData:replyObj,headerName:'Reply Mail'})
      }
      const accessHandler=(userObj)=>{
        const accessObj={
          name:userObj.firstName,
          phone:userObj.phone,
          email:userObj.email,
          loginId:userObj._id,
          image:userObj.images[0]
        }
        navigation.navigate('AccessPage',{formData:accessObj,headerName:'Access'})
      }
return (
    <>
      <Card style={{ marginLeft: 8, marginRight: 8, marginTop:45, marginBottom:10, 
      backgroundColor: `#343434` }}>
            <Card.Content style={{height:'100%'}}>
            <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
          <Button onPress={backHandler}><Image source={back}   style={{ width:15, height:15,
            tintColor:`white` }}/></Button>
              </View>
              <ScrollView style={{ flexGrow: 1 }}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{ overflow: 'scroll' }}>
              <ScrollView
                pagingEnabled
                horizontal
                onScroll={change}
                showsHorizontalScrollIndicator={false}
              >
                {userObj?.images?.map((image, index) => {
                  return (
                    <Image
                      key={index}
                      source={{ uri: image }}
                      style={{ width, height, resizeMode:'cover'}}
                    />
                  );
                })}
                     
              </ScrollView>
              <View style={styles.pagination}>
              {userObj?.images.map((_, index) => (
              <Text key={index} style={index === active ? styles.activeDot : styles.dot}>•</Text>
            ))}
                </View>
            </View>
            <View style={{marginLeft:-105,marginTop:11,marginRight:30}}>
  <Pressable onPress={playVideoHandler}>
  <View style={{width:95,height:40,borderRadius:20,backgroundColor:'rgba(34, 197, 94, 2)'}}>
    <View style={{flexDirection:'row',marginTop:8,marginLeft:20}}>
  <Image source={play} style={{ width: 20, height:20, tintColor: 'white'}} />
  <Text style={{color:'white'}}>Play</Text>
    </View>
  </View>
  </Pressable>
            </View>
              </View>
              <View style={{flexDirection:'row',gap:12, paddingLeft:10,paddingTop:16}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:`white`}}>{userObj?.firstName}</Text>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:`white`}}>{userObj?.DOB}</Text>
        <Text style={{fontSize:16,fontWeight:'semibold',color:`white`}}>{userObj?.city}</Text>
      </View>

      <View style={{paddingLeft:10,paddingTop:3}}>
<Text style={{color:`white`}}>Working as {userObj?.profession  } </Text>
<Text style={{paddingTop:2,color:`white`}}>Studied {userObj?.education } </Text>
      </View>

      <View  style={{flexDirection:'row',justifyContent:"space-between"}}>
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Mobile Number</Text>
        <Text style={{fontSize:16 ,paddingTop:2, color:`white` }}>{userObj?.phone}</Text>
      </View>

      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Relationship status</Text>
        <Text style={{fontSize:16 ,paddingTop:2, color:`white`,textAlign:"center" }}>{userObj?.relationship}</Text>
      </View>
      </View>

      
      <View style={{flexDirection:'row',justifyContent:"space-between"}}>
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>I'm looking for</Text>
        <Text style={{fontSize:16 ,paddingTop:2, color:`white` }}>{userObj?.looking}</Text>
      </View>

      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Eating</Text>
        <Text style={{fontSize:16 ,paddingTop:2, color:`white` }}>{userObj?.eating}</Text>
      </View>
      </View>

      <View style={{paddingLeft:10,paddingTop:18}}>
      <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Interest</Text>
      <View>
       {
  rows.map((row, rowIndex) => (
    <View key={rowIndex} style={{ flexDirection: "row", gap: 12, paddingTop: 10 }}>
      {
        row.map((rowItem, itemIndex) => (
          <View  key={`${rowIndex}-${itemIndex}`} style={{ backgroundColor: 'rgba(226, 232, 240, 0.5)', width: 130, height: rowItem === "Charitable activities" ? 60 : 40 }}>
            <Text style={{ fontSize: 16, textAlign: 'center', paddingTop: 6,
           color:`white` }}>{rowItem}</Text>
          </View>
        ))
      }
      
    </View>
  ))
}
       </View>
      </View>


<View style={{flexDirection:'row',justifyContent:"space-between"}}>
<View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Education</Text>
        <Text style={{fontSize:16 ,paddingTop:2, color:`white` }}>{userObj?.education }</Text>
      </View>

      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Profession</Text>
        <Text style={{fontSize:16 ,paddingTop:2, color:`white` }}>{userObj?.profession}</Text>
      </View>

</View>
      
     <View  style={{flexDirection:'row',justifyContent:"space-between"}}>
     <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Drinking</Text>
        <Text style={{fontSize:16 ,paddingTop:2, color:`white` }}>{userObj?.drinking}</Text>
      </View>

      
      <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Smoking</Text>
        <Text style={{fontSize:16 ,paddingTop:2, color:`white` }}>{userObj.smoking }</Text>
      </View>
     </View>


{ fieldRegisterObj?.likes?.length>0?<View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Likes</Text>
        <ScrollView>
          {
            fieldRegisterObj?.likes?.map((likes,index)=>{
              return (
                
<AdminSmallCard commonObj={likes} key={likes?._id||index}/>
          
              )
            })
          }
        </ScrollView>
      </View>:null}


     {  fieldRegisterObj?.likeFilterUser?.length>0? <View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Like Filter User</Text>
        <ScrollView>
          {
            fieldRegisterObj?.likeFilterUser?.map((likeFilter,index)=>{
              return (
                
 <AdminSmallCard commonObj={likeFilter} key={likeFilter?._id||index}/>
                
              )
            })
          }
        </ScrollView>
      </View>:null}


      { fieldRegisterObj?.likeUser?.length>0?<View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Like User</Text>
        <ScrollView>
          {
            fieldRegisterObj?.likeUser?.map((likeUser,index)=>{
              return (
                
 <AdminSmallCard commonObj={likeUser} key={likeUser?._id||index}/>
                
              )
            })
          }
        </ScrollView>
      </View>:null}

      { fieldRegisterObj?.matchUser?.length>0?<View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Match User</Text>
        <ScrollView>
          {
            fieldRegisterObj?.matchUser?.map((matchUser,index)=>{
              return (
             
 <AdminSmallCard commonObj={matchUser} key={matchUser?._id || index} id={userObj?._id}/>
       
              )
            })
          }
        </ScrollView>
      </View>:null}

      {  fieldRegisterObj?.anotherMatchUser?.length>0?<View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Another Match User</Text>
        <ScrollView>
          {
            fieldRegisterObj?.anotherMatchUser?.map((anotherMatch,index)=>{
              return (
                
 <AdminSmallCard commonObj={anotherMatch} key={anotherMatch?._id || index } id={userObj?._id}/>
              
              )
            })
          }
        </ScrollView>
      </View>:null}


      {fieldRegisterObj?.onlineLikeUser?.length>0?<View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Online Like User</Text>
        <ScrollView>
          {
            fieldRegisterObj?.onlineLikeUser?.map((onlineLike,index)=>{
              return (
        
 <AdminSmallCard commonObj={onlineLike} key={onlineLike?._id ||index} id={userObj?._id}/>
          
              )
            })
          }
        </ScrollView>
      </View>:null}

      
      {fieldRegisterObj?.selfOnlineLikeUser?.length>0?<View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Self Online Like User</Text>
        <ScrollView>
          {
            fieldRegisterObj?.selfOnlineLikeUser?.map((selfOnline,index)=>{
              return (
                
 <AdminSmallCard commonObj={selfOnline} key={selfOnline?._id||index} id={userObj?._id}/>
              
              )
            })
          }
        </ScrollView>
      </View>:null}

      { fieldRegisterObj?.skipUser?.length>0?<View  style={{paddingLeft:10,paddingTop:18}}>
        <Text style={{fontSize:16 ,fontWeight:'semibold',color:'grey'}}>Skip User</Text>
        <ScrollView>
          {
            fieldRegisterObj?.skipUser?.map((skipUser,index)=>{
              return (
                
 <AdminSmallCard commonObj={skipUser} key={skipUser?._id||index} id={userObj?._id}/>
                
              )
            })
          }
        </ScrollView>
      </View>:null}

              </ScrollView>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:6}}>
              <Button
                      mode="contained"
                      style={{
                        borderRadius: 10,
                        marginTop: 9,
                      }}
                      buttonColor="blue"
                    onPress={()=>replyMailHandler(userObj)}
                    >
                      Reply
                    </Button>
                    <Button
                      mode="contained"
                      style={{
                        borderRadius: 10,
                        marginTop: 9,
                      }}
                      buttonColor="green"
                      onPress={()=>accessHandler(userObj)}
                    >
                      Access
                    </Button>
              </View>
            </Card.Content>
      </Card>
      <PlayVideo/>
    </>
)
}
const styles=StyleSheet.create({
    pagination: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: -15,
      alignSelf: 'center',
    },
    dot: {
      color: '#888',
      fontSize: 50,
    },
    activeDot: {
      color: '#FFF',
      fontSize: 50,
    },
    
  })
export default AdminLargeCard