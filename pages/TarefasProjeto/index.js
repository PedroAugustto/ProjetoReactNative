import React, { useState, useEffect, useContext } from 'react';
import { Picker } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  Container,
  Title,
  CreateTaskModal,
  Head,
  UserPicker,
  Task,
  TaskContainer,
  TaskActions,
  InputTarefas,
  Button,
  TextButton,
  FormEnviar,
  Tasks,
  TaskText,
  AddIcon
} from './styles'

import api from '../../services/api';

import { UsuarioContext } from '../../contexts/user';

const TarefasProjeto = () => {

  const usuario = useContext(UsuarioContext);

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [newTask, setNewTask] = useState("");
  const [open, setOpen] = useState(false);
  const [newProject, setNewProject] = useState("");

  const loadUsers = async () => {
    try {
      const response = await api.get("usuarios")
      setUsers(response.data)
    } catch (err) {
      console.warn("Falha ao recuperar usuários.")
    }

  }

  const loadTasks = async () => {

    try {
      const response = await api.get(`tarefas?idUsuario=${usuario.user.id}`);
      setTasks(response.data)
    } catch (err) {
      console.warn("Falha ao recuperar as tarefas.")
    }

  }

  const handleAddTasks = async () => {

    if (newTask == "") {
      console.warn("você deve preencher a tarefa")
      return
    }
    const params = {
      descricao: newTask,
      idUsuario: selectedUser,
      // idProjeto: newProject,
      concluido: false
    }

    try {
      await api.post("tarefas", params);
      setNewTask("");
      setOpen(false)
      loadTasks();
    } catch (err) {
      console.warn("erro ao salvar a tarefa")
    }

  }

  const handleTasks = async (task) => {

    const params = {
      ...task,
      concluido: !task.concluido
    }

    try {
      await api.put(`tarefas/${task.id}`, params);
      loadTasks();
    } catch (err) {

    }
  }

  const handleRemoveTask = async ({ id }) => {

    try {
      await api.delete(`tarefas/${id}`);
      loadTasks();
    } catch (err) {
      console.warn("erro ao deletar tarefa")
    }
    // console.warn(`delete ${id}`)
  }

  //Apenas será executado uma única vez!
  useEffect(() => {
    loadTasks()
    loadUsers();
  }, [])

  //Aerá executado toda vez que NewTask sofrer alterações
  //apenas um exemplo, sem relação com a solução atual
  useEffect(() => {
    // console.warn(newTask)
  }, [newTask])



  return (

    <Container>
      <CreateTaskModal visible={open}>

        <FormEnviar>
          <Head>
            <MaterialCommunityIcons 
              name="arrow-left"
              color="#333"
              size={40}
              onPress={() => setOpen(false)}
              />
            <Title>Criar Tarefa</Title>
          </Head>
          <InputTarefas
            placeholder="Digitar a tarefas..."
            onChangeText={(letras) => { setNewTask(letras) }}
            value={newTask}
            />
          <UserPicker selectedValue = {selectedUser} onValueChange = {setSelectedUser} >
            <UserPicker.Item label = "Selecione um usuario..." value = "" />
              {users.map( user => (
                <UserPicker.Item key={user.id} label ={user.nome} value ={user.id} />
                ))}

          </UserPicker>

          <Button onPress={handleAddTasks}>
            <TextButton>Criar</TextButton>
          </Button>
        </FormEnviar>

      </CreateTaskModal>

          <Title>Projeto 1</Title>
      <Tasks showsVerticalScrollIndicator={false}>


        {tasks.map(task => (
          <TaskContainer key={task.id} finalizado={task.concluido}>
            <Task >
              <TaskText>{task.descricao}</TaskText>
            </Task>
            <TaskActions>

              <MaterialCommunityIcons
                name="delete-outline"
                color="#333"
                size={32}
                onPress={() => { handleRemoveTask(task) }}
              />

              <MaterialCommunityIcons
                name={task.concluido ? "check-circle-outline" : "circle-outline"}
                color={task.concluido ? "#04d361" : "#333"}
                size={32}
                onPress={() => { handleTasks(task) }}
              />
              
            </TaskActions>
          </TaskContainer>

        )
        )}
        <AddIcon>
          <MaterialCommunityIcons 
            name="plus-circle-outline"
            color="#333"
            size={50}
            onPress={() => setOpen(true)}
            />
        </AddIcon>
      </Tasks>
    </Container>


  )

}

//Restaurando o projeto
//Salvando a Pátria!!

export default TarefasProjeto;