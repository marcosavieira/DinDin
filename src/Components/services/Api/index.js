import axios from "axios";
//https://desafio-backend-03-dindin.pedagogico.cubos.academy/ #API DE TESTE
const api = axios.create({
  baseURL: 'https://icaro-e-marcos-desafio3-cubos.cyclic.app/',
  timeout: 10000,
  headers: {'Content-Type': 'application/json'}
});

export default api;