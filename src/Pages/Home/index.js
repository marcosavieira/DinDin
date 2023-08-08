import "./styles.css";
import Polygon from "../../Assets/Polygon.png";
import DataPoly from "../../Assets/Polygon 3.png";
import Profile from "../../Assets/person_profile.png";
import LogOff from "../../Assets/Vector.png";
import Filtro from "../../Assets/icons8-filtro-48 1.png";
import Edit from "../../Assets/icons8-editar 3.png";
import Excluir from "../../Assets/icons8-lixo 1.png";
import Triangulo from "../../Assets/Polygon 4.png";
import Filtros from "../../Components/Filtros";
import CloseIcon from "../../Assets/Group 1647.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditAddTask from "../../Components/EditAddTask";
import api from "../../Components/services/Api";
import ResumoRender from "../../Components/ResumoRender";
import ProfileApi from "../../Components/ProfileApi";

function Home() {
    const token = localStorage.token;

    const edit = "Editar Registro";
    const add = "Adicionar Registro";
    const profile = "Editar Profile";
    const [nameH1, setNameH1] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [getTransaction, setGetTransaction] = useState([]);
    const [showFiltros, setShowFiltros] = useState(false);
    const [order, setOrder] = useState("ascendente");
    const [flag, setFlag] = useState(false);

    async function HandleTransacoes() {
        try {
            const response = await api.get("/transacao", {
                headers: { Authorization: `Bearer ${token}` },
            });
            return setTransactions(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        HandleTransacoes();
    }, []);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [nomePtofile, setNomeProfile] = useState("");

    useEffect(() => {
        async function HandleProfile() {
            try {
                const response = await api.get("/usuario", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setNome(response.data.nome);
                setNomeProfile(response.data.nome);
                setEmail(response.data.email);
            } catch (error) {
                console.log(token);
                console.error(error);
            }
        }

        HandleProfile();
    }, []);

    function clearDataLocalStorage() {
        localStorage.clear();
    }

    let orderTransactions = [...transactions];
    orderTransactions.sort((a, b) => {
        let dateCompareA = new Date(a.data);
        let dateCompareB = new Date(b.data);
        let orderModifier = order === "crescente" ? 1 : -1;
        return orderModifier * (dateCompareA - dateCompareB);
    });

    const handleOrder = () => {
        const newOrder = order === "crescente" ? "decrescente" : "crescente";
        setOrder(newOrder);
        setTransactions(orderTransactions);
    };

    function handleFilter() {
        setShowFiltros(!showFiltros);
    }

    const [idToDelete, setIdToDelete] = useState(null);
    const [idToEdit, setIdToEdit] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalData, setShowModalData] = useState(false);
    const [showModalDataProfile, setShowModalDataProfile] = useState(false);
    const [addTransaction, setAddTransactions] = useState(false);

    function openAddTransactions() {
        setAddTransactions(!addTransaction);
    }

    const validate = "Adicionar Registro";

    function openDataModal(name) {
        setNameH1(name);
        setShowModalData(!showModalData);
    }
    function openDataModalProfile(name) {
        setNameH1(name);
        setShowModalDataProfile(!showModalDataProfile);
    }
    const handleEdit = async (id) => {
        setShowModalData(!showModalData);
        //await HandleGetTransacao(id);
    };

    const handleDelete = (id) => {
        setShowModal(true);
    };

    function handleDeleteModal(id) {
        if (id === idToDelete) {
            return (
                <div className="modal-excluir-task">
                    <img id="triangulo" src={Triangulo} alt="" />
                    <p>Apagar item?</p>
                    <div className="modal-excluir-task-buttons">
                        <button id="yes" onClick={handleConfirmDelete}>
                            Sim
                        </button>
                        <button id="no" onClick={() => setShowModal(false)}>
                            Não
                        </button>
                    </div>
                </div>
            );
        }
    }

    const handleConfirmDelete = () => {
        async function HandleExcluiTransacao() {
            try {
                const response = await api.delete(`/transacao/${idToDelete}`, {
                    headers: { Authorization: `Bearer ${localStorage.token}` },
                });
                HandleTransacoes();
                setShowModal(false);
                //resolver o problema para atualizar a pagina com React
                return response.data;
            } catch (error) {
                console.error(error, "ERRO NO POST TRANSACTION");
            }
        }
        HandleExcluiTransacao();
    };

    return (
        <div className="home-main">
            {showModalDataProfile && (
                <ProfileApi
                    nameH1={nameH1}
                    CloseIcon={CloseIcon}
                    openDataModalProfile={openDataModalProfile}
                    nome={nome}
                    setNome={setNome}
                    email={email}
                    setEmail={setEmail}
                    flag={flag}
                    setFlag={setFlag}
                />
            )}

            {showModalData && (
                <EditAddTask
                    name={nameH1}
                    showModalData={showModalData}
                    setShowModalData={setShowModalData}
                    transactions={transactions}
                    setTransactions={setTransactions}
                    idToEdit={idToEdit}
                    getTransaction={getTransaction}
                    HandleTransacoes={HandleTransacoes}
                    setGetTransaction={setGetTransaction}
                />
            )}

            <div className="header">
                <div className="polygon">
                    <img src={Polygon} alt="" />
                    <h2>Dindin</h2>
                </div>
                <div className="profile">
                    <button
                        id="buttonProfile"
                        name={profile}
                        onClick={(e) => openDataModalProfile(profile)}
                    >
                        <img src={Profile} alt="" />
                    </button>

                    <span>{flag ? nome : nomePtofile}</span>
                    <Link to="/sign-in">
                        <img
                            src={LogOff}
                            alt=""
                            onClick={() => clearDataLocalStorage()}
                        />
                    </Link>
                </div>
            </div>
            <div className="nav-home">
                <div className="nav-left">
                    <button
                        className="container-filtro"
                        onClick={() => handleFilter()}
                    >
                        <img src={Filtro} alt="" />
                        <span>Filtrar</span>
                    </button>

                    {showFiltros && (
                        <Filtros
                            setTransactions={setTransactions}
                            HandleTransacoes={HandleTransacoes}
                        />
                    )}

                    <div className="container-headers">
                        <div
                            className="header-data"
                            onClick={() => handleOrder()}
                        >
                            <span id="data">Data</span>
                            <img src={DataPoly} alt="polygon" />
                        </div>
                        <span>Dia da semana</span>
                        <span>Descrição</span>
                        <span>Categoria</span>
                        <span>Valor</span>
                        <span></span>
                    </div>
                    <div className="container-transacoes">
                        {transactions.map((transaction) => {
                            const options = { weekday: "long" };
                            const dataFormat = new Date(transaction.data)
                                .toLocaleDateString("pt-br", options)
                                .split("-feira");
                            const diaSemana =
                                dataFormat[0].charAt(0).toUpperCase() +
                                dataFormat[0].slice(1);
                            const dia = new Date(
                                transaction.data
                            ).toLocaleDateString("pt-br", {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                            });

                            return (
                                <ul name="tasks" key={transaction.id}>
                                    <li>{dia}</li>
                                    <li>{diaSemana}</li>
                                    <li>{transaction.descricao}</li>
                                    <li>{transaction.categoria_nome}</li>
                                    <li
                                        id={
                                            transaction.tipo === "entrada"
                                                ? "entrada-saldo"
                                                : "saida-saldo"
                                        }
                                    >
                                        {Number(
                                            transaction.valor / 100
                                        ).toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        })}
                                    </li>
                                    <div className="container-edit-exclui">
                                        <button
                                            id="editar"
                                            name={edit}
                                            onClick={(e) => {
                                                handleEdit(transaction.id);
                                                openDataModal(e.target.name);
                                                setIdToEdit(transaction.id);
                                            }}
                                        >
                                            <img
                                                src={Edit}
                                                name={edit}
                                                alt=""
                                            />
                                        </button>
                                        <button
                                            id="excluir"
                                            onClick={(e) => {
                                                handleDelete(transaction.id);
                                                setIdToDelete(transaction.id);
                                            }}
                                        >
                                            <img src={Excluir} alt="" />
                                        </button>
                                        {showModal &&
                                            handleDeleteModal(transaction.id)}
                                    </div>
                                </ul>
                            );
                        })}
                    </div>
                </div>
                <div className="container-resumo">
                    <h1>Resumo</h1>
                    <div className="container-resumo-data">
                        {<ResumoRender transactions={transactions} />}
                    </div>
                    <div className="container-button-cadastrar-produto">
                        <button
                            id="cadastrar-produto"
                            name={add}
                            onClick={(e) => openDataModal(e.target.name)}
                        >
                            Adicionar registro
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
