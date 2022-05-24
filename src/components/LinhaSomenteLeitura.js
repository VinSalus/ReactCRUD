import React from "react";

const LinhaSomenteLeitura = ({ listagem, i, eventoClickEditar, eventoClickDeletar}) => {
  
  return (
    <tr>
      <td>{listagem.nomeCompleto}</td>
      <td>{listagem.email}</td>
      <td>{listagem.numeroCelular}</td>
      
      <td>
        <button onClick={(event) => eventoClickEditar(event, listagem, i)}> 
          <img src="https://icon-library.com/images/edit-icon-png/edit-icon-png-0.jpg"
          height="50px"
          alt = "botao editar"
          type="button"
          />
        </button>
        
        <button onClick={(event) => {eventoClickDeletar(event, i); }}>
        <img src= "https://cdn-icons-png.flaticon.com/512/2891/2891491.png"
        height= "50px"
        type="button"
        alt="Botão deletar"
        />
        </button>
      </td>
    </tr>
  );
};

export default LinhaSomenteLeitura;