import styled from 'styled-components/native';

export const Container = styled.View`
  background-color:#fff;
  flex:1;
  justify-content:center;
  align-items:center;
  padding:0 20px;
`;

export const Input = styled.TextInput`
  border:1px solid #ccc;
  width:290px;
  height: 50px;
  border-radius:5px;
  padding:0 20px;
  margin-top:15px;
`;

export const Button = styled.TouchableOpacity`
  width:290px;
  height: 50px;
  background-color: #04d361;
  border-radius:5px;
  justify-content:center;
  align-items:center;

  margin-top:15px;
`;

export const ButtonText = styled.Text`
  color:#333;
  font-size:18px;
  font-weight:bold;
`;