// routes/formula.routes.ts
import { Router } from 'express';
import { FormulaController } from '../controllers/formula.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateFormula } from '../middleware/validation.middleware';

const router = Router();

router.use(authenticate);

router.post('/', validateFormula, FormulaController.create);
router.get('/', FormulaController.getAll);
router.get('/:id', FormulaController.getById);
router.put('/:id', validateFormula, FormulaController.update);
router.delete('/:id', FormulaController.delete);

export default router;