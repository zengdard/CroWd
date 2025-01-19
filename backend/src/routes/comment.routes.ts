import { Router } from 'express';
import { CommentService } from '../services/comment.service';
import { validateDto } from '../middleware/validate.middleware';
import { CreateCommentDto } from '../dtos/comment.dto';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const commentService = new CommentService();

router.post('/', 
    authMiddleware,
    validateDto(CreateCommentDto),
    async (req, res) => {
        const comment = await commentService.create(req.body, req.user.id);
        res.status(201).json(comment);
    }
);

router.get('/project/:projectId', async (req, res) => {
    const comments = await commentService.findByProject(parseInt(req.params.projectId));
    res.json(comments);
});

export default router;