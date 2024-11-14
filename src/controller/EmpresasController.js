let Empresas = require('../model/Empresa');
const pool = require('../database/mysql');

const EmpresasController = {
    async criar(req, res) {
        const { razao_social, nome_fantasia, cnpj } = req.body;

        const sql = `INSERT INTO empresa (razao_social, nome_fantasia, cnpj) VALUES (?, ?, ?)`;
        const result = await pool.query(sql, [razao_social, nome_fantasia, cnpj])
        const insertId = result[0]?.insertId;
        if (!insertId) {
            return res.status(401).json({ message: 'Erro ao criar empresa' })
        }
        const sql_select = `SELECT * FROM empresa WHERE id = ?`
        const [rows] = await pool.query(sql_select, [insertId])
        return res.status(201).json(rows[0])

    },

    async listar(req, res) {
        let sql = 'SELECT * FROM empresa';
        const [rows] = await pool.query(sql);

        return res.status(200).json(rows);
    },

    async listarEmpresa(req, res) {
        const paramId = req.params.id;
        let sql = "SELECT * FROM empresa WHERE id = ?";
        const [rows] = await pool.query(sql, [paramId])

        return res.status(201).json(rows);
    },

    async alterar(req, res) {
        console.log(req.params)
        const paramId = req.params.id;

        const {razao_social, nome_fantasia, cnpj} = req.body;

        let sql = "UPDATE empresa SET razao_social = ?, nome_fantasia = ?, cnpj = ? WHERE id = ?"
        const result = await pool.query(sql, [razao_social, nome_fantasia, cnpj, Number(paramId)])
        console.log(result)
        const changedRows = result[0]?.affectedRows;
        if(!changedRows){
            return res.status(401).json({message: 'Erro ao alterar empresa.'})
        }

        const sql_select = 'SELECT * FROM empresa WHERE id = ?'
        const [rows] = await pool.query(sql_select, [paramId])

        return res.status(201).json(rows[0]);
    },

    async deletar(req, res){
        const paramId = req.params.id;
        let sql = `DELETE FROM empresa WHERE id = ?`
        const result = await pool.query(sql, [Number(paramId)])
        const affectedRows = result[0]?.affectedRows;
        if(!affectedRows)
        {
            return res.status(401).json({message: "Erro ao deletar empresa."})
        }
        return res.status(200).json({message: "Empresa deletada com sucesso."})
    },

}


module.exports = EmpresasController;