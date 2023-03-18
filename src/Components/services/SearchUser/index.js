import axios from "axios";

//falta conectar com o endpoint certo e criar a logica para validar o usuario

async function searchUser({email, password}) {
  try{
    const response = await axios.get('https://reqres.in/api/users',
    {
      
        email: email,
        password: password
      
    });
    console.log(response)

  }catch (error) {
    return new Error("Erro ao buscar usuario")
  }
}

export default searchUser;