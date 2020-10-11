import React, { useContext, useEffect, useState } from 'react';
import {View, Text} from 'react-native';

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
    Projects,
    ProjectText
  } from './styles'

import api from '../../services/api';

import { UsuarioContext } from '../../contexts/user';

const Projetos = () => {

    const usuario = useContext(UsuarioContext);
    console.warn(usuario)

    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState("");
    
    const loadProjects = async () => {

      try {
        const response = await api.get("projetos");
        //console.warn(response.data);
        setProjects(response.data)
      } catch (err) {
          console.warn("Falha ao recuperar o Projeto.")
        }
    }
    
    const handleAddProjects = async () => {

      if (newProject == "") {
        console.warn("você deve preencher o projeto")
        return
      }
      const params = {
        descricao: newProject,
        concluido: false
      }

      try{
        await api.post("projetos", params);
        setNewProject("");
        loadProjects();
      } catch (err) {
        console.warn("erro ao salvar o projeto")
      }
    }
    
      const handleProjects = async (project) => {

        const params = {
          ...project,
          concluido: !project.concluido
        }

        try{
          await api.put(`projetos/${project.id}`, params);
          loadProjects();
        } catch (err) {

        }
      }

      const handleRemoveProject = async ({ id }) => {

        try {
          await api.delete(`projetos/${id}`);
          loadProjects();
        } catch (err) {
          console.warn("erro ao deletar tarefa")
        }
        //console.warn(`delete ${id}`)
      }

      useEffect(() => {
        loadProjects();
      }, [])

      useEffect(() => {
        console.warn(newProject)
      }, [newProject])

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
      <Projects showsVerticalScrollIndicator={false}>

      {projects.map(project => (
      <ProjectContainer key={project.id} finalizado={project.concluido}>
        <Project>
            <ProjectText>{project.descricao}</ProjectText>
        </Project>
        <ProjectActions>

        <MaterialCommunityIcons
                name="delete-outline"
                color="#333"
                size={32}
                onPress={() => { handleRemoveProject(project) }}
              />

              {/*<MaterialCommunityIcons
               name={task.concluido ? "check-circle-outline" : "circle-outline"}
                color={task.concluido ? "#04d361" : "#333"}
                size={32}
                onPress={() => { handleTasks(task) }}
              />*/}
        </ProjectActions>
    </ProjectContainer>
    )
    )}
    </Projects>
    </Container>
    )
}

export default Projetos