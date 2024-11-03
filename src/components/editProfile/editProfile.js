import * as React from 'react';
import { Card,Text} from 'react-native-paper'
import { Dimensions, View ,ScrollView,StyleSheet,Image,TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import edit from '../../../assets/myProfileIcons/edit.png'
const EditProfile=({navigation})=>{
  const [active,setActive]=useState(0)
  const [loginObj,setLoginObj]=useState({})
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

    const updatePersonalInfoSelector=useSelector((state)=>state?.updatePersonalData?.updatePersonalData?.updateData)

    const getProfile = () =>completeLoginObj
    const dob = getProfile()?.DOB;
  const dobBreak = dob?.split("/");
  const year = dobBreak?.[2];
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  const age = year ? currentYear - parseInt(year) : "";

  const rows=[]
  for(let i=0;i<completeLoginObj.interest.length;i+=2){
    rows.push(completeLoginObj.interest.slice(i,i+2))
  }

  console.log('about user us',completeLoginObj.aboutUser)

  const editRelationHandler=()=>{
   navigation.navigate('EditRelationPage')
  }
 
  useEffect(()=>{
  if(updatePersonalInfoSelector){
  setLoginObj(updatePersonalInfoSelector)
  }
  else{
    setLoginObj(completeLoginObj)
  }
  },[updatePersonalInfoSelector,completeLoginObj])

  const editLookingForHandler=()=>{
    navigation.navigate('EditLookingForPage')
   }
   const editEducationHandler=()=>{
    navigation.navigate('EditEducationPage')
   }

return (
    <>
    <Card style={{marginLeft:8,marginRight:8,marginTop:20,backgroundColor:'white'}}>
    <Card.Content>
      <ScrollView>
      <View style={{ overflow: 'scroll' }}>
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
                  {completeLoginObj.images.map((_, k) => (
                    <Text key={k} style={k === active ? styles.activeDot : styles.dot}>•</Text>
                  ))}
                </View>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <View style={{flexDirection:'row',gap:12, paddingLeft:12,paddingTop:16}}>
        <Text style={{fontSize:17 ,fontWeight:'semibold'}}>{completeLoginObj?.firstName}</Text>
        <Text style={{fontSize:17 ,fontWeight:'semibold'}}>{age}</Text>
        <Text style={{fontSize:17,fontWeight:'semibold'}}>{completeLoginObj?.city}</Text>
      </View>
      <View>
      <TouchableOpacity>
          <Image source={edit} style={{marginRight:7,marginTop:16}}/>
        </TouchableOpacity>
      </View>
      </View>
      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>Relationship Status</Text>
        <TouchableOpacity onPress={editRelationHandler}>
          <Image source={edit} style={{marginRight:7,marginTop:18}}/>
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{loginObj?.relationship }</Text>
      </View>


      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>I'm looking for</Text>
        <TouchableOpacity onPress={editLookingForHandler}>
          <Image source={edit} style={{marginRight:7,marginTop:18}} />
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{loginObj?.looking}</Text>
      </View>


      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>Interest</Text>
        <TouchableOpacity>
          <Image source={edit} style={{marginRight:7,marginTop:18}}/>
        </TouchableOpacity>
        </View>
       <View>
       {
  rows.map((row, rowIndex) => (
    <View key={rowIndex} style={{ flexDirection: "row", gap: 12, paddingTop: 14, paddingLeft: 12 }}>
      {
        row.map((rowItem, itemIndex) => (
          <View  key={`${rowIndex}-${itemIndex}`} style={{ backgroundColor: 'rgba(226, 232, 240, 0.5)', width: 130, height: 40 }}>
            <Text style={{ fontSize: 17, textAlign: 'center', paddingTop: 6 }}>{rowItem}</Text>
          </View>
        ))
      }
    </View>
  ))
}
       </View>
      </View>
      

      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>About Me</Text>
        <TouchableOpacity>
          <Image source={edit} style={{marginRight:7,marginTop:18}}/>
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{completeLoginObj?.aboutUser}</Text>
      </View>


      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>Education</Text>
        <TouchableOpacity onPress={editEducationHandler}>
          <Image source={edit} style={{marginRight:7,marginTop:18}}/>
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{loginObj?.education}</Text>
      </View>


      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>Profession</Text>
        <TouchableOpacity>
          <Image source={edit} style={{marginRight:7,marginTop:18}}/>
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{completeLoginObj?.profession}</Text>
      </View>


      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>Drinking</Text>
        <TouchableOpacity>
          <Image source={edit} style={{marginRight:7,marginTop:18}}/>
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{completeLoginObj?.drinking}</Text>
      </View>


      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>Smoking</Text>
        <TouchableOpacity>
          <Image source={edit} style={{marginRight:7,marginTop:18}}/>
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{completeLoginObj?.smoking}</Text>
      </View>

      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>Eating</Text>
        <TouchableOpacity>
          <Image source={edit} style={{marginRight:7,marginTop:18}}/>
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{completeLoginObj?.eating}</Text>
      </View>

      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>Zodiac Sign</Text>
        <TouchableOpacity>
          <Image source={edit} style={{marginRight:7,marginTop:18}}/>
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{completeLoginObj?.zodiac}</Text>
      </View>

      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:18,fontSize:17 ,fontWeight:'semibold',color:'grey'}}>languages I know</Text>
        <TouchableOpacity>
          <Image source={edit} style={{marginRight:7,marginTop:18}}/>
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{completeLoginObj?.language}</Text>
      </View>

      <View>
        <View  style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{paddingLeft:12,paddingTop:14, paddingBottom:16, fontSize:17 ,fontWeight:'semibold',color:'grey'}}>languages I know</Text>
        <TouchableOpacity>
          <Image source={edit} style={{marginRight:7,marginTop:14}}/>
        </TouchableOpacity>
        </View>
        <Text style={{paddingLeft:12,paddingTop:7,fontSize:17 ,fontWeight:'semibold',color:'black'}}>{completeLoginObj?.language}</Text>
      </View>
      </View>
      </ScrollView>
      
    </Card.Content>
  </Card>
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
export default EditProfile