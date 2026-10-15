const ticketDao = require('../dao/ticket.dao');

const ticketService = {
    async getAllTickets() {
        return await ticketDao.getAll();
    },

    async getTicketById(id) {
        const ticket = await ticketDao.getById(id);
        if (!ticket) {
            throw new Error('La entrada solicitada no existe.');
        }
        return ticket;
    },

    async getTicketsByUser(userId) {
        return await ticketDao.getByUserId(userId);
    },

    async createTicket(ticketData) {
        const { precio_pagado, users_id, events_id } = ticketData;
        if (!precio_pagado || !users_id || !events_id) {
            throw new Error('Faltan campos obligatorios para procesar la compra de la entrada.');
        }
        const ticketId = await ticketDao.create(ticketData);
        return { id: ticketId, ...ticketData };
    },

    async updateTicket(id, ticketData) {
        const existingTicket = await ticketDao.getById(id);
        if (!existingTicket) {
            throw new Error('La entrada a actualizar no existe.');
        }
        await ticketDao.update(id, ticketData);
        return { id, ...ticketData };
    },

    async deleteTicket(id) {
        const existingTicket = await ticketDao.getById(id);
        if (!existingTicket) {
            throw new Error('La entrada a eliminar no existe.');
        }
        await ticketDao.delete(id);
        return true;
    }
};

module.exports = ticketService;