import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class CarService {
  private createCarDomain(moto: IMotorcycle): Motorcycle {
    const domainCar = new Motorcycle(moto);
    return domainCar;
  }

  public async registerNewMoto(moto: IMotorcycle) {
    const motoODM = new MotorcycleODM();
    const registerMoto = await motoODM.create(moto);
    return this.createCarDomain(registerMoto);
  }

  public async getAllCars() {
    const carODM = new MotorcycleODM();
    const cars = await carODM.find();
    const allCars = cars.map((car) =>
      this.createCarDomain(car));
    return allCars;
  }

  public async getById(id: string) {
    const carODM = new MotorcycleODM();
    const carId = await carODM.findById(id);
    if (carId === undefined) return undefined;
    const allCars = carId.map((car) =>
      this.createCarDomain(car));
    return allCars;
  }

  public async update(id:string, obj: IMotorcycle) {
    const carODM = new MotorcycleODM();
    const carUpdated = await carODM.update(id, obj);
    if (carUpdated === null) return undefined;
    return this.createCarDomain(carUpdated);
  }
}