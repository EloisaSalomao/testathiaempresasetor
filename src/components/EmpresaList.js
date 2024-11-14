// src/components/EmpresaList.js
import React, { useState, useEffect } from 'react';
import api from '../api/api';

function EmpresaList() {
  const [empresas, setEmpresas] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    razao_social: '',
    nome_fantasia: '',
    cnpj: '',
  });

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const fetchEmpresas = async () => {
    const response = await api.get('/empresas');
    setEmpresas(response.data);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      // Atualizar empresa existente
      await api.put(`/empresas/${formData.id}`, formData);
    } else {
      // Adicionar nova empresa
      await api.post('/empresas', formData);
    }
    fetchEmpresas();
    setFormData({ id: '', razao_social: '', nome_fantasia: '', cnpj: '' });
  };

  const handleDelete = async (id) => {
    await api.delete(`/empresas/${id}`);
    fetchEmpresas();
  };

  const handleEdit = (empresa) => {
    setFormData({
      id: empresa.id,
      razao_social: empresa.razao_social,
      nome_fantasia: empresa.nome_fantasia,
      cnpj: empresa.cnpj,
    });
  };

  return (
    <div>
      <h2>Empresas</h2>
      <ul>
        {empresas.map((empresa) => (
          <li key={empresa.id}>
            {empresa.razao_social} 
            <button onClick={() => handleEdit(empresa)}>Editar</button>
            <button onClick={() => handleDelete(empresa.id)}>Deletar</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          name="razao_social"
          placeholder="Razão Social"
          value={formData.razao_social}
          onChange={handleInputChange}
        />
        <input
          name="nome_fantasia"
          placeholder="Nome Fantasia"
          value={formData.nome_fantasia}
          onChange={handleInputChange}
        />
        <input
          name="cnpj"
          placeholder="CNPJ"
          value={formData.cnpj}
          onChange={handleInputChange}
        />
        <button type="submit">{formData.id ? 'Atualizar Empresa' : 'Adicionar Empresa'}</button>
      </form>
    </div>
  );
}

export default EmpresaList;
