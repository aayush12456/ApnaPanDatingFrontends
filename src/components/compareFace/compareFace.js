import compareImage from '../../../assets/AllIcons/compareImage.png'
import secondCompareImage from '../../../assets/AllIcons/secondCompareImage.png'
import {View,Text,Image} from 'react-native'
const CompareFace=()=>{
return (
    <>
    <View style={{flexDirection:"row",justifyContent:'space-between',paddingTop:30}}> 
        <Text style={{fontSize: 15, fontWeight: '600', color: 'black',paddingLeft:15}}>
            Capture Image
        </Text>
        <Text style={{fontSize: 15, fontWeight: '600', color: 'black',paddingRight:15}}>
            Upload Image
        </Text>
    </View>
    <View style={{flexDirection:"row",justifyContent:'center',marginTop:26}}>
    <Image source={compareImage} style={{width:350,height:100,resizeMode:'cover'}}/>
    </View>
    <View style={{flexDirection:"row",justifyContent:'center',marginTop:36}}>
    <Image source={secondCompareImage} style={{width:350,height:100,resizeMode:'cover'}}/>
    </View>
    </>
)
}
export default CompareFace