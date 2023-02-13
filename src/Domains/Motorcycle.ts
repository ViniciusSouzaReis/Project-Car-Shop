import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(
    motoObj: IMotorcycle,
  ) {
    super(motoObj);
    this.category = motoObj.category;
    this.engineCapacity = motoObj.engineCapacity;
  }

  public setCategory(category: string) {
    this.category = category;
  }

  public getCategory() {
    return this.category;
  }
  public setEngineCapacity(qty: number) {
    this.engineCapacity = qty;
  }

  public getEngineCapacity() {
    return this.engineCapacity;
  }
}