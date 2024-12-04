import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ideas } from './components/ideas';
import Profile, {Component2} from './components/profile';

const Tab = createBottomTabNavigator();

const AppLayout = () => {
  return (
      <NavigationContainer>
        <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Ідеї') {
                  iconName = 'lightbulb';
                } else if (route.name === 'Профіль') {
                  iconName = 'person';
                }

                return <Icon name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#007BFF',
              tabBarInactiveTintColor: '#999',
            })}
        >
          <Tab.Screen name="Ідеї" component={Ideas} />
          <Tab.Screen name="Профіль" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
  );
};
export default AppLayout;
