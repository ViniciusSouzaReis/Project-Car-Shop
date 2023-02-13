import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorCycleService {
  private createMotoDomain(moto: IMotorcycle): Motorcycle {
    const domainCar = new Motorcycle(moto);
    return domainCar;
  }

  public async registerNewMoto(moto: IMotorcycle) {
    const motoODM = new MotorcycleODM();
    const registerMoto = await motoODM.create(moto);
    return this.createMotoDomain(registerMoto);
  }

  public async getAllMotos() {
    const motoODM = new MotorcycleODM();
    const motos = await motoODM.find();
    const allMotos = motos.map((moto) =>
      this.createMotoDomain(moto));
    return allMotos;
  }

  public async getById(id: string) {
    const motoODM = new MotorcycleODM();
    const motoID = await motoODM.findById(id);
    if (motoID === undefined) return undefined;
    const allMotos = motoID.map((moto) =>
      this.createMotoDomain(moto));
    return allMotos;
  }

  public async update(id:string, obj: IMotorcycle) {
    const motoODM = new MotorcycleODM();
    const motoUpdated = await motoODM.update(id, obj);
    if (motoUpdated === null) return undefined;
    return this.createMotoDomain(motoUpdated);
  }
}