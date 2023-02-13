import {
  isValidObjectId,
  Model,
  models,
  Schema,
  UpdateQuery,
  model,
} from 'mongoose';
import IVehicle from '../Interfaces/IVehicle';

export default abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;

  constructor() {
    this.schema = new Schema<IVehicle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true },
      buyValue: { type: Number, required: true },
    });
    this.model = models.Vehicle || model('Vehicle', this.schema);
  }

  public async create(car: T): Promise<T> {
    return this.model.create({ ...car });
  }

  public async findById(id: string): Promise<T[] | undefined> {
    if (!isValidObjectId(id)) return undefined;
    return this.model.find({ _id: id });
  }

  public async find(): Promise<T[]> {
    return this.model.find();
  }

  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(_id)) throw Error('Invalid Mongo id');

    return this.model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }
}