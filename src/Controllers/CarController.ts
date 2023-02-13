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

  public async update() {
    const {
      model,
      year,
      color,
      status,
      buyValue,
      doorsQty,
      seatsQty,
    } = this.req.body;

    const { id } = this.req.params;

    let checkStatus = true;

    if (!status) {
      checkStatus = false;
    }

    try {
      const obj: ICar = {
        model,
        year,
        color,
        status: checkStatus,
        buyValue,
        doorsQty,
        seatsQty,
      };
      const updateCar = await this.service.update(id, obj);
      if (updateCar === undefined) return this.res.status(404).json({ message: 'Car not found' });
      return this.res.status(200).json(updateCar);
    } catch (error) {
      this.res.status(422).json({ message: 'Invalid mongo id' });
    }
  }

  public async getAllCars() {
    try {
      const allCars = await this.service.getAllCars();
      return this.res.status(200).json(allCars);
    } catch (error) {
      this.next(error);
    }
  }

  public async getCarById() {
    const { id } = this.req.params;
    try {
      const findById = await this.service.getById(id);
      if (!findById) return this.res.status(422).json({ message: 'Invalid mongo id' });
      if (findById.length === 0) return this.res.status(404).json({ message: 'Car not found' });
      return this.res.status(200).json(findById[0]);
    } catch (error) {
      this.next(error);
    }
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