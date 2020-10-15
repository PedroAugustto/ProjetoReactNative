import React, { useState, useEffect, useContext } from 'react';
import { Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  Container,
  Title,
  Task,
  TaskContainer,
  TaskActions,
  Tasks,
  TaskText
} from './styles'

import api from '../../services/api';

import { UsuarioContext } from '../../contexts/user';

import firebase from 'firebase';

import 'firebase/firestore'

const Tarefas = () => {

  const usuario = useContext(UsuarioContext);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

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


  return (

    <Container>
      <Title>Todas as tarefas</Title>

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

export default Tarefas;