require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const equipmentRoutes = require('./routes/equipment.routes');
const reservationRoutes = require('./routes/reservation.routes');
const notificationRoutes = require('./routes/notification.routes');
const activityRoutes = require('./routes/activity.routes');
const userRoutes = require('./routes/user.routes');
const tagRoutes = require('./routes/tag.routes');
const locationRoutes = require('./routes/location.routes');
const settingsRoutes = require('./routes/settings.routes');
const exportRoutes = require('./routes/export.routes');
const consumableRoutes = require('./routes/consumable.routes');
const statisticsRoutes = require('./routes/statistics.routes');
const maintenanceRoutes = require('./routes/maintenance.routes');
const reportsRoutes = require('./routes/reports.routes');
const messagesRoutes = require('./routes/messages.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/activity-logs', activityRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/consumables', consumableRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/messages', messagesRoutes);

app.use(errorHandler);

module.exports = app;
