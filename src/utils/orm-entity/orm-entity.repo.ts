// import { PinoLoggerService } from 'src/common/logger/adapters/pinoLogger.service';
// import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
// import { GetAllDto } from '../dto/get.dto';
// import { BaseOrmEntity } from '../entities/base.orm-entity';
// import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

// export type FindDocumentsRepositoryParams = GetAllDto;

// export type FindDocumentsRepositoryMeta = {
//     hasMore: boolean;
//     totalCount: number;
//     nextPage: number | null;
//     currentPage: number | null;
//     totalPages: number | null;
//     prevPage: number | null;
//     lastPage: number | null;
// };

// export type FindDocumentsRepositoryResult<Document> = Promise<{
//     meta: FindDocumentsRepositoryMeta | null;
//     entities: Document[];
// }>;

// export type OrmEntity<T> = T & BaseOrmEntity ;

// export type BaseRepositoryOptions<E> = {
//     logger: PinoLoggerService;
//     ormRepository: Repository<OrmEntity<E>>,
//     throwOnError?: boolean;
// }

// export class BaseRepository {


//     static async save<E>(
//         entity: DeepPartial<OrmEntity<E>>,
//         options: BaseRepositoryOptions<E>,
//     ): Promise<OrmEntity<E>> {
//         try {
//             return await options.ormRepository.save(entity);
//         } catch (error) {
//             options.logger && options.logger.error(error);
//             if (options.throwOnError) throw new Error(error);
//         }
//     }

//     static async saveEntities<E>(
//         entities: DeepPartial<OrmEntity<E>>[],
//         options: BaseRepositoryOptions<E>,
//     ): Promise<OrmEntity<E>[]> {
//         try {
//             return await options.ormRepository.save(entities);
//         } catch (error) {
//             options.logger && options.logger.error(error);
//             if (options.throwOnError) throw new Error(error);
//         }
//     }

//     static async find<E>(
//         options: BaseRepositoryOptions<E>,
//         args: {
//             search?: { searchText: string; searchFields: (keyof E)[] };
//             sort?: Partial<Record<keyof E, 'asc' | 'desc'>>;
//             selectField?: (keyof E)[];
//             pagination?: { page: number; limit: number };
//         } & FindManyOptions<OrmEntity<E>> = {},
//     ): FindDocumentsRepositoryResult<OrmEntity<E>> {
//         try {
//             const { search, sort, pagination, ..._ } = args;
//             const qb = options.ormRepository.createQueryBuilder('entity');
    
//             // Apply search filters
//             if (search) {
//                 search.searchFields.forEach((field, index) => {
//                     const paramName = `searchText${index}`;
//                     qb.orWhere(`entity.${String(field)} ILIKE :${paramName}`, {
//                         [paramName]: `%${search.searchText}%`,
//                     });
//                 });
//             }
    
//             // Apply sorting
//             if (sort) {
//                 Object.entries(sort).forEach(([field, order]) => {
//                     qb.addOrderBy(`entity.${String(field)}`, (order as string).toUpperCase() as 'ASC' | 'DESC');
//                 });
//             }
    
//             // Apply pagination
//             if (pagination) {
//                 const { page, limit } = pagination;
//                 qb.skip((page - 1) * limit).take(limit);
//             }
    
//             // Fetch entities and count
//             const [entities, totalCount] = await qb.getManyAndCount();
    
//             const result = {
//                 entities,
//                 meta: null,
//             };
    
//             if (pagination) {
//                 const totalPages = totalCount > 0 ? Math.ceil(totalCount / pagination.limit) : 1;
//                 result.meta = {
//                     totalCount,
//                     hasMore: pagination.page < totalPages,
//                     totalPages,
//                     currentPage: pagination.page,
//                     nextPage: pagination.page < totalPages ? pagination.page + 1 : null,
//                     prevPage: pagination.page > 1 ? pagination.page - 1 : null,
//                     lastPage: totalPages,
//                 };
//             }
    
//             return result;
//         } catch (error) {
//             options.logger?.error(error);
//             if (options.throwOnError) {
//                 throw new Error('DatabaseError');
//             }
//         }
//     }
    

//     static async findOne<E>(
//         where: FindOneOptions<OrmEntity<E>>['where'],
//         options: BaseRepositoryOptions<E>,
//     ): Promise<OrmEntity<E> | null> {
//         try {
//             return await options.ormRepository.findOne({ where });
//         } catch (error) {
//             options.logger && options.logger.error(error);
//             if (options.throwOnError) throw new Error(error);
//         }
//     }

//     static async findById<E>(
//         id: OrmEntity<E>['id'],
//         options: BaseRepositoryOptions<E>,
//     ): Promise<OrmEntity<E> | null> {
//         try {
//             return await options.ormRepository.findOne({ where: { id } as FindOptionsWhere<OrmEntity<E>> });
//         } catch (error) {
//             options.logger && options.logger.error(error);
//             if (options.throwOnError) throw new Error(error);
//         }
//     }
    

//     static async update<E>(
//         id: OrmEntity<E>['id'],
//         entity: QueryDeepPartialEntity<OrmEntity<E>>,
//         options: BaseRepositoryOptions<E>,
//     ): Promise<void> {
//         try {
//             await options.ormRepository.update({ id } as FindOptionsWhere<OrmEntity<E>>, entity);
//         } catch (error) {
//             options.logger && options.logger.error(error);
//             if (options.throwOnError) throw new Error(error);
//         }
//     }

//     static async delete<E>(
//         ids: OrmEntity<E>['id'][],
//         options: BaseRepositoryOptions<E>,
//         deleteType: 'soft' | 'hard' = 'soft',
//     ): Promise<any> {
//         try {
//             if (deleteType === 'soft') {
//                 return await options.ormRepository.softDelete(ids);
//             } else {
//                 return await options.ormRepository.delete(ids);
//             }
//         } catch (error) {
//             options.logger && options.logger.error(error);
//             if (options.throwOnError) throw new Error(error);
//         }
//     }

//     static async restore<E>(
//         ids: OrmEntity<E>['id'][],
//         options: BaseRepositoryOptions<E>,
//     ): Promise<void> {
//         try {
//             await options.ormRepository.restore(ids);
//         } catch (error) {
//             options.logger && options.logger.error(error);
//             if (options.throwOnError) throw new Error(error);
//         }
//     }
// }
