import {Text,View,Image} from 'react-native'
import arrow from '../../../assets/signUpFormIcon/back.png'
const AnotherHeader=({editObj})=>{
return (
    <>
    <View style={{backgroundColor:'white',height:50,marginTop:40}}>
<Image source={arrow} style={{width:15,height:15 ,marginTop:16, marginLeft: 14}}/>
<Text style={{textAlign:'center',marginTop:-20 ,fontSize:19,fontWeight:'semibold',color:'black'}}>{editObj?.name}</Text>
    </View>
    </>
)
}
export default AnotherHeader