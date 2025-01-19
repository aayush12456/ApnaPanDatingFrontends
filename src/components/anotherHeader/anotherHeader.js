import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import arrow from '../../../assets/signUpFormIcon/back.png';
import { useSelector } from 'react-redux';
const AnotherHeader = ({ editObj,navigation }) => {
    const objSelector=useSelector((state)=>state.anotherPassData.anotherPassData)
    const anotherObjSelector=useSelector((state)=>state.passMatchData.passMatchData)
    console.log('another obj in another header',anotherObjSelector)
    const backArrowHandler = (name) => {
        console.log('name is',name)
        console.log('Back arrow clicked');
        if(name==='Edit Profile'){
        navigation.navigate('HeaderPage')
        }
        else if(name==='Select Relationship Status'){
            navigation.navigate('EditProfilePage')
        }
        else if(name==='Select Looking For'){
            navigation.navigate('EditProfilePage')
        }
        else if(name==='Select Education'){
            navigation.navigate('EditProfilePage')
        }
        else if(name==='Select Profession'){
            navigation.navigate('EditProfilePage')
        }
        else if(name==='Select Drinking Habit'){
            navigation.navigate('EditProfilePage')
        }
        else if(name==='Select Drinking Habit'){
            navigation.navigate('EditProfilePage')
        }
        else if(name==='Select Smoking Habit'){
            navigation.navigate('EditProfilePage')
        }
        else if(name==='Select Eating Habit'){
            navigation.navigate('EditProfilePage')
        }
        else if(name==='Select Zodiac Sign'){
            navigation.navigate('EditProfilePage')
        }
        else if(name==='Select Songs'){
            navigation.navigate('EditProfilePage')
        }
        else if(name==='About Me'){
            navigation.navigate('EditProfilePage')
        }
        else if(name==='Select Languages'){
            navigation.navigate('EditProfilePage')
        }
        else if(name==='Select Interest'){
            navigation.navigate('EditProfilePage')
        }
        else if(name==='My Photos'){
            navigation.navigate('EditProfilePage')
        }
        else if(name===objSelector?.firstName){
            navigation.navigate('NewAndOnlinePageContent',{formData:objSelector})
        }
        else if(name===anotherObjSelector?.firstName){
            navigation.navigate('Matches')
        }
    };

    return (
        <View style={{ backgroundColor: 'white', height: 50, marginTop: 40, flexDirection: 'row', alignItems: 'center' }}>
           
                <Button onPress={()=>backArrowHandler(editObj?.name)} style={{marginLeft:7}}
                ><Image source={arrow} style={{ width: 15, height: 15 }} /></Button>
      
           { (editObj?.name===objSelector?.firstName)|| (editObj?.name===anotherObjSelector?.firstName)?<Text style={{ textAlign: 'center', fontSize: 17, fontWeight: '600', color: 'black', flex: 1,paddingRight:40}}>
                {`${editObj?.name} photos` }
            </Text>:
           <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: '600', color: 'black', flex: 1,paddingRight:40}}>
                {editObj?.name }
            </Text>}
        </View>
    );
};

export default AnotherHeader;
