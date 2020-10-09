import styled from 'styled-components/native';

export const Container = styled.View`
  background-color:#fff;
  flex:1;
  justify-content:center;
  align-items:center;
  padding:0 20px;
`;

export const Button = styled.TouchableOpacity`
  width:290px;
  height: 50px;
  background-color: tomato;
  border-radius:5px;
  justify-content:center;
  align-items:center;

  margin-top:15px;
`;

export const ButtonText = styled.Text`
  color:#fff;
  font-size:18px;
  font-weight:bold;
`;

export const Titulo = styled.Text`
color:#333;
font-size:18px;
font-weight:bold;
`;

export const SubTitulo = styled.Text`
color:#333;
font-size:13px;
margin-bottom:15px;
`;