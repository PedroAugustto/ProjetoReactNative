import styled from 'styled-components/native';

export const Container = styled.View`
  background-color:#1F3B4D;
  flex:1;
  justify-content:center;
  align-items:center;
  padding:0 20px;
`;

export const Button = styled.TouchableOpacity`
  width:290px;
  height: 50px;
  background-color: #017374;
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
color:#fff;
font-size:18px;
font-weight:bold;
`;

export const SubTitulo = styled.Text`
color:#fff;
font-size:13px;
margin-bottom:15px;
`;