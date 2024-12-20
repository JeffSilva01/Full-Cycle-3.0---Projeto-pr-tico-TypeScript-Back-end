import { CategoryInMemoryRepository } from '@/category/infra/db/in-memory/category-in-memory.repository';
import { InvalidUuidError, Uuid } from '@/shared/domain/value-objects/uuid.vo';
import { NotFoundError } from '@/shared/domain/validators/errors/not-found.errr';
import { Category } from '@/category/domain/category.entity';
import { GetCategoryUseCase } from '../get-category.use-case';

describe('GetCategoryUseCase Unit Tests', () => {
  let useCase: GetCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new GetCategoryUseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    await expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new InvalidUuidError(),
    );

    const uuid = new Uuid();
    await expect(() => useCase.execute({ id: uuid.id })).rejects.toThrow(
      new NotFoundError(uuid.id, Category),
    );
  });

  it('should returns a category', async () => {
    const items = [Category.create({ name: 'Movie' })];
    repository.items = items;
    const spyFindById = vitest.spyOn(repository, 'findById');
    const output = await useCase.execute({ id: items[0].categoryId.id });
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: items[0].categoryId.id,
      name: 'Movie',
      description: null,
      isActive: true,
      createdAt: items[0].createdAt,
    });
  });
});
