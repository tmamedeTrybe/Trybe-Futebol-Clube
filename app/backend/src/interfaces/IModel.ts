import { Model, CreateOptions } from 'sequelize';

interface IModel<T extends Model> {
  findOne(obj: CreateOptions<T>): Promise<T>,
}

export default IModel;
