import * as React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ListScreen from './screens/ListScreen';
import RecordScreen from './screens/RecordScreen';
import SettingScreen from './screens/SettingScreen';
import VideoScreen from './screens/VideoScreen';
import NoticeScreen from './screens/NoticeScreen';
import SplashScreen from './screens/SplashScreen';
import InitialScreen from './screens/InitialScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { theme } from './styles/theme';

const Stack = createStackNavigator();
const ListStack = createStackNavigator();
const RecordStack = createStackNavigator();
const SettingStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ListStackScreen() {
  return (
    <ListStack.Navigator>
      <ListStack.Screen name="ListScreen" component={ListScreen} options={{ headerShown: false }} />
      <ListStack.Screen name="VideoScreen" component={VideoScreen} options={{headerShown:false}}/>
      <ListStack.Screen name="NoticeScreen" component={NoticeScreen} options={{headerShown:false}}/>
    </ListStack.Navigator>
  );
}

function RecordStackScreen()  {
  return (
    <RecordStack.Navigator>
      <RecordStack.Screen name="RecordScreen" component={RecordScreen} options={{ headerShown: false }} />
      <RecordStack.Screen name="NoticeScreen" component={NoticeScreen} options={{ headerShown: false }} />
    </RecordStack.Navigator>
  );
}

function SettingStackScreen()  {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen name="SettingScreen" component={SettingScreen} options={{ headerShown: false }} />
      <SettingStack.Screen name="NoticeScreen" component={NoticeScreen} options={{ headerShown: false }} />
    </SettingStack.Navigator>
  );
}

const MainTabScreen = ({navigation, route}) => {
  return (
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === '목록') {
              iconName = focused
                ? 'file-tray'
                : 'file-tray-full-outline';
            } else if (route.name === '설정') {
              iconName = focused ? 'settings' : 'settings-outline';
            }else{
              iconName = focused ? 'videocam' : 'videocam-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={35} color={color} />;
          },
          tabBarActiveTintColor: theme.purple,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle:{
            elevation: 0,
            textAlign: 'center',
            justifyContent: 'center',
            backgroundColor:'#FFFFFF',
            height: Dimensions.get('window').height * 0.09,
          }
        })}
        initialRouteName="Calendar"
        >

          <Tab.Screen name="촬영" component={RecordStackScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="목록" component={ListStackScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="설정" component={SettingStackScreen} options={{ headerShown: false }}/>
      </Tab.Navigator>
  );
}

function Auth() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InitialScreen"
        component={InitialScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: '',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: '',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainTab"
          component={MainTabScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};