import { Text, Image, View, TouchableOpacity} from "react-native";
import holdingHands from '../../../assets/frontImages/holdingHands.png';
import love from '../../../assets/frontImages/love.png';
import { FrontImages } from "../../utils/frontImages";

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
      <View style={{ flex: 1, flexDirection: 'row', width:'200', alignItems: 'center', justifyContent: 'center'}}>
        <View style={{width:'90%' ,overflow:'hidden'}}>
        <TouchableOpacity 
          style={{
            height: 50, // Set the desired height
            borderRadius:25,
            backgroundColor: '#007BFF', // Button color
            justifyContent: 'center', // Center text vertically
            alignItems: 'center', // Center text horizontally
          }} 
          onPress={() => navigation.navigate('SignUpPage')}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 16 }}>SIGN UP NOW</Text>
        </TouchableOpacity>
        
        {/* Login Button */}
        <TouchableOpacity 
          style={{
            height: 50, // Set the desired height
            borderRadius:25,
            backgroundColor: '#28a745', // Button color
            justifyContent: 'center', // Center text vertically
            alignItems: 'center', // Center text horizontally
            marginTop: 20, // Space between buttons
          }} 
          onPress={() => navigation.navigate('LoginPage')}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 16 }}>LOGIN</Text>
        </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default FrontPage;
