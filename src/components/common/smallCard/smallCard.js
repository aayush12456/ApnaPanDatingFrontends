import { View, Image, Text } from 'react-native';

const SmallCard = ({ likesData }) => {
    console.log('likes image obj', likesData?.images?.[0]); // Safer logging

    const getProfile = () => likesData || {}; // Fallback to an empty object
    const dob = getProfile()?.DOB || ""; // Fallback to an empty string
    const dobBreak = dob?.split("/") || []; // Avoid errors with split
    const year = dobBreak?.[2];
    const currentYear = new Date().getFullYear();
    const age = year ? currentYear - parseInt(year) : ""; // Ensure safe calculation

    return (
        <View>
            <Image
                source={{ uri: likesData?.images?.[0] || 'default_image_url' }} // Provide a default URI
                style={{ width: "100%", height:300, borderRadius: 10 }}
            />
            <View style={{ flexDirection: 'row', gap: 7, position: 'relative', top: -40, paddingLeft: 20 }}>
                <Text style={{ color: 'white', fontSize: 16 }}>{likesData?.firstName || "Unknown"}</Text>
                <Text style={{ color: 'white', fontSize: 16 }}>{age || "N/A"}</Text>
            </View>
        </View>
    );
};

export default SmallCard;
