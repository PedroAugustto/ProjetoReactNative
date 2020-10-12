import React, { useState, useContext } from 'react';

import { Image, ActivityIndicator, Text } from 'react-native';

import logoImg from '../../assets/logo.png';
import UsuarioImg from '../../assets/usuario.png'

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

      <Btn onPress={() => setOpen(true)}>
        <BtnText>Não possui um login? Cadastre-se</BtnText>
      </Btn>

      <Slide visible={open}>
        <ModalContainer>
          
          {/* <Image source={UsuarioImg} width = {30} height = {30} /> */}

          <Titulo>Informe os seguintes dados para criar um usuário:</Titulo>

          <InputCadastro
            /* value = {NewNome} */
            placeholder = 'Digite seu nome'
            /* onChangeText = {} */
          />
          <InputCadastro
            /* value = {newEmail} */
            placeholder = 'Digite seu email'
          /*  onChangeText = {} */
          />
          <InputCadastro
            /* value = {NewPassword} */
            placeholder = 'Digite sua senha'
            /* onChangeText = {} */
          />

          <Btn onPress={() => setOpen(false)}>
            <ButtonText>Já possui um login?</ButtonText>
          </Btn>

        </ModalContainer>
      </Slide>

    </Container>

  )
}

export default Login;