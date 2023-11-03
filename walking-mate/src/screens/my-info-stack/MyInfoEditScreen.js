import { StyleSheet, Text, View, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import InfoInput from '../../components/my-info/InfoInput';
import BottomButton from '../../components/common/BottomButton';
import { UserAuthService } from '../../services/UserAuthService';
import { useNavigation } from '@react-navigation/native';

<<<<<<< HEAD
function MyInfoEditScreen({ route }) {
  console.log('내 정보 수정 화면에 들어왔음.');
  console.log(route.params.user.user);
=======
function MyInfoEditScreen() {
>>>>>>> master
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [passwordsMatch, setPassWordMatch] = useState(true);
  const [bottomPress, setBottomPress] = useState(false);

  function nameChangeHandler(enteredName) {
    setName(enteredName);
  }

  function phoneChangeHandler(enteredPhone) {
    setPhone(enteredPhone);
  }

  function passwordChangeHandler(enteredPassword) {
    setPassword(enteredPassword);
  }

  function rePasswordChangeHandler(enteredRePassword) {
    setRePassword(enteredRePassword);
  }

  async function handleDataSubmission() {
    try {
      const response = await UserAuthService.updateUserInfo(
        name,
        phone,
        password
      );
      if (response.success) {
        Alert.alert('성공', '정보가 성공적으로 수정되었습니다.', [
          {
            text: '확인',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert('오류', '정보 수정에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Failed to submit data:', error);
      Alert.alert('오류', '서버와의 통신 중 오류가 발생했습니다.');
    }
  }

  useEffect(() => {
    if (password.length <= rePassword.length && password !== rePassword) {
      setPassWordMatch(false);
    } else if (
      password.length === rePassword.length &&
      password === rePassword
    ) {
      setPassWordMatch(true);
    }
  }, [password, rePassword]);

  useEffect(() => {
    if (passwordsMatch && name && password.length === rePassword.length) {
      setBottomPress(true);
    } else {
      setBottomPress(false);
    }
  }, [passwordsMatch, name, password, rePassword]);

  return (
    <View style={styles.rootContainer}>
      <InfoInput
        placeholder="이름을 입력하세요"
        onChangeText={nameChangeHandler}
        value={name}
        returnKeyType="next"
        maxLength={4}>
        이름
      </InfoInput>

      <InfoInput
        placeholder="전화번호를 입력하세요"
        onChangeText={phoneChangeHandler}
        value={phone}
        returnKeyType="next"
        maxLength={11}>
        전화번호
      </InfoInput>

      {!passwordsMatch && (
        <Text style={styles.error}>비밀번호가 일치하지 않습니다.</Text>
      )}
      <InfoInput
        placeholder="비밀번호"
        onChangeText={passwordChangeHandler}
        value={password}
        returnKeyType="next"
        secureTextEntry={true}>
        비밀번호
      </InfoInput>

      <InfoInput
        placeholder="비밀번호 확인"
        onChangeText={rePasswordChangeHandler}
        value={rePassword}
        returnKeyType="done"
        secureTextEntry={true}>
        비밀번호 확인
      </InfoInput>

      <BottomButton
        BottomText="수정하기"
        pressed={bottomPress}
        onPress={handleDataSubmission}
      />
    </View>
  );
}

export default MyInfoEditScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 40,
    backgroundColor: '#F5FAFA',
  },
  error: {
    color: 'red',
    marginBottom: 5,
  },
});
