import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
background-color:#1f4f7f;
flex:1;
justify-content:center;
align-items:center;
padding:0 20px;
`;

export const Box = styled.View`
background-color:#1f4f7f;
  flex:1;
  justify-content:center;
  align-items:center;
  padding:0 20px; 
`
export const Box1 = styled.View`
  background-color:#1f4f7f;
  flex:1;
  padding:0 20px; 
`
export const Img = styled.Image`
  width: 300px;
  height: 300px;
  align-items: center;
  margin-bottom: 30px
  justify-content: center;
  display: flex;
`;

export const Input = styled.TextInput`
  border:1px solid #ccc;
  width:290px;
  height: 50px;
  border-radius:5px;
  padding:0 20px;
  margin-top:15px;
  background-color: #D0FEFE;
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

export const Btn = styled.TouchableOpacity`
  width:290px;
  height: 35px;
  background-color: #1f4f7f;
  border-radius:5px;
  justify-content:center;
  align-items:center;
  margin-top:15px;
`;

export const BtnText = styled.Text`
  color:#fff;
  font-size:15px;
  font-weight: bold;
`;

export const Slide= styled.Modal`
  flex:1;
  padding:0 20px;
`;

export const ModalContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color:#1f4f7f;
  flex:1;
`;

export const InputCadastro = styled.TextInput`
  border:1px solid #ccc;
  width:290px;
  height: 50px;
  border-radius:5px;
  padding:0 20px;
  margin-top:15px;
  justify-content: center;
  background-color: #D0FEFE;
`;

export const Titulo = styled.Text`
  font-size: 20px;
  justify-content: center;
  color: #fff;
  marginLeft: 45px;
  marginRight: 45px;
  text-align: center;
  width: 290px;
  height: 30px;
  align-items: center;
`;
