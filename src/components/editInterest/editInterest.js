import { Text, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Interest } from '../../utils/EditPersonalInfo';
import { updatePersonalDataAsync } from '../../Redux/Slice/updatePersonalDataSlice/updatePersonalDataSlice';
import { useEffect, useState } from "react";

const EditInterest = ({ navigation,completeObj }) => {
  const [updateInterest, setUpdateInterest] = useState({});
  const dispatch = useDispatch();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const completeLoginObj = useSelector((state) => state.loginData.loginData.completeLoginData);
  const completeLoginObjForOtp=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.completeLoginData)
  const completeLoginObjData=completeLoginObj?completeLoginObj:completeLoginObjForOtp
  const updatePersonalInfoSelector = useSelector((state) => state?.updatePersonalData?.updatePersonalData?.updateData);

  const rows = [];
  for (let i = 0; i < Interest.length; i += 3) {
    rows.push(Interest.slice(i, i + 3));
  }

  const interestSelectHandler = (rowItem) => {
    const index = selectedInterests.indexOf(rowItem.interest);
    if (index === -1) {
      setSelectedInterests((prevSelected) => [...prevSelected, rowItem.interest]);
    } else {
      setSelectedInterests((prevSelected) =>
        prevSelected.filter((item) => item !== rowItem.interest)
      );
    }
  };

  const interestSubmitHandler = () => {
    const interestObj = {
      id: completeLoginObjData?._id,
      interest: selectedInterests,
    };
    dispatch(updatePersonalDataAsync(interestObj));
    navigation.navigate('EditProfilePage');
  };

  useEffect(() => {
    if (updatePersonalInfoSelector) {
      setUpdateInterest(updatePersonalInfoSelector);
    } else {
      setUpdateInterest(completeLoginObjData);
    }
  }, [updatePersonalInfoSelector, completeLoginObjData]);

  return (
    <>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: "row", gap: 12, paddingTop: 14, paddingLeft: 12 }}>
          {row.map((rowItem, itemIndex) => (
            <TouchableOpacity key={`${rowItem.interest}-${itemIndex}`} onPress={() => interestSelectHandler(rowItem)}>
              <View
                style={{
                  width: 100,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: updateInterest?.interest?.includes(rowItem?.interest)
                    ? 'rgba(83, 148, 228, 1)'
                    : 'rgba(226, 232, 240, 0.5)',
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: 'center',
                    paddingTop: 6,
                    color: updateInterest?.interest?.includes(rowItem?.interest) ? 'white' :`${completeObj?.appearanceMode==='Dark Mode'?'white':'black'}`,
                  }}
                >
                  {rowItem.interest}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <View style={{ width: '100%', overflow: 'hidden' }}>
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: 'rgba(83, 148, 228, 1)',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            marginLeft: 12,
            marginRight: 20,
            borderRadius: 11,
          }}
          onPress={interestSubmitHandler}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 16 }}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EditInterest;
