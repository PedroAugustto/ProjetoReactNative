import styled from 'styled-components/native';

export const Container = styled.View`
  background-color:#1F3B4D;
  flex:1;
  padding:0 20px;
`;

export const Title = styled.Text`
  text-align:center;
  color:#fff;
  font-size:30px;
  margin-top:10px;
  margin-bottom:20px;
`;
export const ProjectContainer = styled.View`
  flex-direction:row;
  justify-content:space-between;
  background-color: #D0FEFE;;
  padding:15px 20px;
  margin-top:10px;
  border-radius:5px;
  border: 1px solid #000;
  flex:1;
`;

export const List = styled.ScrollView`

`;

export const Project = styled.View`
  
`;

export const ProjectButton = styled.TouchableOpacity`
  
`;

export const ProjectButtonText = styled.Text`
  font-size: 20px;
`;


export const ProjectActions = styled.View`
  flex-direction:row;
`;

export const FormEnviar = styled.View`
  flex-direction:row;
`;

export const Input = styled.TextInput`
  border:1px solid #333;
  height:60px;
  flex:1;
  border-radius:5px;
  padding:0 20px;
  background-color: #D0FEFE;
`;

export const Button = styled.TouchableOpacity`
  width:100px;
  background-color: #017374;
  height:60px;
  border-radius:5px;
  justify-content:center;
  align-items:center;
  margin-left:10px;

`;

export const TextButton = styled.Text`
  font-size:20px;
  color: #D0FEFE;
`;

export const TaskContainer = styled.View`
  flex-direction:row;
  justify-content:space-between;
  background-color: ${props => props.finalizado ? "#f9f9f9" : "#e6e6e6"};
  padding:15px 20px;
  margin-top:10px;
  border-radius:5px;
  flex:1;
`;

export const Tasks = styled.ScrollView`

`;

export const Task = styled.View`
  flex:1;
`;

export const TaskText = styled.Text`
  font-size:20px;
`;

export const TaskActions = styled.View`
  flex-direction:row;
`;

export const InputTarefas = styled.TextInput`
  border:1px solid #333;
  height:60px;
  border-radius:5px;
  padding:0 20px;
`;

export const UserPicker = styled.Picker`
  height:50px;
`;

export const CreateTaskModal = styled.Modal`
  
`;

export const AddIcon = styled.View`
  align-items:center;
  margin:10px;
  padding:10px;
`;

export const Head = styled.View`
  flex-direction:row;
`;