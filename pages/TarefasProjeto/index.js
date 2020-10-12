import React, { useState, useEffect, useContext } from 'react';
import { Picker } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  Container,
  Title,
  UserPicker,
  Task,
  TaskContainer,
  TaskActions,
  Input,
  Button,
  TextButton,
  FormEnviar,
  Tasks,
  TaskText
} from './styles'

import api from '../../services/api';

import { UsuarioContext } from '../../contexts/user';

const TarefasProjeto = () => {

  const usuario = useContext(UsuarioContext);
  // console.warn(usuario);

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [newTask, setNewTask] = useState("");
  // const [newUser, setNewUser] = useState("");
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
      const response = await api.get("tarefas");
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
      idUsuario: newUser,
      idProjeto: newProject,
      concluido: false
    }

    try {
      await api.post("tarefas", params);
      setNewTask("");
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
      <FormEnviar>
        <Title>Criar Tarefa</Title>
        <Input
          placeholder="Digitar a tarefas..."
          onChangeText={(letras) => { setNewTask(letras) }}
          value={newTask}
          />
        <UserPicker selectedValue = {selectedUser} onValueChange = {setSelectedUser} >
          <UserPicker.Item label = "Selecione um usuario..." value = "" />
            {users.map( user => (
              <UserPicker.Item label ={user.nome} value ={user.id} />
          ))}

        </UserPicker>

        <Button onPress={handleAddTasks}>
          <TextButton>Criar</TextButton>
        </Button>
      </FormEnviar>

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
      </Tasks>
    </Container>


  )

}

export default TarefasProjeto;