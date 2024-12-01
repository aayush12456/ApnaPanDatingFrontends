import { Dimensions, ScrollView, Image } from 'react-native';
import { useState } from 'react';

const MyPhoto = ({ photoObj }) => {
  const [active, setActive] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = screenWidth * 1.2;

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide !== active) {
      setActive(slide);
    }
  };

  return (
    <>
      <ScrollView
        pagingEnabled
        horizontal
        onScroll={change}
        showsHorizontalScrollIndicator={false}
        style={{ width: screenWidth, height: screenHeight, marginTop: 50, marginBottom: 50 }}
      >
        {photoObj.images.map((image, index) => (
          <Image
            key={index} // Assign a unique key here
            source={{ uri: image }}
            style={{ width: screenWidth, height: screenHeight, resizeMode: 'cover' }}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default MyPhoto;
