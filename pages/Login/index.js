import React, { useState, useContext } from 'react';

import { Image, ActivityIndicator, Text } from 'react-native';

import logoImg from '../../assets/logo1.png';
import UsuarioImg from '../../assets/usuario312.png'

import {
  Container,
  Input,
  Button,
  ButtonText,
  Btn,
  BtnText,
  Slide,
  ModalContainer,
  Titulo,
  InputCadastro,
  Img,
  Box,
  Box1,
} from './styles'

import { UsuarioContext } from '../../contexts/user';

const Login = () => {

  const { signIn } = useContext(UsuarioContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleSubmit() {
    setCarregando(true)

    try {
      await signIn(email, password)
    } catch (err) {
      console.warn('erro ao realizar a requisição')
    } finally {
      setCarregando(false)
    }

    // Auth

    // console.warn(email, password)
    // setCarregando(false)
  }

  return (
    <Container>
      <Box>
        <Img source={logoImg} />
      </Box>

      <Box1>
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

        <Btn onPress={() => setOpen(true)}>
          <BtnText Bold>Não possui um login? Cadastre-se</BtnText>
        </Btn>
      </Box1>

      <Slide visible={open}>
        <ModalContainer>
          
          {/* <Image source={UsuarioImg}/> */}

          <Titulo>Complete com seus dados:</Titulo>

          <InputCadastro
            /* value = {NomeCadastro} */
            placeholder = 'Digite seu nome'
            /* onChangeText = {} */
          />
          <InputCadastro
            /* value = {EmailCadastro} */
            placeholder = 'Digite seu email'
          /*  onChangeText = {} */
          />
          <InputCadastro
            /* value = {PasswordCadastro} */
            placeholder = 'Digite sua senha'
            /* onChangeText = {} */
          />

          <Button>
            <ButtonText>Cadastrar</ButtonText>
          </Button>

          <Button onPress={() => setOpen(false)}>
            <ButtonText>Já possui um login?</ButtonText>
          </Button>

        </ModalContainer>
      </Slide>

    </Container>

  )
}

export default Login;