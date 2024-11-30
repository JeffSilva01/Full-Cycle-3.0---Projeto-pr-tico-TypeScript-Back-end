import { getModelToken } from "@nestjs/sequelize";
import { CategoryInMemoryRepository } from "../../core/category/infra/db/in-memory/category-in-memory.repository";
import { CategorySequelizeRepository } from "../../core/category/infra/db/sequelize/category-sequelize.repository";
import { CategoryModel } from "../../core/category/infra/db/sequelize/category.model";
import { ICategoryRepository } from "../../core/category/domain/category.repository";
import { CreateCategoryUseCase } from "@/core/category/application/use-case/create-category/create-category.use-case";
import { UpdateCategoryUseCase } from "@/core/category/application/use-case/update-category/update-category.use-case";
import { ListCategoriesUseCase } from "@/core/category/application/use-case/list-category/list-category.use-case";
import { GetCategoryUseCase } from "@/core/category/application/use-case/get-category/get-category.use-case";
import { DeleteCategoryUseCase } from "@/core/category/application/use-case/delete-category/delete-category.use-case";

export const REPOSITORIES = {
	CATEGORY_REPOSITORY: {
		provide: "CategoryRepository",
		useExisting: CategorySequelizeRepository,
	},
	CATEGORY_IN_MEMORY_REPOSITORY: {
		provide: CategoryInMemoryRepository,
		useClass: CategoryInMemoryRepository,
	},
	CATEGORY_SEQUELIZE_REPOSITORY: {
		provide: CategorySequelizeRepository,
		useFactory: (categoryModel: typeof CategoryModel) => {
			return new CategorySequelizeRepository(categoryModel);
		},
		inject: [getModelToken(CategoryModel)],
	},
};

export const USE_CASES = {
	CREATE_CATEGORY_USE_CASE: {
		provide: CreateCategoryUseCase,
		useFactory: (categoryRepo: ICategoryRepository) => {
			return new CreateCategoryUseCase(categoryRepo);
		},
		inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
	},
	UPDATE_CATEGORY_USE_CASE: {
		provide: UpdateCategoryUseCase,
		useFactory: (categoryRepo: ICategoryRepository) => {
			return new UpdateCategoryUseCase(categoryRepo);
		},
		inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
	},
	LIST_CATEGORIES_USE_CASE: {
		provide: ListCategoriesUseCase,
		useFactory: (categoryRepo: ICategoryRepository) => {
			return new ListCategoriesUseCase(categoryRepo);
		},
		inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
	},
	GET_CATEGORY_USE_CASE: {
		provide: GetCategoryUseCase,
		useFactory: (categoryRepo: ICategoryRepository) => {
			return new GetCategoryUseCase(categoryRepo);
		},
		inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
	},
	DELETE_CATEGORY_USE_CASE: {
		provide: DeleteCategoryUseCase,
		useFactory: (categoryRepo: ICategoryRepository) => {
			return new DeleteCategoryUseCase(categoryRepo);
		},
		inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
	},
};

// export const VALIDATIONS = {
// 	CATEGORIES_IDS_EXISTS_IN_DATABASE_VALIDATOR: {
// 		provide: CategoriesIdExistsInDatabaseValidator,
// 		useFactory: (categoryRepo: ICategoryRepository) => {
// 			return new CategoriesIdExistsInDatabaseValidator(categoryRepo);
// 		},
// 		inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
// 	},
// };

export const CATEGORY_PROVIDERS = {
	REPOSITORIES,
	USE_CASES,
	// VALIDATIONS,
};