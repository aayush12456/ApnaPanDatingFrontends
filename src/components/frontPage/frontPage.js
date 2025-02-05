import { Text, Image, View,Modal} from "react-native";
import holdingHands from '../../../assets/frontImages/holdingHands.png';
import love from '../../../assets/frontImages/love.png';
import { FrontImages } from "../../utils/frontImages";
import { Button } from "react-native-paper";
import { useEffect,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification';
import { hideToast } from "../../Redux/Slice/toastSlice/toastSlice";
import { hideToasts } from "../../Redux/Slice/changePasswordToastSlice/changePasswordToastSlice";
const FrontPage = ({navigation,route}) => {
  const formData=route?.params?.formData
  // console.log('form data',formData)
  const dispatch=useDispatch()
  const { visible, type, title, textBody } = useSelector((state) => state.toastData);
  const { visibles, types, titles, textBodys } = useSelector((state) => state.toasts);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteToastObj,setDeleteToastObj]=useState({})
  // console.log('toast data',visible,type,title,textBody)
  // console.log('toast datas',visibles,types,titles,textBodys)
  const deleteProfileResponse=useSelector((state)=>state.deleteProfileData.deleteProfileUserObj.msg)
  // console.log('delete profile in front',deleteProfileResponse)
  const lightColors = {
    label: '#000000',
    card: '#ffffff',
    overlay: '#f1f1f1',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
  };
  
useEffect(() => {
    if (visible===true ) {
      // console.log('Toast Data:', { type, title, textBody });
      Dialog.show({
        type: ALERT_TYPE[type],
        title: title,
        textBody: textBody,
        button:'close'
      });

      // Automatically hide toast after 3 seconds
      setTimeout(() => {
        dispatch(hideToast());
      }, 3000);
    }
  }, [visible, dispatch, type, title, textBody]);


  useEffect(() => {
    if (visibles === true ) {
      // Show custom modal instead of default Alert
      setModalVisible(true);

      // Automatically hide modal after 3 seconds
      setTimeout(() => {
        setModalVisible(false);
        dispatch(hideToasts());
      }, 10000);
    }
  }, [visibles, dispatch, types, titles, textBodys]);

  useEffect(()=>{
if(deleteProfileResponse){
setModalVisible(true);
setDeleteToastObj({title:'Success',textBody:'You have Successfully deleted your account on ApnaPan'})
// Automatically hide modal after 3 seconds
// setTimeout(() => {
//   setModalVisible(false);
//   dispatch(hideToasts());
// }, 10000);
}
  },[deleteProfileResponse])

  useEffect(()=>{
    if(formData){
    setModalVisible(true);
    setDeleteToastObj({title:'Success',textBody:'You have Successfully deactivate your account on ApnaPan now you can check it is working or not'})
    }
      },[formData])
  return (
    <>
<AlertNotificationRoot colors={[lightColors]} >
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ width: 300, padding: 20, backgroundColor: '#fff', borderRadius: 10, alignItems: 'center' }}>
            <Image source={holdingHands} style={{ width: 50, height: 50, marginBottom: 10 }} />
            <Text style={{ fontSize: 19, fontWeight: 'bold', marginBottom: 10 }}>{titles ||deleteToastObj.title} </Text>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>{textBodys||deleteToastObj.textBody} </Text>
  
             <Button
                      mode="contained"
                      onPress={() => setModalVisible(false)}
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
             Close
                    </Button>
          </View>
        </View>
      </Modal>
      
</AlertNotificationRoot>
   
    </>
  );
};

export default FrontPage;
