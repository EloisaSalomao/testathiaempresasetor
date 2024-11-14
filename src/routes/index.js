const express = require('express');
const router = express.Router();
const EmpresasController = require('../controller/EmpresasController');
const SetoresController = require('../controller/SetoresController');
const Empresa_setorController = require('../controller/Empresa_setorController');

router.get('/empresas', EmpresasController.listar);
router.post('/empresas', EmpresasController.criar);
router.put('/empresas/:id', EmpresasController.alterar);
router.delete('/empresas/:id', EmpresasController.deletar);
router.get('/empresas/:id', EmpresasController.listarEmpresa);

router.get('/setores', SetoresController.listar);
router.post('/setores', SetoresController.criar);
router.put('/setores/:id', SetoresController.alterar);
router.delete('/setores/:id', SetoresController.deletar);
router.get('/setores/:id', SetoresController.listarSetor);

router.post('/empresa-setor', Empresa_setorController.vincularEmpresaSetor);
router.get('/empresa-setor', Empresa_setorController.listarVinculos);
router.delete('/empresa-setor', Empresa_setorController.removerVinculo);

module.exports = router;