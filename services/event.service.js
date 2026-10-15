const eventDao = require('../dao/event.dao');

const eventService = {
    async getAllEvents() {
        return await eventDao.getAll();
    },

    async getEventById(id) {
        const event = await eventDao.getById(id);
        if (!event) {
            throw new Error('El evento solicitado no existe.');
        }
        return event;
    },

    async createEvent(eventData) {
        const { nombre, fecha_hora, lugar, categoria } = eventData;
        if (!nombre || !fecha_hora || !lugar || !categoria) {
            throw new Error('Faltan campos obligatorios para registrar el evento.');
        }
        const eventId = await eventDao.create(eventData);
        return { id: eventId, ...eventData };
    },

    async updateEvent(id, eventData) {
        const existingEvent = await eventDao.getById(id);
        if (!existingEvent) {
            throw new Error('El evento a actualizar no existe.');
        }
        await eventDao.update(id, eventData);
        return { id, ...eventData };
    },

    async deleteEvent(id) {
        const existingEvent = await eventDao.getById(id);
        if (!existingEvent) {
            throw new Error('El evento a eliminar no existe.');
        }
        await eventDao.delete(id);
        return true;
    }
};

module.exports = eventService;