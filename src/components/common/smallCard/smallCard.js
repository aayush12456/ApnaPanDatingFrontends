import { View, Image, Text,Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const SmallCard = ({ likesData }) => {
    const navigation = useNavigation();
    console.log('likes image obj', likesData?.images?.[0]); // Safer logging

    const getProfile = () => likesData || {}; // Fallback to an empty object
    const dob = getProfile()?.DOB || ""; // Fallback to an empty string
    const dobBreak = dob?.split("/") || []; // Avoid errors with split
    const year = dobBreak?.[2];
    const currentYear = new Date().getFullYear();
    const age = year ? currentYear - parseInt(year) : ""; // Ensure safe calculation
    
    const imagePressHandler=(likeData)=>{
        console.log('image is pressed')
        navigation.navigate('LikePageContent', { formData:likeData });
    }
    return (
        <View>
            <Pressable onPress={()=>imagePressHandler(likesData)}>
            <Image
                source={{ uri: likesData?.images?.[0] || 'default_image_url' }} // Provide a default URI
                style={{ width: "100%", height:300, borderRadius: 10 }}
            />
            </Pressable>
            <View style={{ flexDirection: 'row', gap: 7, position: 'relative', top: -40, paddingLeft: 20 }}>
                <Text style={{ color: 'white', fontSize: 16 }}>{likesData?.firstName || "Unknown"}</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{age || "N/A"}</Text>
            </View>
        </View>
    );
};

export default SmallCard;
