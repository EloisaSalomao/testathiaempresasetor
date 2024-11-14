import React from 'react';
import './App.css';
import EmpresaList from './components/EmpresaList';
import SetorList from './components/SetorList';
import VincularEmpresaSetor from './components/VincularEmpresaSetor';

function App() {
  return (
    <div className="App">
      <h1>Gerenciamento de Empresas e Setores</h1>
      <EmpresaList />
      <SetorList />
      <VincularEmpresaSetor />
    </div>
  );
}

export default App;