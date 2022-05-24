import React, { useState, Fragment } from "react";
import "./App.css";
import data from "./dados.json"; //Dados mockados
import LinhaSomenteLeitura from "./components/LinhaSomenteLeitura";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const App = () => {
  //Define a variavel listagens tendo como estado inicial os dados do arquivo dados.json
  const [listagens, setlistagens] = useState(data);
  const [contatoFoco, setContatoFoco] = useState(null)

  //Define um estado inicial para o formulário de envio com dados formatados espelhando o json
  const novo = () => ({
    nomeCompleto: "",
    numeroCelular: "",
    email: "",
  });

  const [addDadosFormulario, setAddDadosFormulario] = useState(novo());

  // Se isso for null significa que o usuário não está editando nenhuma tabela
  const [editarIdLista, setEditarIdLista] = useState(null);

  const eventoAddMudancaFormulario = (event) => {
    event.preventDefault();

    const nomeDoCampo = event.target.getAttribute("name"); //pega o atributo name dos campos de input então nomeCompleto, numeroCelular, email
    const valorDoCampo = event.target.value; //valor atual que o usuário digitou então por exemplo "Vinicius" ou um caractere qualquer

    const novosDadosFormulario = { ...addDadosFormulario }; //novosDadosFormulario assume o valor de addDadosFormulario
    novosDadosFormulario[nomeDoCampo] = valorDoCampo;

    setAddDadosFormulario(novosDadosFormulario);
  };

  const eventoEnviarDadosFormulario = (event) => {
    event.preventDefault();
    var novasListagens = [...listagens];

    if (editarIdLista !== null) {
      novasListagens[editarIdLista] = addDadosFormulario;
    } else {
      novasListagens.push(addDadosFormulario);
    }

    setlistagens(novasListagens);
    handleClose();
  };

  const eventoClickEditar = (event, listagem, i) => {
    event.preventDefault();
    setEditarIdLista(i);
    setAddDadosFormulario(listagem);
    handleShow();
  };

  const eventoClickDeletar = (event) => {
    event.preventDefault();
    const novasListagens = listagens.filter(listagem => listagem.id !== contatoFoco)

    setlistagens(novasListagens);
    setContatoFoco(null)

    handleFechar();
  };

  const eventoClickMostrarModalDeletar = (event, id) => {
    event.preventDefault();
    setContatoFoco(id)
    handleMostrar();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [mostrarModal, setMostrarModal] = useState(false);

  const handleFechar = () => setMostrarModal(false);
  const handleMostrar = () => setMostrarModal(true);

  const adicionar = () => {
    setAddDadosFormulario(novo());
    setEditarIdLista(null);
    handleShow();
  };

  return (
    <div className="app-container">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Formulário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={eventoEnviarDadosFormulario}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control
                name="nomeCompleto"
                type="text"
                placeholder="Insira seu nome"
                required="required"
                value={addDadosFormulario.nomeCompleto}
                onChange={eventoAddMudancaFormulario}
              />
              <Form.Text className="text-muted">
                Nunca compartilharemos seu nome
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Insira seu email"
                required="required"
                value={addDadosFormulario.email}
                onChange={eventoAddMudancaFormulario}
              />
              <Form.Text className="text-muted">
                Nunca compartilharemos seu email
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Numero de Celular</Form.Label>
              <Form.Control
                name="numeroCelular"
                type="text"
                placeholder="Insira seu celular"
                required="required"
                value={addDadosFormulario.numeroCelular}
                onChange={eventoAddMudancaFormulario}
              />
              <Form.Text className="text-muted">
                Nunca compartilharemos seu número de celular
              </Form.Text>
            </Form.Group>
            <Button variant="success" type="submit">
              Enviar
            </Button>{" "}
            <Button variant="danger" type="button" onClick={handleClose}>
              Cancelar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Modal show={mostrarModal} onHide={handleFechar}>
        <Modal.Header closeButton>
          <Modal.Title>Deletar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {["danger"].map((variant) => (
            <Alert key={variant} variant={variant}>
              Deseja excluir esse registro?
            </Alert>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFechar}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={eventoClickDeletar}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>

      <form>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Celular</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {listagens.map((listagem, i) => (
              <LinhaSomenteLeitura
                listagem={listagem}
                i={i}
                eventoClickEditar={eventoClickEditar}
                eventoClickMostrarModalDeletar={(e) => eventoClickMostrarModalDeletar(e, listagem.id)}
                key={listagem.id}
              />
            ))}
          </tbody>
        </table>
      </form>

      <Button variant="primary" onClick={adicionar}>
       Novo
      </Button>
    </div>
  );
};

export default App;
