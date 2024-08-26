const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard-controller');

router.get('/userstats', dashboardController.getUserStatistics);
router.get('/exchangestats', dashboardController.getExchangeStatistics);
router.get('/categorydistribution', dashboardController.getCategoryDistribution);

module.exports = router;
