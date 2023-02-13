import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorCycleService from '../../../src/Services/MotorcicleService';
import Motorcycle from '../../../src/Domains/Motorcycle';

const mockMotos: IMotorcycle[] = [
  {
    id: '6348513f34c397abcad040b2',
    model: 'Honda',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  },
  {
    id: '6348513f34c397abcad040b5',
    model: 'Honda',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  },
];

describe('Testes da camada service', function () {
  afterEach(function () {
    sinon.restore();
  }); 

  it('Deveria registrar uma moto com SUCESSO', async function () {
    const motoInput: IMotorcycle = {
      model: 'Honda',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const motoOutput = new Motorcycle(
      {
        id: '6348513f34c397abcad040b2',
        model: 'Honda',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      },
    );
    sinon.stub(Model, 'create').resolves(motoOutput);

    const service = new MotorCycleService();
    const result = await service.registerNewMoto(motoInput);

    expect(result).to.be.deep.equal(motoOutput);
  });

  it('Deveria procurar todos as motos', async function () {
    const allMotos = [{
      id: '6348513f34c397abcad040b2',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    }];
    sinon.stub(Model, 'find').resolves(allMotos);

    const service = new MotorCycleService();
    const result = await service.getAllMotos();

    expect(result).to.be.deep.equal(allMotos);
  });

  it('Deveria procurar todos as motos por id', async function () {
    const id = '6348513f34c397abcad040b2';
    const out: Motorcycle = new Motorcycle({
      ...mockMotos[0],
    });

    sinon.stub(Model, 'find').resolves([mockMotos[0]]);

    const service = new MotorCycleService();
    const result = await service.getById(id);

    expect(result).to.be.deep.equal([out]);
  });

  it('Deveria procurar todos as motos por id errado e falhar', async function () {
    const id = '6348513f34c397abcad040b';

    sinon.stub(Model, 'find').resolves([]);

    const service = new MotorCycleService();
    const result = await service.getById(id);

    expect(result).to.be.deep.equal(undefined);
  });
});