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

const Tarefas = () => {

  const usuario = useContext(UsuarioContext);
  console.warn(usuario);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  //Todas as tarefas de todos os usuarios estão sendo exibidas
  const loadTasks = async () => {

    try {
      const response = await api.get("tarefas");
      // console.warn(response.data);
      setTasks(response.data)
    } catch (err) {
      console.warn("Falha ao recuperar as tarefas.")
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
    loadTasks();
  }, [])

  //Aerá executado toda vez que NewTask sofrer alterações
  //apenas um exemplo, sem relação com a solução atual
  useEffect(() => {
    // console.warn(newTask)
  }, [newTask])



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