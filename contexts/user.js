import React, { createContext, useState, useEffect } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import firebase from 'firebase';

import 'firebase/auth'

const UsuarioContext = createContext({});

const UsuarioProvider = ({ children }) => {

  const [user, setUser] = useState(2);



  // useEffect(() => {

  //   const loadData = async () => {
  //     const user = await AsyncStorage.getItem("@TODO:user")

  //     if (user) {
  //       setUser(JSON.parse(user))
  //     }
  //   }

  //   loadData();
  // }, []);

  const ListenAuth = (userState) => {
    
    setUser(userState)
  }
    
  useEffect(()=>{
    const listener = firebase.auth().onAuthStateChanged(ListenAuth);
    return listener;
  },[])

  // const signIn = async (email, password) => {
  //   // console.warn('cheguei aqui')
  //   const response = await api.get('usuarios');


  //   const user = response.data.find((usuario) => {
  //     return email === usuario.email && password === usuario.password
  //   })


  //   if (user !== undefined) {
  //     setUser(user)
  //     await AsyncStorage.setItem("@TODO:user", JSON.stringify(user));
  //     //tenho que persistir em um storage / banco de dados embarcado

  //   } else {
  //     console.warn("Senha ou Usuário inválidos.")
  //   }

  // }

  const signIn = async (email,password) => {
    firebase.auth().signInWithEmailAndPassword(email,password).then(resp =>{
      console.warn(resp);
    }).catch(err=>{
      console.warn(err);
    })
    
  }

  // const signOut = async () => {
  //   await AsyncStorage.removeItem("@TODO:user");
  //   setUser(null)
  // }

  const signOut = async()=>{
    firebase.auth().signOut().then(resp =>{
      console.warn('Usuário deslogado com sucesso')
  }).catch(err=>{
    console.warn(err)
  })


  const signUp = async(email,password) => {
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(resp =>{
      console.warn('Cadastro concluido')
    })
    .catch(error =>{
      console.warn(error)
    })
  }

  return (
    <UsuarioContext.Provider value={{ user, signIn, signOut, signUp }}>
      {children}
    </UsuarioContext.Provider>
  )
}

}

export { UsuarioContext, UsuarioProvider }