import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

export default class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor(
    carObj: ICar,
  ) {
    super(carObj);
    this.doorsQty = carObj.doorsQty;
    this.seatsQty = carObj.seatsQty;
  }

  public setDoorsQty(qty: number) {
    this.doorsQty = qty;
  }

  public getDoorsQty() {
    return this.doorsQty;
  }
  public setSeatsQty(qty: number) {
    this.seatsQty = qty;
  }

  public getSeatsQty() {
    return this.seatsQty;
  }
}