import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyInfoScreen from './MyInfoScreen';

const MyInfoStack = createNativeStackNavigator();

function MyInfoStacks() {
  // 랭킹관리, 코인, 앱 문의, 로그아웃, 회원 탈퇴 추가.

  return (
    <MyInfoStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#FAFAFF' },
        backgroundColor: '#FFFFFF',
        headerBackground: () => (
          <View style={{ backgroundColor: '#F0F0F0', flex: 1 }} />
        ),
      }}>
      <MyInfoStack.Screen
        name="내 정보"
        component={MyInfoScreen}
        options={{
          title: '내 정보',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        }}
      />
    </MyInfoStack.Navigator>
  );
}

export default MyInfoStacks;
