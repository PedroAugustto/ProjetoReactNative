import styled from 'styled-components/native';

export const Container = styled.View`
  background-color:#1f4f7f;
  flex:1;
  /* justify-content:center; */
  padding:0 20px;
`;

export const Title = styled.Text`
  text-align:center;
  color:#D0FEFE;
  font-size:30px;
  margin-top:10px;
  margin-bottom:20px;
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
  width:100%;
  margin:0px;
`;

export const TextButton = styled.Text`
  font-size:20px;
  color: #D0FEFE;
`;

export const UserPicker = styled.Picker`
  height:50px;
  background-color: #D0FEFE;
`;

export const Head = styled.View`
  flex-direction:row;

`;
//Salvando a Pátria (de novo)