import * as React from 'react';
import { Card,Text} from 'react-native-paper'
import { Dimensions, View ,ScrollView,StyleSheet,Image,TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import edit from '../../../assets/myProfileIcons/edit.png'
const EditProfile=()=>{
  const [active,setActive]=useState(0)
    const width = Dimensions.get('window').width-50;
    console.log('widht us',width)
    const height=width *1.2
    const change=({nativeEvent})=>{
   const slide=Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
   if(slide!=active){
    setActive(slide)
   }
    }
    const completeLoginObj=useSelector((state)=>state.loginData.loginData.completeLoginData)
    console.log('complete  login response data in login',completeLoginObj)

    const getProfile = () =>completeLoginObj
    const dob = getProfile().DOB;
  const dobBreak = dob?.split("/");
  const year = dobBreak?.[2];
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  const age = year ? currentYear - parseInt(year) : "";
return (
    <>
    <Card style={{marginLeft:8,marginRight:8,marginTop:20,backgroundColor:'white'}}>
    <Card.Content>
      <View>
<ScrollView
pagingEnabled
horizontal
onScroll={change}
showsHorizontalScrollIndicator={false}
style={{width,height}}
>
{
  completeLoginObj.images.map((image,index)=>{
    return (
      <>
      <Image 
key={index}
source={{uri:image}}
style={{width,height,resizeMode:'cover'}}
/>
      </>
    )
  })
}

</ScrollView>
<View style={styles.pagination}>
{
  completeLoginObj.images.map((i,k)=>{
    return (
      <>
      <Text key={k} style={k===active?styles.activeDot:styles.dot}>.</Text>
      </>
    )
  })
}
</View>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <View style={{flexDirection:'row',gap:12, paddingLeft:12,paddingTop:10}}>
        <Text style={{fontSize:17 ,fontWeight:'semibold'}}>{completeLoginObj?.firstName}</Text>
        <Text style={{fontSize:17 ,fontWeight:'semibold'}}>{age}</Text>
        <Text style={{fontSize:17,fontWeight:'semibold'}}>{completeLoginObj?.city}</Text>
      </View>
      <View>
      <TouchableOpacity>
          <Image source={edit} style={{marginRight:7,marginTop:8}}/>
        </TouchableOpacity>
      </View>
      </View>
      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:14,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>Relationship Status</Text>
        <TouchableOpacity>
          <Image source={edit} style={{marginRight:7,marginTop:14}}/>
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{completeLoginObj?.relationship}</Text>
      </View>


      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:14,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>I'm looking for</Text>
        <TouchableOpacity>
          <Image source={edit} style={{marginRight:7,marginTop:14}}/>
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{completeLoginObj?.looking}</Text>
      </View>


      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:14,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>Interest</Text>
        <TouchableOpacity>
          <Image source={edit} style={{marginRight:7,marginTop:14}}/>
        </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',}}>
          {
            completeLoginObj?.interest.map(interest=>{
              return (
                <>
                <View style={{backgroundColor:'blue',}}>
                  <Text>{interest}</Text>
                </View>
                </>
              )
            })
          }
        </View>
      </View>
    </Card.Content>
  </Card>
    </>
)
}
const styles=StyleSheet.create({
  pagination:{
    flexDirection:'row',
    position:'absolute',
    bottom:-15,
    alignSelf:'center' 
  },
  dot:{
    colour:'#888',
    fontSize:50
  },
  activeDot:{
    colour:'#FFF',
    fontSize:50
  }
})
export default EditProfile