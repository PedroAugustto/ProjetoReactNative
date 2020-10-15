import React, { useContext } from 'react';

import {
    Container,
    Button,
    ButtonText,
    Titulo,
    SubTitulo
  } from './styles'

import { UsuarioContext } from '../../contexts/user';

const Configuracoes = () => {

    const { signOut, user } = useContext(UsuarioContext)

    return(
        <Container>
            <Titulo>{user.nome}</Titulo>
            <SubTitulo>{user.email}</SubTitulo>
            <Button onPress={() => {
            signOut()
             }}>

        <ButtonText>Sair</ButtonText>
      </Button>
        </Container>
    )
}

export default Configuracoes;