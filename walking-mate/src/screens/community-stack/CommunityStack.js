import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Colors from '../../themes/color';

import BulletinContextProvider from '../../contexts/Bulletin';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image, Text } from 'react-native';
import CommunityScreen from './CommunityScreen';
import VideoScreen from './VideoScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function BulletinTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.primary400,
        },
        tabBarPressOpacity: 0.5,
      }}>
      <Tab.Screen name="게시판" component={CommunityScreen} />
      <Tab.Screen name="영상" component={VideoScreen} />
    </Tab.Navigator>
  );
}

function CommunityStack() {
  return (
    <BulletinContextProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="커뮤니티"
          component={BulletinTabNavigator}
          options={({ navigation }) => ({
            headerTitleAlign: 'left',
            headerTitle: '커뮤니티',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <TouchableOpacity
                style={{
                  //marginLeft: 100,
                  marginRight: 5,
                  paddingBottom: 5,
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('워킹메이트 상담톡')}>
                <Image
                  source={require('../../../assets/image/AIBot.png')}
                  style={{ width: 30, height: 30 }}
                />
                <Text style={{ fontSize: 12 }}>
                  궁금한점이 있으면 물어보세요
                </Text>
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </BulletinContextProvider>
  );
}

export default CommunityStack;
