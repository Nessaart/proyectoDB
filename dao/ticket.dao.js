const db = require('../services/mysql.service');

const ticketDao = {
    async getAll() {
        const [rows] = await db.query('SELECT * FROM tickets');
        return rows;
    },

    async getById(id) {
        const [rows] = await db.query('SELECT * FROM tickets WHERE id = ?', [id]);
        return rows[0];
    },

    async getByUserId(userId) {
        const [rows] = await db.query(
            'SELECT t.*, e.nombre as evento_nombre, e.lugar, e.fecha_hora, e.categoria FROM tickets t JOIN events e ON t.events_id = e.id WHERE t.users_id = ?',
            [userId]
        );
        return rows;
    },

    async create(ticketData) {
        const { fecha_compra, precio_pagado, estado, users_id, events_id } = ticketData;
        const [result] = await db.query(
            'INSERT INTO tickets (fecha_compra, precio_pagado, estado, users_id, events_id) VALUES (?, ?, ?, ?, ?)',
            [fecha_compra || new Date(), precio_pagado, estado || 'Valida', users_id, events_id]
        );
        return result.insertId;
    },

    async update(id, ticketData) {
        const { estado, precio_pagado } = ticketData;
        const [result] = await db.query(
            'UPDATE tickets SET estado = ?, precio_pagado = ? WHERE id = ?',
            [estado, precio_pagado, id]
        );
        return result.affectedRows;
    },

    async delete(id) {
        const [result] = await db.query('DELETE FROM tickets WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = ticketDao;