const express = require("express");
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const authRoutes = require("./routes/auth.routes");
const eventRoutes = require("./routes/event.routes");
const ticketRoutes = require("./routes/ticket.routes");
const reviewRoutes = require("./routes/review.routes"); // NUEVO

const PORT = 5000;
const api = express();

api.use(express.json());
api.use(express.static("public"));

// Configuración de Swagger con rutas absolutas explícitas
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ticket USB - API',
            version: '1.0.0',
            description: 'Documentacion de la API para el sistema Ticket USB',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Servidor Local',
            },
        ],
    },
    apis: [
        path.join(__dirname, './routes/auth.routes.js'),
        path.join(__dirname, './routes/event.routes.js'),
        path.join(__dirname, './routes/ticket.routes.js'),
        path.join(__dirname, './routes/review.routes.js') // NUEVO
    ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Conectar rutas
api.use("/api/auth", authRoutes);
api.use("/api/events", eventRoutes);
api.use("/api/tickets", ticketRoutes);
api.use("/api/reviews", reviewRoutes); // NUEVO

api.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});