import { useEffect, useState } from "react";
import api from "../services/Api";

function HandleFiltros(props){
const { setTransactions, HandleTransacoes } = props
  
  const [categoriasFiltro, setCategoriasFiltro]= useState([]);
  const [arrayCategorias, setArrayCategorias] = useState([]);
  const [categoriasAtivas, setCategoriasAtivas] = useState([]);
  
    async function HandleCategorias() {
      try {
        const response = await api.get('/categoria', {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });
        
        if(response.status === 200){
          setCategoriasFiltro(response.data)
          
        }
        return response.data
      }catch (error){
        console.error(error);
      }
    }
    useEffect(() => {

      HandleCategorias()
    }, [])
    async function HandleCategoriasFiltradas(categoriasAtivas) {
      let filtros = categoriasAtivas;
        let url = '/transacao?';

          filtros.forEach((filtro) => {
          url += `filtro[]=${filtro}&`;
          });

          url = url.slice(0, -1);
      try {
        const response = await api.get(`${url}`, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        });
        console.log(`${url}, Bearer ${localStorage.token}`)
        
       
          if(response.data !== []){
            setTransactions(response.data)
          }
        
        return response.data
      }catch (error){
        console.error(error);
      }
    }
   
    function handleClickCategorias(categoria) {
      if (categoriasAtivas.includes(categoria)) {
        setCategoriasAtivas(categoriasAtivas.filter((c) => c !== categoria));
      } else {
        setCategoriasAtivas([...categoriasAtivas, categoria]);
      }
    }
  
    function handleLimparFiltros() {
      setCategoriasAtivas([]);
      HandleTransacoes();
    }
  
    function HandleAplicarFiltros(categoriasAtivas) {
      
      HandleCategoriasFiltradas(categoriasAtivas);
    }
  
    return (
      <div className="container-filtro-categorias">
        <h2>Categorias</h2>
        <div className="nav-filtros-categorias">
          {categoriasFiltro.map((categoria) => {
            const isAtiva = categoriasAtivas.includes(categoria.descricao);
            return (
              <button
                className={isAtiva ? "linkAtivo" : "linkInativo"}
                key={categoria.id}
                onClick={() => handleClickCategorias(categoria.descricao)}
              >
                {categoria.descricao}{" "}
                <span>{isAtiva ? "x" : "+"}</span>
              </button>
            );
          })}
        </div>
        <div className="container-buttons-filtros">
          <button id="limpar-filtros" onClick={handleLimparFiltros}>
            Limpar Filtros
          </button>
          <button id="aplicar-filtros"onClick={() => {HandleAplicarFiltros(categoriasAtivas);}} >
            Aplicar Filtros
          </button>
        </div>
      </div>
    );
  }
export default HandleFiltros;