import { useEffect, useState } from "react";
import api from "../services/Api";

function ProfileData(props) {
  const { nameH1, CloseIcon, openDataModalProfile, nome, email, setEmail, setNome, flag, setFlag } = props;
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const errors = {};
  const [formErrors, setFormErrors] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmSenha: '',
  });
  
  function handleChange(event) {
    const { value, name } = event.target;

    if (name === "nome") {
      setNome(value)
    }
    if (name === "email") {
      setEmail(value);
    }
    if (name === "senha") {
      setSenha(value);
    }
    if (name === "confirmaSenha") {
      setConfirmaSenha(value);
    }
  }

  
    async function HandleProfileChanges() {
      try {
        const response = await api.put('/usuario', {
          nome: nome,
          email: email,
          senha: senha
        }, {
          headers: { Authorization: `Bearer ${localStorage.token}` }
        });
        
          
            openDataModalProfile();
            setFlag(!flag)
            return response.data;
  
          
        
      } catch (error) {
        alert(error)
        console.error(error);
      }
    }
  
    
    function handleConfirm(e){
      e.preventDefault()
      if(nome === "") {
        errors.nome = "Campo nome precisa ser preenchido";
      }
  
      if (email === '') {
        errors.email = 'Campo e-mail precisa ser preenchido';
      }
      if (senha === '') {
        errors.senha = 'Campo senha precisa ser preenchido';
      }
      if (confirmaSenha === '') {
        errors.confirmSenha = 'Campo confirmação de senha precisa ser preenchido';
      } else if (senha !== confirmaSenha) {
        errors.confirmSenha = 'As senhas não coincidem';
      }
    
      setFormErrors(errors);
  
      if(Object.keys(errors).length === 0){
        HandleProfileChanges();
        
        
        
        }
    }


  return (
    <div className="modal">
      <div className="modal-edit">
        <div className="container-modal">
          <h1>{nameH1}</h1>
          <a onClick={() => openDataModalProfile()}>
            <img src={CloseIcon} alt="" />
          </a>
        </div>
        <div className="modal-form">
          <label>Nome</label>
          <input 
          type="text" 
          name="nome" 
          value={nome} 
          onChange={handleChange} />
          {formErrors.nome && <span className='error'>{formErrors.nome}</span>}
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={handleChange} />
          {formErrors.email && <span className='error'>{formErrors.email}</span>}
          <label>Password</label>
          <input type="password" 
          name='senha'
          value={senha}
          onChange={handleChange}
          />
          {formErrors.senha && <span className='error'>{formErrors.senha}</span>}
          <label>Confirma Password</label>
          <input type="password" 
          name='confirmaSenha'
          value={confirmaSenha}
          onChange={handleChange}
          />
          {formErrors.confirmSenha && <span className="error">{formErrors.confirmSenha}</span>}
          <button onClick={(e) => handleConfirm(e)}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileData;
