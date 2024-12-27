import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Education } from '../../utils/EditPersonalInfo';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updatePersonalDataAsync } from '../../Redux/Slice/updatePersonalDataSlice/updatePersonalDataSlice';
import rightTik from '../../../assets/myProfileIcons/rightTik.png';
import { useEffect, useState } from "react";

const EditEducation = ({ navigation }) => {
    const [updateEducation, setUpdateEducation] = useState({});
    const dispatch = useDispatch();
    const completeLoginObj = useSelector((state) => state.loginData.loginData.completeLoginData);
    const completeLoginObjForOtp=useSelector((state)=>state.finalLoginWithOtpData.finalLoginWithOtpData.completeLoginData)
    const completeLoginObjData=completeLoginObj?completeLoginObj:completeLoginObjForOtp
    const updatePersonalInfoSelector = useSelector((state) => state?.updatePersonalData?.updatePersonalData?.updateData);

    const selectEducationHandler = (education) => {
        const updateEducationObj = {
            id: completeLoginObjData._id,
            education: education
        };
        dispatch(updatePersonalDataAsync(updateEducationObj));
        navigation.navigate('EditProfilePage');
    };

    useEffect(() => {
        if (updatePersonalInfoSelector) {
            setUpdateEducation(updatePersonalInfoSelector);
        } else {
            setUpdateEducation(completeLoginObjData);
        }
    }, [updatePersonalInfoSelector, completeLoginObjData]);

    return (
        <View style={{ paddingTop: 8, paddingLeft: 8 }}>
            {
                Education.map((education) => (
                    <View key={education.id} style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => selectEducationHandler(education.education)}>
                            <Text style={{
                                paddingTop: 22,
                                paddingLeft: 8,
                                fontSize: 15,
                                color: `${updateEducation?.education === education?.education ? 'rgba(0, 150, 255, 1)' : 'black'}`
                            }}>
                                {education.education}
                            </Text>
                        </TouchableOpacity>
                        {updateEducation?.education === education?.education ? 
                            <Image source={rightTik} style={{ width: 12, height: 12, marginTop: 24, marginRight: 30 }} /> 
                            : null}
                    </View>
                ))
            }
        </View>
    );
};

export default EditEducation;
