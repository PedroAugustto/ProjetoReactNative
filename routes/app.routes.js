import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Projetos from '../pages/Projetos';
import TarefasProjeto from '../pages/TarefasProjeto';
import Tarefas from '../pages/Tarefas';
import Dashboard from '../pages/Dashboard';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator ();

const StackProjetos = () => {
  return(
      <Stack.Navigator 
      initialRouteName="Projetos">
          <Stack.Screen  name="Projetos" component={Projetos}/>
          <Stack.Screen  name="TarefasProjeto" component={TarefasProjeto}/>
      </Stack.Navigator>
  )
}

const AppRoutes = () => {
  return (
    <Tab.Navigator
      initialRouteName="StackProjetos"
      tabBarOptions={
        {
          activeTintColor: '#017374',
          inactiveTintColor: '#ccc',
        }
      }>
      <Tab.Screen
      name="StackProjetos"
      component={StackProjetos}
      options={
        {
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="folder"
              color={color}
              size={32} />
          )
        }
      } />
      <Tab.Screen
        name="Tarefas"
        component={Tarefas}
        options={
          {
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="playlist-check"
                color={color}
                size={32} />
            )
          }
        } />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={
          {
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="view-dashboard"
                color={color}
                size={32} />
            )
          }
        } />

    </Tab.Navigator>
  )
}

export default AppRoutes;