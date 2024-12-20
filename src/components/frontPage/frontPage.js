import { Text, Image, View} from "react-native";
import holdingHands from '../../../assets/frontImages/holdingHands.png';
import love from '../../../assets/frontImages/love.png';
import { FrontImages } from "../../utils/frontImages";
import { Button } from "react-native-paper";
const FrontPage = ({navigation}) => {
  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:80 ,justifyContent:'center'}}>
        <Text style={{ fontWeight: 'bold', fontSize: 40 }}>Apna
          <View style={{ marginTop: 20 }}>
            <Image
              source={holdingHands} // Local image
              style={{ width: 25, height: 25 }} // Adjust the size as needed
            />
            <Image
              source={love} // Local image
              style={{ width: 25, height: 25 }} // Adjust the size as needed
            />
          </View>
          Pan
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 13, marginTop: 12 ,justifyContent:'center'}}>
        {FrontImages.map(frontItem => (
          <Image 
            key={frontItem.id} // Ensure to add a unique key for each image
            source={frontItem.img}  
            style={{ width: 72, height: 125, borderRadius: 20.5 }} 
          />
        ))}
      </View>
      <View style={{ flexDirection: 'row',justifyContent:'center'}}>
      <Text style={{ fontSize: 16, paddingTop: 12 }}>
        Meet Millions of Awesome Singles Near You
      </Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <View style={{width:'90%' }}>
         <Button
                      mode="contained"
                      onPress={() => navigation.navigate('SignUpPage')}
                      style={{
                        height: 50, // Set the desired height
                        borderRadius:25,
                        color: '#FFFFFF',
                         fontSize: 16, 
                         justifyContent:'center',
                         width:'100%'
                      }}
                      buttonColor="#007BFF"
                    >
                     SIGN UP NOW
                    </Button>
        <Button
                      mode="contained"
                      onPress={() => navigation.navigate('LoginPage')}
                      style={{
                        height: 50, // Set the desired height
                        borderRadius:25,
                        color: '#FFFFFF',
                         fontSize: 16, 
                         justifyContent:'center',
                         width:'100%',
                         marginTop: 20
                      }}
                      buttonColor="#28a745"
                    >
               LOGIN
                    </Button>
        </View>
      </View>
    </>
  );
};

export default FrontPage;
