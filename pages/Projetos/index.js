import React from 'react';
import {View, Text} from 'react-native';

import {
    Container,
    Title,
    Input,
    Button,
    TextButton,
    FormEnviar,
    ProjectContainer,
    Project,
    ProjectText
  } from './styles'

const Projetos = () => {
    return(
    <Container>
        <Title>Projetos</Title>
      <FormEnviar>
        <Input
          placeholder="Nome do Projeto..."
        />
        <Button>
          <TextButton>Criar</TextButton>
        </Button>
      </FormEnviar>
    <ProjectContainer>
        <Project>
            <ProjectText>Projeto Teste</ProjectText>
        </Project>

    </ProjectContainer>













    </Container>
    );
}

export default Projetos