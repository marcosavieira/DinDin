import './styles.css';
import { Link, useNavigate } from 'react-router-dom'
import Main from '../../Components/Main';
import { useState } from 'react';
import api from "../../Components/services/Api"
function Cadastro() {
  
  const navigate = useNavigate();
  function handleUsuarioCadastrado () {
    setTimeout(() => {
      setApiStatus(false)
      navigate("/sign-in")  
    }, 1000)

    
  }
  const [apiStatus, setApiStatus] = useState(false);
  const [formErrors, setFormErrors] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmSenha: '',
  });

  const [formValues, setFormValues] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmSenha: '',
  });

  function handleInputChange(event){
    const { name, value} = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }



  async function createUser() {
    try {
      const response = await api.post('/usuario', {
        nome: formValues.nome,
        email: formValues.email,
        senha: formValues.senha
      } );
      
        if(response.status === 201){
          setApiStatus(true)
          return response.data;

        }
      
    } catch (error) {
      console.error(error);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const {nome, email, senha, confirmSenha } = formValues;
    const errors = {};

    if(nome === "") {
      errors.nome = "Campo nome precisa ser preenchido";
    }

    if (email === '') {
      errors.email = 'Campo e-mail precisa ser preenchido';
    }
    if (senha === '') {
      errors.senha = 'Campo senha precisa ser preenchido';
    }
    if (confirmSenha === '') {
      errors.confirmSenha = 'Campo confirmação de senha precisa ser preenchido';
    } else if (senha !== confirmSenha) {
      errors.confirmSenha = 'As senhas não coincidem';
    }
  
    setFormErrors(errors);

    if(Object.keys(errors).length === 0){
      //Todos os campos foram preenchidos
      //Implementar lógica para chamad da api para cadastro
      createUser()
      //window.location.href = '/sign-in'
      }
      
      
    

  }

  return (
    <div className="cadastro-main">
      <Main />
      <div className='nav-cadastro'>
      <strong>Cadastre-se</strong>
          <form className='form'>
          <label>Nome</label>
            <input type="text" 
            name='nome'
            value={formValues.nome}
            onChange={handleInputChange}
            />
            {formErrors.nome && <span className='error'>{formErrors.nome}</span>}
            <label>E-mail</label>
            <input type="email" 
            name='email'
            value={formValues.email}
            onChange={handleInputChange}
            />
            {formErrors.email && <span className='error'>{formErrors.email}</span>}
            <label>Senha</label>
            <input type="password" 
            name='senha'
            value={formValues.senha}
            onChange={handleInputChange}
            />
            {formErrors.senha && <span className='error'>{formErrors.senha}</span>}
            <label>Confirmação de Senha</label>
            <input type="password"
            name="confirmSenha" 
            value={formValues.confirmSenha} 
            onChange={handleInputChange}
            />
            {formErrors.confirmSenha && <span className="error">{formErrors.confirmSenha}</span>}
          </form>
            <button onClick={handleSubmit}>Cadastrar</button>
            {apiStatus && handleUsuarioCadastrado()}
            <Link id='tem-cadastro' to='/sign-in'>Já tem cadastro? Clique aqui!</Link>
      </div>
    </div>
  );
}

export default Cadastro;
