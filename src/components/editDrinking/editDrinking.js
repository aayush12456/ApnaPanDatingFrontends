import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import rightTik from '../../../assets/myProfileIcons/rightTik.png';
import { Drinking } from '../../utils/EditPersonalInfo';
import { updatePersonalDataAsync } from '../../Redux/Slice/updatePersonalDataSlice/updatePersonalDataSlice';
import { useEffect, useState } from "react";

const EditDrinking = ({ navigation }) => {
    const [updateDrinking, setUpdateDrinking] = useState({});
    const dispatch = useDispatch();
    const completeLoginObj = useSelector((state) => state.loginData.loginData.completeLoginData);
    const updatePersonalInfoSelector = useSelector((state) => state?.updatePersonalData?.updatePersonalData?.updateData);

    const selectDrinkingHandler = (drinking) => {
        const updateDrinkingObj = {
            id: completeLoginObj._id,
            drinking: drinking
        };
        dispatch(updatePersonalDataAsync(updateDrinkingObj));
        navigation.navigate('EditProfilePage');
    };

    useEffect(() => {
        if (updatePersonalInfoSelector) {
            setUpdateDrinking(updatePersonalInfoSelector);
        } else {
            setUpdateDrinking(completeLoginObj);
        }
    }, [updatePersonalInfoSelector, completeLoginObj]);

    return (
        <View style={{ paddingTop: 8, paddingLeft: 8 }}>
            {
                Drinking.map((drinking, index) => {
                    return (
                        <View key={drinking.id || `${drinking.drinking}-${index}`} style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => selectDrinkingHandler(drinking.drinking)}>
                                <Text style={{
                                    paddingTop: 22,
                                    paddingLeft: 8,
                                    fontSize: 15,
                                    color: `${updateDrinking?.drinking === drinking?.drinking ? 'rgba(0, 150, 255, 1)' : 'black'}`
                                }}>
                                    {drinking.drinking}
                                </Text>
                            </TouchableOpacity>
                            {updateDrinking?.drinking === drinking?.drinking ?
                                <Image source={rightTik} style={{ width: 12, height: 12, marginTop: 24, marginRight: 30 }} /> : null}
                        </View>
                    );
                })
            }
        </View>
    );
};

export default EditDrinking;
