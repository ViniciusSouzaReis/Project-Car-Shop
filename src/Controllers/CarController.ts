import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async registerNewCar() {
    const {
      model,
      year,
      color,
      status,
      buyValue,
      doorsQty,
      seatsQty,
    } = this.req.body;

    let checkStatus = true;

    if (!status) {
      checkStatus = false;
    }

    try {
      const car: ICar = {
        model,
        year,
        color,
        status: checkStatus,
        buyValue,
        doorsQty,
        seatsQty,
      };
      const carRegistration = await this.service.registerNewCar(car);
      return this.res.status(201).json(carRegistration);
    } catch (error) {
      this.next(error);
    }
  }
}