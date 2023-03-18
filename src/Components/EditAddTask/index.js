import CloseIcon from "../../Assets/Group 1647.png"
import {  useEffect, useState } from "react";
import api from "../services/Api";


function HandleEditAddTask (props){

 
  const {name, showModalData, setShowModalData, idToEdit, HandleTransacoes} = props
  const validateName = name === "Adicionar Registro";
  
  
  
  
  

 const [categorias, setCategorias ] = useState([])
 const [categoriaSelecionada, setCategoriaSelecionada] = useState(validateName && '');
 const [categoriaSelecionadaId, setCategoriaSelecionadaId] = useState(validateName && 0);
 const [data, setData] = useState(validateName && "");
 const [id, setId] = useState(0)
 const [valor, setValor] = useState(validateName && 0 );
 const [descricao, setDescricao] = useState(validateName && "" )
 const [buttonValue, setButtonValue] = useState(validateName && "saida");
 



 function handleChange(event) {
  
    const { value } = event.target;
  if (event.target.name === 'valor') {
    setValor(value)
  }
  if (event.target.name === 'data') {
    setData(value)
  }
  if (event.target.name === 'descricao') {
    setDescricao(value)
  }
  
  
}



useEffect(() => {
  async function HandleCategorias() {
    try {
      const response = await api.get('/categoria', {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      
      if(response.status === 200){
        setCategorias(response.data)
        
      }
      return response.data
    }catch (error){
      console.error(error);
    }
  }
  
  HandleCategorias()
  
}, [])


  
    
    



const handleSelectChange = (event) => {
  const categoriaValue  = event.target.value
  const findCat = categorias.find((categoria) => categoria.descricao === categoriaValue)
  setCategoriaSelecionada(categoriaValue);
  setCategoriaSelecionadaId(findCat.id)
  console.log(categoriaSelecionadaId)
};

const SalvarInformacoes = () => {
     
  if(!data || !descricao || valor === 0){
    alert("Preencha todos os campos!")
    return 
    
  }
  
  const [dia, mes, ano] = data.split('/');
  const dataObj = new Date(ano, mes - 1, dia, 12, 35, 0); 
  const dataFormatada = dataObj.toISOString().replace('T', ' ').substr(0, 19);

  const transactionPostApi= {
    tipo: buttonValue,
    descricao: descricao,
    valor: valor * 100,
    data: dataFormatada,
    categoria_id: categoriaSelecionadaId
  }
  
        async function HandlePostTransacoes(newTransaction) {
        try {
          const response = await api.post('/transacao', newTransaction, {
            headers: { Authorization: `Bearer ${localStorage.token}` }
          });
          HandleTransacoes()
          setShowModalData(!showModalData)
          return response.data
        }catch (error){
          console.error(error, "ERRO NO POST TRANSACTION");
        }
      }
      HandlePostTransacoes(transactionPostApi)  
      
    
  
};

const editarInformacoes = () => { 
  if(!data || !descricao || !categoriaSelecionada || valor === 0){
    alert("Preencha todos os campos!")
    return 
    
  }
  const [dia, mes, ano] = data.split('/');
  const dataObj = new Date(ano, mes - 1, dia, 12, 35, 0); 
  const dataFormatada = dataObj.toISOString().replace('T', ' ').substr(0, 19);

  const transactionUpdateApi= {
    descricao: descricao,
    valor: valor * 100,
    data: dataFormatada,
    categoria_id: categoriaSelecionadaId,
    tipo: buttonValue,
  }

  async function HandleUpdateTransacoes(newTransaction) {
    try {
      const response = await api.put(`/transacao/${id}`, newTransaction, {
        headers: { Authorization: `Bearer ${localStorage.token}` }
      });
      
        setShowModalData(!showModalData)
        //resolver o problema para atualizar a pagina com React
        HandleTransacoes();
        return response.data
      
    }catch (error){
      console.error(error, "ERRO NO POST TRANSACTION");
    }
  }
  HandleUpdateTransacoes(transactionUpdateApi)
  
  
  
}
  
function changeColorAndValue(event){
      setButtonValue(event.target.name)
    
}
  
    
    return (
      <div className='modal'>
      <div className='modal-edit'>
        <div className='container-modal'>
        <h1>{name}</h1>
        <a onClick={() => setShowModalData(!showModalData)}>
          <img src={CloseIcon} alt="" />
        </a>
        {useEffect(() => {
          async function HandleGetTransacao(id) {
            try{
              const response = await api.get(`/transacao/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.token}` }
              });
              setValor(response.data.valor / 100)
            setCategoriaSelecionada(response.data.categoria_nome)
            setData(new Date(response.data.data).toLocaleDateString('pt-br', {year: "numeric",
            month: "numeric",
            day: "numeric",}))
            setDescricao(response.data.descricao)  
            setButtonValue(response.data.tipo)
            setId(response.data.id) //o id da API !!!
            setCategoriaSelecionadaId(response.data.categoria_id) 
              
              return response.data
            }catch (error){
              console.log(error)
            }
            
          }
         
          if(!validateName){
            HandleGetTransacao(idToEdit)
            
          }
         
        }, [])}
        <button name="entrada"
        className={buttonValue === "entrada" ? "entrada-select" : "entrada"} 
        onClick={(e) =>  changeColorAndValue(e)}>
          Entradas
        </button>
        <button 
        name="saida" 
        className={buttonValue === "saida" ? "saida-select" : "saida"}   
        onClick={(e) => changeColorAndValue(e)}>
          Saidas
          </button>
        </div>
        <div className='modal-form'>
        <label>Valor</label>
        
        <input type="number" name="valor" value={valor} onChange={handleChange} />
         <label>Categoria</label>
         <select name="categoria" value={categoriaSelecionada} onChange={handleSelectChange} >
         {categorias && categorias.map(categoria => (
          <option key={categoria.id} value={categoria.descricao} >
            {categoria.descricao}
          </option>
        ))}
         </select>
         <label>Data</label>
         <input type="text" name="data" value={data} onChange={handleChange} />
         
         <label>Descrição</label>
         <input type="text" name="descricao" value={descricao} onChange={handleChange} />
          <button id="confirmar" onClick={validateName ? SalvarInformacoes : editarInformacoes}>Confirmar</button>
  
        </div>
        
      </div>
    </div>
   )
 
}

export default HandleEditAddTask;