import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Loading,
  Login,
  Home,
  SignUp,
  Profile,
  Income,
  Expense
} from './views';
import auth from '@react-native-firebase/auth';
import { navigationRef } from './RootNavigation';

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  })

  if (initializing) return <Loading />

  const Stack = createStackNavigator();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name='Home'
            component={HomeBottomTab}
            options={{
              title: 'My Hepeng',
              headerShown: true,
              headerLeft: null,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: '#bbe1fa',
                fontSize: 16
              },
              headerStyle: {
                backgroundColor: '#25343C',
              }
            }}
          />
        ) : (
          <Stack.Screen
            name='Login'
            component={Login}
            options={{
              title: 'Login',
              headerShown: false
            }}
          />
        )}
        <Stack.Screen
          name='SignUp'
          component={SignUp}
          options={{
            title: '',
            headerTransparent: true,
            headerTintColor: '#bbe1fa'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeBottomTab(){
  const BottomTab = createMaterialBottomTabNavigator();

  return(
  <BottomTab.Navigator
    initialRouteName="Home"
    activeColor="#bbe1fa"
    barStyle={{
      backgroundColor: '#25343C'
    }}
  >
    <BottomTab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: 'Dasbor',
        tabBarColor: '#25343C',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home-outline" color="#bbe1fa" size={20} />
        ),
      }}
    />
    <BottomTab.Screen
      name="Create"
      component={TopTabHome}
      options={{
        tabBarLabel: 'Tambah',
        tabBarColor: '#25343C',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-create-outline" color="#bbe1fa" size={20} />
        ),
      }}
    />
    <BottomTab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: 'Profil',
        tabBarColor: '#25343C',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person-outline" color="#bbe1fa" size={20} />
        )
      }}
    />
  </BottomTab.Navigator>
  );
}

const TopTab = createMaterialTopTabNavigator();

function TopTabHome() {
  return (
    <TopTab.Navigator
    tabBarOptions={{
      activeTintColor: '#bbe1fa',
      style: {
        backgroundColor: '#25343C'
      },
      indicatorStyle: {
        backgroundColor: '#bbe1fa'
      }
    }}
    initialRouteName="Pemasukan"
    >
      <TopTab.Screen
        name='Pemasukan'
        component={Income}
      />
      <TopTab.Screen
        name='Pengeluaran'
        component={Expense}
      />
    </TopTab.Navigator>
  );
}

export default App;
