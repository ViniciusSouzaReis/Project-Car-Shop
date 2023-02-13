import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorCycleService from '../Services/MotorcicleService';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorCycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorCycleService();
  }

  public async registerNewMoto() {
    const {
      model,
      year,
      color,
      status,
      buyValue,
      category,
      engineCapacity,
    } = this.req.body;

    let checkStatus = true;

    if (!status) {
      checkStatus = false;
    }

    try {
      const moto: IMotorcycle = {
        model,
        year,
        color,
        status: checkStatus,
        buyValue,
        category,
        engineCapacity,
      };
      const motoRegistration = await this.service.registerNewMoto(moto);
      return this.res.status(201).json(motoRegistration);
    } catch (error) {
      this.next(error);
    }
  }
}