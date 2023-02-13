import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarsODM';

export default class CarService {
  private createCarDomain(car: ICar): Car {
    const domainCar = new Car(car);
    return domainCar;
  }

  public async registerNewCar(car: ICar) {
    const carODM = new CarODM();
    const registerCar = await carODM.create(car);
    return this.createCarDomain(registerCar);
  }

  public async getAllCars() {
    const carODM = new CarODM();
    const cars = await carODM.find();
    const allCars = cars.map((car) =>
      this.createCarDomain(car));
    return allCars;
  }

  public async getById(id: string) {
    const carODM = new CarODM();
    const carId = await carODM.carFindById(id);
    if (carId === undefined) return undefined;
    const allCars = carId.map((car) =>
      this.createCarDomain(car));
    return allCars;
  }
}