import express from 'express';
import ExpenseController from '../controllerFile/controller'

const router = express.Router();

router.post('/expense',ExpenseController.addExpenses);
router.get('/expense',ExpenseController.allExpenses);
router.get('/summary',ExpenseController.getSummaryExpenses);

export default router;