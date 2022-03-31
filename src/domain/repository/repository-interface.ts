export default interface RepositoryInterface<T> {
  create(entity: T): void;
  update(entity: T): void;
  delete(entity: T): void;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
}
