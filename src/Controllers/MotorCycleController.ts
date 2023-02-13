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

  public async getAllMotos() {
    try {
      const allMotos = await this.service.getAllMotos();
      return this.res.status(200).json(allMotos);
    } catch (error) {
      this.next(error);
    }
  }

  public async getMotoById() {
    const { id } = this.req.params;
    try {
      const findById = await this.service.getById(id);
      if (!findById) return this.res.status(422).json({ message: 'Invalid mongo id' });
      if (findById.length === 0) {
        return this.res
          .status(404).json({ message: 'Motorcycle not found' });
      }
      return this.res.status(200).json(findById[0]);
    } catch (error) {
      this.next(error);
    }
  }
}