import { Dimensions, View ,ScrollView,StyleSheet,Image,TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useState } from 'react';
const MyPhoto=()=>{
    const [active,setActive]=useState(0)
    const completeLoginObj=useSelector((state)=>state.loginData.loginData.completeLoginData)
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const change=({nativeEvent})=>{
   const slide=Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
   if(slide!=active){
    setActive(slide)
   }
    }
return (
    <>

<ScrollView
pagingEnabled
horizontal
onScroll={change}
showsHorizontalScrollIndicator={false}
style={{ width: screenWidth, height: screenHeight,marginTop:50,marginBottom:50 }}
>
{
  completeLoginObj.images.map((image,index)=>{
    return (
      <>
      <Image 
key={index}
source={{uri:image}}
style={{ width: screenWidth, height: screenHeight, resizeMode: 'cover' }}
/>
      </>
    )
  })
}

</ScrollView>

    </>
)
}
export default MyPhoto