import Main from '../../Components/Main'
import { Link, useNavigate } from "react-router-dom";
import './styles.css';
import { useState } from 'react';
import api from '../../Components/services/Api';



function SignIn() {

  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({
    email: '',
    senha: '',
  });

  const [formValues, setFormValues] = useState({
    email: '',
    senha: '',
  });

  function handleInputChange(event){
    const { name, value} = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const {email, senha} = formValues;
    const errors = {};

    if (email === '') {
      errors.email = 'Campo e-mail precisa ser preenchido';
    }
    if (senha === '') {
      errors.senha = 'Campo senha precisa ser preenchido';
    }
  
    setFormErrors(errors);

    if(Object.keys(errors).length === 0){
      //Todos os campos foram preenchidos
      //Implementar lógica para chamad da api para cadastro
      //window.location.href = '/home';
      loginUser()
      
    }

    async function loginUser() {
      try {
        const response = await api.post('/login', {
          email: formValues.email,
          senha: formValues.senha
        } );
        
          if(response.status === 200 || response.status === 201){
            localStorage.setItem('userId', response.data.usuario.id)
            localStorage.setItem('token', response.data.token)

            setTimeout(() => {
              navigate("/home")  
            }, 1000)
            
            return response.data;
          }
  
          
        
      } catch (error) {
        console.error(error);
      }
    }

  }


  return (
    <div className='container-login'>
      <Main />
      <div className='navs-login'>
      <div className='login-description-cadastro'>
          <h1>Controle suas <span id='span'>finanças</span>,
          sem planilha chata.</h1>

          <h2>Organizar as suas finanças nunca foi tão fácil, 
            com o DINDIN, você tem tudo num único lugar e em 
            um clique de distância.</h2>

            <Link to='/sign-up'>
              <button>Cadastre-se</button>
            </Link>
      </div>
      <div className='login-form'>
          <strong>Login</strong>
          <form onSubmit={handleSubmit}>
        <label>
          E-mail:
          <input 
          type='email'
          name='email'
          value={formValues.email}
          onChange={handleInputChange} />
          {formErrors.email && <span className='error'>{formErrors.email}</span>}
        </label>
        <label>
          Password:
          <input 
          type='password'
          name='senha'
          value={formValues.senha}
          onChange={handleInputChange}/>
          {formErrors.senha && <span className='error'>{formErrors.senha}</span>}
        </label>
        <button type="submit">Entrar</button>
      </form>

      
      </div>
      </div>
      
    </div>
    
  );
}


export default SignIn;
