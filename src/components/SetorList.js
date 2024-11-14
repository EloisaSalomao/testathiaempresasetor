// src/components/SetorList.js
import React, { useState, useEffect } from 'react';
import api from '../api/api';

function SetorList() {
  const [setores, setSetores] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [setorId, setSetorId] = useState(''); // Para armazenar o id do setor a ser editado

  useEffect(() => {
    fetchSetores();
  }, []);

  const fetchSetores = async () => {
    const response = await api.get('/setores');
    setSetores(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setorId) {
      // Atualizar setor existente
      await api.put(`/setores/${setorId}`, { descricao });
    } else {
      // Adicionar novo setor
      await api.post('/setores', { descricao });
    }
    fetchSetores();
    setDescricao('');
    setSetorId(''); // Limpar após salvar
  };

  const handleDelete = async (id) => {
    await api.delete(`/setores/${id}`);
    fetchSetores();
  };

  const handleEdit = (setor) => {
    setDescricao(setor.descricao);
    setSetorId(setor.id); // Definir id do setor a ser editado
  };

  return (
    <div>
      <h2>Setores</h2>
      <ul>
        {setores.map((setor) => (
          <li key={setor.id}>
            {setor.descricao}
            <button onClick={() => handleEdit(setor)}>Editar</button>
            <button onClick={() => handleDelete(setor.id)}>Deletar</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Descrição do Setor"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button type="submit">{setorId ? 'Atualizar Setor' : 'Adicionar Setor'}</button>
      </form>
    </div>
  );
}

export default SetorList;
