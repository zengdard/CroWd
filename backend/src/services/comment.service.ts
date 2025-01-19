import { AppDataSource } from '../data-source';
import { Comment } from '../entities/Comment';
import { CreateCommentDto } from '../dtos/comment.dto';

export class CommentService {
    private commentRepository = AppDataSource.getRepository(Comment);

    async create(dto: CreateCommentDto, userId: number) {
        const comment = this.commentRepository.create({
            content: dto.content,
            project: { id: dto.projectId },
            user: { id: userId }
        });
        return await this.commentRepository.save(comment);
    }

    async findByProject(projectId: number) {
        return await this.commentRepository.find({
            where: { project: { id: projectId } },
            relations: ['user'],
            order: { createdAt: 'DESC' }
        });
    }
}
