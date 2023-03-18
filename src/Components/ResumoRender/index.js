import { useEffect, useState } from "react";
import api from "../services/Api";

function ResumoEntradas (props){
  const {transactions} = props;
 

 const [extrato, setExtrato] = useState([])

 async function HandleExtrato() {
  try {
    const response = await api.get('/transacao/extrato', {
      headers: { Authorization: `Bearer ${localStorage.token}` }
    });
    
    return setExtrato(response.data)
  }catch (error){
    console.error(error);
  }
  
}
useEffect(() => {
  HandleExtrato()
  
}, [transactions])


const entradas = extrato.entrada / 100;
const saidas = extrato.saida / 100;

const saldo = entradas - saidas;

     return (
      <div>
          <div className='resumo-entradas-saidas'>
            
            <strong>Entradas</strong>
            
            <strong id='entrada-saldo'>{entradas.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</strong>
            <strong>Saidas</strong>
            <strong id='saida-saldo'>{saidas.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</strong>
          </div>
          <div className='resumo'>
            <strong>Saldo</strong>
            <strong id='saldo'>{saldo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</strong>
          </div>
      </div>
      
     ) 
       
    
}


 export default ResumoEntradas ; 