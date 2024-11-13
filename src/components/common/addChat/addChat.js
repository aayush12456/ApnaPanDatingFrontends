import { Modal, Portal, Text } from 'react-native-paper';
import { useDispatch,useSelector } from 'react-redux';
import { addChatModalActions } from '../../../Redux/Slice/addChatModalSilce/addChatModalSlice';
const AddChat=()=>{

  const dispatch = useDispatch();
    const containerStyle = {backgroundColor: 'white', padding: 20,zIndex:20,width:'86%',marginLeft:30};
    const toggleModalHandler = () => {
      dispatch(addChatModalActions.addChatVisibleToggle());
    };
    const chatModalOpenSelector=useSelector((state)=>state.addChatModalData.addChatModalToggle)
    console.log('add chat modal selector in type',chatModalOpenSelector)

    const chatSelector=useSelector((state)=>state.passData.passData)
    console.log('chat in add chat',chatSelector)
return (
    <>
      <Portal>
        <Modal  visible={chatModalOpenSelector} onDismiss={toggleModalHandler} contentContainerStyle={containerStyle}>
        <Text style={{fontSize:14}}><Text style={{fontWeight:'700'}}>Add Chat </Text> only works when you have paired with  <Text style={{fontWeight:'700'}}>{chatSelector}</Text></Text>
        </Modal>
      </Portal>

    </>
)
}
export default AddChat