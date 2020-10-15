import React, { useState, useEffect, useContext } from 'react';
import { Picker } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  Container,
  Title,
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
  TaskTextNome,
  SetaVoltar
} from './styles'

import api from '../../services/api';

import { UsuarioContext } from '../../contexts/user';

import firebase from 'firebase';

import 'firebase/firestore'

const TarefasProjeto = (props) => {

  console.log(props)
  const usuario = useContext(UsuarioContext);
  
  // const { ProjetoId , ProjetoNome} = route.params;
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [newTask, setNewTask] = useState("");
  
  const loadUsers = async () => {
    try {
      const response = await api.get("usuarios")
      setUsers(response.data)
    } catch (err) {
      console.warn("Falha ao recuperar usuários.")
    }
    
  }
  
  const listenUsers = (snap) =>{
    const data = snap.docs.map((doc)=>{
      return {
        id:doc.id,
        ...doc.data()
      }
    })
    setUsers(data)
  }

  const listenTasks = (snap) =>{
    const data = snap.docs.map((doc)=>{
      return {
        id:doc.id,
        ...doc.data()
      }
    })
    setTasks(data)
  }
  
  useEffect(() => {
    firebase.firestore().collection('tarefas').onSnapshot(listenTasks);    
  }, [])

  useEffect(() => {
    firebase.firestore().collection('usuarios').onSnapshot(listenUsers);
  }, [])
  


  const handleAddTasks = async () => {
    
    if (newTask == "") {
      console.warn("você deve preencher a tarefa")
      return
    }

    if (selectedUser == "") {
      console.warn("você deve escolher um usuário")
      return
    }

    const params = {
      descricao: newTask,
      idUsuario: selectedUser,
      idProjeto: props.route.params.ProjetoId,
      concluido: false
    }

    try {
      // await api.post("tarefas", params);

      await firebase.firestore().collection('tarefas').add(params)

      setNewTask("");
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
  }

  return (

    <Container>
        <FormEnviar>
          <Head>
            <SetaVoltar>
              <MaterialCommunityIcons 
                name="arrow-left"
                color="#D0FEFE"
                size={40}
              />
            </SetaVoltar>
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

        <Title>{props.route.params.ProjetoNome}</Title>
      <Tasks showsVerticalScrollIndicator={false}>


        {tasks.map(task => (
          <TaskContainer key={task.id} finalizado={task.concluido}>
            <Task >
              <TaskText>{task.descricao}</TaskText>
              <TaskTextNome>nome do usuario</TaskTextNome>
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

//Restaurando o projeto
//Salvando a Pátria!!

export default TarefasProjeto;