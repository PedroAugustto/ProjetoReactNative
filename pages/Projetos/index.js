import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
    Container,
    Title,
    Project,
    ProjectActions,
    ProjectContainer,
    Input,
    Button,
    TextButton,
    FormEnviar,
    List,
    ProjectButton,
    ProjectButtonText
  } from './styles'

import { UsuarioContext } from '../../contexts/user';

import firebase from 'firebase';

import 'firebase/firestore'

const Projetos = () => {

    
    const navigation = useNavigation();

    const usuario = useContext(UsuarioContext);

    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState("");

    const listenProjects = (snap) =>{
      const data = snap.docs.map((doc)=>{
        return {
          id:doc.id,
          ...doc.data()
        }
      })
      setProjects(data)
    }

    useEffect(() => {
      firebase.firestore().collection('projetos').onSnapshot(listenProjects);
    }, [])
    
    const handleAddProjects = async () => {

      if (newProject == "") {
        console.warn("você deve preencher o projeto")
        return
      }
      const params = {
        descricao: newProject
      }

      try{
        await firebase.firestore().collection('projetos').add(params)
        setNewProject("");
      } catch (err) {
        console.warn("erro ao salvar o projeto")
      }
    }
    
    const handleRemoveProject = async ({ id }) => {

      try {
        await firebase.firestore().collection('projetos').doc(id).delete();
  
      } catch (err) {
        console.warn("erro ao deletar projeto")
      }
    }
    return(
    <Container>
        <Title>Projetos</Title>
      <FormEnviar>
        <Input
          placeholder="Digitar o Projeto..."
          onChangeText = { (letras) => {setNewProject (letras) }}
          value = {newProject}>
        </Input>
        <Button onPress= {handleAddProjects}>
          <TextButton>Criar</TextButton>
        </Button>
      </FormEnviar>
      <List showsVerticalScrollIndicator={false}>

      {projects.map(project => (
      <ProjectContainer key={project.id} idProjetos = {project.id} finalizado={project.concluido}>
        <Project>
            <ProjectButton onPress = {() => navigation.navigate('TarefasProjeto',
                        {ProjetoId : project.id,
                        ProjetoNome : project.descricao})}>
              <ProjectButtonText>
                {project.descricao}
              </ProjectButtonText>
            </ProjectButton>
        </Project>
        <ProjectActions>

              <MaterialCommunityIcons
                name="delete-outline"
                color="#333"
                size={32}
                onPress={() => { handleRemoveProject(project) }}
              />

        </ProjectActions>
    </ProjectContainer>
    )
    )
    }
    </List>
    </Container>
    )
}

export default Projetos