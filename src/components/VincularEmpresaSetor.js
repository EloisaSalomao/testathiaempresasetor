import React, { useState, useEffect } from 'react';
import api from '../api/api';

function VincularEmpresaSetor() {
  const [empresas, setEmpresas] = useState([]);
  const [setores, setSetores] = useState([]);
  const [empresaId, setEmpresaId] = useState('');
  const [setorId, setSetorId] = useState('');
  const [vinculos, setVinculos] = useState([]);

  useEffect(() => {
    api.get('/empresas').then((response) => setEmpresas(response.data));
    api.get('/setores').then((response) => setSetores(response.data));
    fetchVinculos();
  }, []);

  const fetchVinculos = async () => {
    try {
      const response = await api.get('/empresa-setor');
      setVinculos(response.data);
    } catch (error) {
      console.error('Erro ao listar vínculos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/empresa-setor', { empresa_id: empresaId, setor_id: setorId });
      alert('Empresa vinculada ao setor com sucesso');
      fetchVinculos();
    } catch (error) {
      alert('Erro ao vincular empresa ao setor');
      console.error(error);
    }
  };

  const handleRemoveVinculo = async (empresaId, setorId) => {
    try {
      const response = await api.delete('/empresa-setor', {
        data: { empresa_id: empresaId, setor_id: setorId },
      });
      alert('Vínculo removido com sucesso');
      fetchVinculos();  // Recarrega os vínculos após a remoção
    } catch (error) {
      alert('Erro ao remover vínculo');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Vincular Empresa a Setor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <select onChange={(e) => setEmpresaId(e.target.value)} value={empresaId}>
            <option value="">Selecione uma Empresa</option>
            {empresas.map((empresa) => (
              <option key={empresa.id} value={empresa.id}>
                {empresa.razao_social}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select onChange={(e) => setSetorId(e.target.value)} value={setorId}>
            <option value="">Selecione um Setor</option>
            {setores.map((setor) => (
              <option key={setor.id} value={setor.id}>
                {setor.descricao}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit">Vincular</button>
        </div>
      </form>

      <h3>Vínculos Existentes</h3>
      <table>
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Setor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vinculos.length > 0 ? (
            vinculos.map((vinculo) => (
              <tr key={`${vinculo.empresa_id}-${vinculo.setor_id}`}>
                <td>{vinculo.razao_social}</td>
                <td>{vinculo.descricao}</td>
                <td>
                  <button onClick={() => handleRemoveVinculo(vinculo.empresa_id, vinculo.setor_id)}>
                    Remover
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Nenhum vínculo encontrado</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VincularEmpresaSetor;
