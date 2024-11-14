const pool = require('../database/mysql');

const Empresa_setorController = {
    async vincularEmpresaSetor(req, res) {
        const { empresa_id, setor_id } = req.body;

        if (!empresa_id || !setor_id) {
            return res.status(400).json({ message: 'É necessário fornecer empresa_id e setor_id.' });
        }

        try {
            // Verificar se a empresa existe
            const [empresa] = await pool.query("SELECT * FROM empresa WHERE id = ?", [empresa_id]);
            if (empresa.length === 0) {
                return res.status(400).json({ message: 'Empresa não encontrada.' });
            }

            // Verificar se o setor existe
            const [setor] = await pool.query("SELECT * FROM setor WHERE id = ?", [setor_id]);
            if (setor.length === 0) {
                return res.status(400).json({ message: 'Setor não encontrado.' });
            }

            // Verificar se o vínculo já existe
            const [vinculoExistente] = await pool.query("SELECT * FROM empresa_setor WHERE empresa_id = ? AND setor_id = ?", [empresa_id, setor_id]);
            if (vinculoExistente.length > 0) {
                return res.status(409).json({ message: 'A empresa já está vinculada a este setor.' });
            }

            // Inserir o vínculo na tabela
            const sql = 'INSERT INTO empresa_setor (empresa_id, setor_id) VALUES (?, ?)';
            const result = await pool.query(sql, [empresa_id, setor_id]);

            return res.status(201).json({ message: 'Empresa vinculada ao setor com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao vincular empresa ao setor.' });
        }
    },

    async listarVinculos(req, res) {
        try {
            const sql = `
                SELECT empresa.razao_social, setor.descricao, empresa_setor.empresa_id, empresa_setor.setor_id
                FROM empresa_setor
                JOIN empresa ON empresa_setor.empresa_id = empresa.id
                JOIN setor ON empresa_setor.setor_id = setor.id
            `;
            const [rows] = await pool.query(sql);

            return res.status(200).json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao listar vinculações.' });
        }
    },

    async removerVinculo(req, res) {
        const { empresa_id, setor_id } = req.body;

        if (!empresa_id || !setor_id) {
            return res.status(400).json({ message: 'É necessário fornecer empresa_id e setor_id.' });
        }

        try {
            const sql = 'DELETE FROM empresa_setor WHERE empresa_id = ? AND setor_id = ?';
            const result = await pool.query(sql, [empresa_id, setor_id]);

            if (result[0]?.affectedRows === 0) {
                return res.status(404).json({ message: 'Vínculo não encontrado.' });
            }

            return res.status(200).json({ message: 'Vínculo removido com sucesso.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao remover vínculo.' });
        }
    },
};

module.exports = Empresa_setorController;
