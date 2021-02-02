import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import SignUpLogin from './screens/SignUpAndLoginScreen'
import Welcome from './screens/WelcomeScreen'
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createSwitchNavigator,createAppContainer} from 'react-navigation'
import Home from './screens/HomeScreen'
import Exchange from './screens/ExchangeScreen'

export default function App() {
  return (
    <AppContainer/>
    
  );
}


const TabNavigator=createBottomTabNavigator(
  {
  HomePage:{screen:Home},
  ExchangePage:{screen:Exchange}
  },
  {
     defaultNavigationOptions:({navigation})=>({
          tabBarIcon:()=>{
            const routeName=navigation.state.routeName

            if(routeName==="HomePage"){
                return(
                  <Image
                  source={require('./assets/favicon.png')}
                  style={{width:50,height:50}}/>
                )
            }
            else if(routeName==="ExchangePage"){
              return(
                <Image
                source={require('./assets/favicon.png')}
                style={{width:50,height:50}}/>
              )
            }
            
          }
     })
  }
)

const SwitchNavigate=createSwitchNavigator({
  WelcomeScreen:{screen:Welcome},
  Tab:{screen:TabNavigator}
})

const AppContainer=createAppContainer(SwitchNavigate)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
