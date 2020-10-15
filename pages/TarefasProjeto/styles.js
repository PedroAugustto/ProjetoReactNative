import styled from 'styled-components/native';

export const Container = styled.View`
  background-color:#1F3B4D;
  flex:1;
  /* justify-content:center; */
  padding:0 20px;
`;

export const Title = styled.Text`
  text-align:center;
  color:#fff;
  font-size:30px;
`;

export const SetaVoltar = styled.View`
  margin-right: 50px;
`;

export const TaskContainer = styled.View`
  flex-direction:row;
  justify-content:space-between;
  background-color: ${props => props.finalizado ? "#D0FEFE" : "#D0FEFE"};
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

export const TaskTextNome = styled.Text`
  font-size:15px;
  color:gray;
`; 

export const TaskActions = styled.View`
  flex-direction:row;
`;

export const FormEnviar = styled.View`
  flex-direction:column;
  
`;

export const InputTarefas = styled.TextInput`
  border:1px solid #333;
  height:60px;
  border-radius:5px;
  padding:0 20px;
  background-color: #D0FEFE;
  margin: 10px;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  background-color:#017374;
  height:60px;
  border-radius:5px;
  justify-content:center;
  align-items:center;
  margin:10px;
`;

export const TextButton = styled.Text`
  font-size:20px;
  color: #D0FEFE;
`;

export const UserPicker = styled.Picker`
  height:50px;
  background-color: #D0FEFE;
  margin: 10px;
  color: #D0FEFE;
`;

export const Head = styled.View`
  flex-direction:row;
  align-items: center;
  margin: 10px;
`;

export const Progress = styled.View`
  align-items: center;
`;