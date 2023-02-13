import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarsODM';

export default class CarService {
  private createCarDomain(car: ICar): Car {
    const domainCar = new Car(car);
    return domainCar;
  }

  public async registerNewCar(car: ICar) {
    const cardODM = new CarODM();
    const registerCar = await cardODM.create(car);
    return this.createCarDomain(registerCar);
  }
}