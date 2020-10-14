import React, { useContext, useEffect, useState } from 'react';
import {View, Text} from 'react-native';
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
    ProjectButtonText,
    CreateTaskModal,
    Head,
    UserPicker,
    Task,
    TaskContainer,
    TaskActions,
    InputTarefas,
    Tasks,
    TaskText,
    AddIcon
  } from './styles'

import api from '../../services/api';

import { UsuarioContext } from '../../contexts/user';

const Projetos = () => {

    
    const navigation = useNavigation();

    const usuario = useContext(UsuarioContext);

    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [newTask, setNewTask] = useState("");
    const [open, setOpen] = useState(false);

    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState("");

    const [tela,setTela] = useState(0);

    const loadProjects = async () => {

      try {
        const response = await api.get("projetos");
        //console.warn(response.data);
        setProjects(response.data)
      } catch (err) {
          console.warn("Falha ao recuperar o Projeto.")
        }
    }

    const handleDirecionarParaTarefasProjeto = () => {
      navigation.reset({routes:[{name: 'TarefasProjeto'}]});
  }
    
    const handleAddProjects = async () => {

      if (newProject == "") {
        console.warn("você deve preencher o projeto")
        return
      }
      const params = {
        descricao: newProject
      }

      try{
        await api.post("projetos", params);
        setNewProject("");
        loadProjects();
      } catch (err) {
        console.warn("erro ao salvar o projeto")
      }
    }
    
      // const handleProjects = async (project) => {

      //   const params = {
      //     ...project,
      //     concluido: !project.concluido
      //   }

      //   try{
      //     await api.put(`projetos/${project.id}`, params);
      //     loadProjects();
      //   } catch (err) {

      //   }
      // }

      const handleRemoveProject = async ({ id }) => {

        try {
          await api.delete(`projetos/${id}`);
          loadProjects();
        } catch (err) {
          console.warn("erro ao deletar tarefa")
        }
      }

      
      
      //Tasks

      const loadTasks = async () => {

        try {
          const response = await api.get(`tarefas?idUsuario=${usuario.user.id}`);
          setTasks(response.data)
        } catch (err) {
          console.warn("Falha ao recuperar as tarefas.")
        }
        
      }
    useEffect(() => {
      loadProjects()
      loadTasks();
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
      <List showsVerticalScrollIndicator={false}>

      {projects.map(project => (
      <ProjectContainer key={project.id} idProjetos = {project.id} finalizado={project.concluido}>
        <Project>
            <ProjectButton onPress = {() => navigation.navigate('TarefasProjeto')}>
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