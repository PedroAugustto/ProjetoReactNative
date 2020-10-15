import React, { useState, useEffect, useContext } from 'react';
import { Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useIsFocused } from '@react-navigation/native';

import ProgressCircle from 'react-native-progress-circle';

import { Text } from 'react-native';

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
  SetaVoltar,
  Progress
} from './styles'

import { UsuarioContext } from '../../contexts/user';

import firebase from 'firebase';

import 'firebase/firestore'

const TarefasProjeto = (props) => {

  const navigation = useNavigation();

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
    firebase.firestore().collection('tarefas').where("idProjeto", "==", props.route.params.ProjetoId).onSnapshot(listenTasks);    
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
      await firebase.firestore().collection('tarefas').doc(task.id).set(params,{ merge:true })


    } catch (err) {
      
    }
  }

  const handleRemoveTask = async ({ id }) => {

    try {
      await firebase.firestore().collection('tarefas').doc(id).delete();

    } catch (err) {
      console.warn("erro ao deletar tarefa")
    }
  }

  //ProgressoDoProjeto

  const [percentual, setPercentual] = useState(0);
  const focoPagina = useIsFocused();

  const percentualTarefasRealizadas = async () => {
    const resultado = await api.get("tarefas");
    const tarefas = resultado.data
    const tarefas_realizadas = tarefas.filter(tarefa => tarefa.concluido)

    const calculo_percentual = (tarefas_realizadas.length / tarefas.length) * 100

    setPercentual(calculo_percentual)
  }
  

  const listenDashboardTasks = (snap) =>{
    const tarefas = snap.docs
    const tarefas_realizadas = tarefas.filter((tarefa) => {
      return tarefa.data().concluido})

    const calculo_percentual = (tarefas_realizadas.length / tarefas.length) * 100

    setPercentual(calculo_percentual)
  }

  useEffect(() => {
    if (focoPagina) {
      firebase.firestore().collection('tarefas').where("idProjeto", "==", props.route.params.ProjetoId).onSnapshot(listenDashboardTasks);    
    }

  }, [focoPagina])



  return (

    <Container>
        <FormEnviar>
          <Head>
            <SetaVoltar>
              <MaterialCommunityIcons 
                name="arrow-left"
                color="#D0FEFE"
                size={40}
                onPress = {() => navigation.navigate('Projetos')}
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
        <Progress>
          <Title>Progresso do Projeto</Title>
          <ProgressCircle
            percent={percentual}
            radius={100}
            borderWidth={30}
            color="#017374"
            shadowColor="#999"
            bgColor="#fff"
            >
            <Text style={{ fontSize: 25 }}>{`${percentual.toFixed(2)}%`}</Text>
          </ProgressCircle>
          </Progress>
        </Tasks>
    </Container>


  )

}

//Restaurando o projeto
//Salvando a Pátria!!

export default TarefasProjeto;