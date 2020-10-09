import React, { useState, useContext } from 'react';

import { Image, ActivityIndicator } from 'react-native';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Input,
  Button,
  ButtonText
} from './styles'

import { UsuarioContext } from '../../contexts/user';

const Login = () => {

  const { signIn } = useContext(UsuarioContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit() {
    setCarregando(true)

    try {
      await signIn(email, password)
    } catch (err) {
      // console.warn('erro ao realizar a requisição')
    } finally {
      setCarregando(false)
    }

    // Auth

    // console.warn(email, password)
    // setCarregando(false)
  }

  return (
    <Container>
      <Image source={logoImg} />
      <Input
        value={email}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
      />
      <Input
        value={password}
        placeholder="Senha"
        onChangeText={text => setPassword(text)}
        secureTextEntry={true} />
      <Button onPress={handleSubmit} disabled={!password || !email}>

        {carregando ?
          <ActivityIndicator color="#333" />
          :
          <ButtonText>Acessar</ButtonText>
        }


      </Button>
    </Container>

  )
}

export default Login;