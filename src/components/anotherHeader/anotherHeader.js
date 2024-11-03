import { Text, View, Image, TouchableOpacity } from 'react-native';
import arrow from '../../../assets/signUpFormIcon/back.png';

const AnotherHeader = ({ editObj,navigation }) => {
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
    };

    return (
        <View style={{ backgroundColor: 'white', height: 50, marginTop: 40, flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={()=>backArrowHandler(editObj?.name)} style={{marginLeft: 18}} >
                <Image source={arrow} style={{ width: 15, height: 15 }} />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', fontSize: 19, fontWeight: '600', color: 'black', flex: 1}}>
                {editObj?.name }
            </Text>
        </View>
    );
};

export default AnotherHeader;
