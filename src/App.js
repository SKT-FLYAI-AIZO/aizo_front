import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ListScreen from './screens/ListScreen';
import RecordScreen from './screens/RecordScreen';
import SettingScreen from './screens/SettingScreen';
import { theme } from './styles/theme';

const DiaryStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const StatisticsStack = createStackNavigator();

function ListStackScreen() {
  return (
    <DiaryStack.Navigator>
      <DiaryStack.Screen name="ListScreen" component={ListScreen} options={{ headerShown: false }} />
    </DiaryStack.Navigator>
  );
}

function RecordStackScreen()  {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="RecordScreen" component={RecordScreen} options={{ headerShown: false }} />
    </SettingsStack.Navigator>
  );
}

function SettingStackScreen()  {
  return (
    <StatisticsStack.Navigator>
      <StatisticsStack.Screen name="SettingScreen" component={SettingScreen} options={{ headerShown: false }} />
    </StatisticsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
            height: 60,
          }
        })}
        initialRouteName="Calendar"
        >

          <Tab.Screen name="촬영" component={RecordStackScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="목록" component={ListStackScreen} options={{ headerShown: false }}/>
          <Tab.Screen name="설정" component={SettingStackScreen} options={{ headerShown: false }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}