export default interface RepositoryInterface<T> {
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  delete(entity: T): Promise<void>;
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T>;
}
