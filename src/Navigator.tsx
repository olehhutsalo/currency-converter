import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Converter from './screens/Converter'
import CurrencyRates from './screens/CurrencyRates'
import { AntDesign } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export default () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            switch (route.name) {
              case 'Converter':
                return <AntDesign name='calculator' size={size} color={color} />
              case 'Currency Rates':
                return <AntDesign name='barschart' size={size} color={color} />
              default:
                return <AntDesign name='question' size={size} color={color} />
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: '#00d998',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name='Converter' component={Converter} />
        <Tab.Screen name='Currency Rates' component={CurrencyRates} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
