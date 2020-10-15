import React, { useState, useContext } from 'react';
import api from "../../services/api"
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

  const [nomeCadastro, setNomeCadastro] = useState("");
  const [emailCadastro, setEmailCadastro] = useState("");
  const [senhaCadastro, setSenhaCadastro] = useState("");

  const handleNomeCadastro = texto => setNomeCadastro(texto)
  const handleEmailCadastro = texto => setEmailCadastro(texto)
  const handleSenhaCadastro = texto => setSenhaCadastro(texto)

  const handleSubmitRegistro = async () => {
    const novoUsuario = {
      nome: nomeCadastro,
      email: emailCadastro,
      password: senhaCadastro
    }
    let user =await api.post ("/usuarios", novoUsuario)
    console.log(user)
    setOpen(false)
  }

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
          <BtnText Bold>Não possui um login?</BtnText>
          <BtnText Bold>Cadastre-se</BtnText>
        </Btn>
      </Box1>

      <Slide visible={open}>
        <ModalContainer>
          
          {/* <Image source={UsuarioImg}/> */}

          <Titulo>Complete com seus dados:</Titulo>

          <InputCadastro
            value = {nomeCadastro}
            placeholder = 'Digite seu nome'
            onChangeText = {handleNomeCadastro}
          />
          <InputCadastro
            value = {emailCadastro}
            placeholder = 'Digite seu email'
           onChangeText = {handleEmailCadastro}
          />
          <InputCadastro
            value = {senhaCadastro}
            placeholder = 'Digite sua senha'
            onChangeText = {handleSenhaCadastro}
          />

          <Button
            onPress = {() => handleSubmitRegistro()}
          >
            <ButtonText>Cadastrar</ButtonText>
          </Button>

          <Btn onPress={() => setOpen(false)}>
            <BtnText Bold>Já possui um login?</BtnText>
            <BtnText Bold>Entrar</BtnText>
          </Btn>

        </ModalContainer>
      </Slide>

    </Container>

  )
}

export default Login;