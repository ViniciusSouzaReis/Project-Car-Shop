import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

describe('Testes da camada service', function () {
  it('Deveria registrar um carro com SUCESSO', async function () {
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carOutput = new Car(
      {
        id: '63ea9a8c01000ca6dad99a31',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
    );
    sinon.stub(Model, 'create').resolves(carOutput);

    const service = new CarService();
    const result = await service.registerNewCar(carInput);

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Deveria procurar todos os carros', async function () {
    const allCars = [{
      id: '63ea9a8c01000ca6dad99a31',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    }];
    sinon.stub(Model, 'find').resolves(allCars);

    const service = new CarService();
    const result = await service.getAllCars();

    expect(result).to.be.deep.equal(allCars);
  });

  it('Deveria procurar todos os carros por id', async function () {
    const carId = [{
      id: '63ea9a8c01000ca6dad99a31',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    }];
    sinon.stub(Model, 'findById').resolves(carId);

    const service = new CarService();
    const result = await service.getById('63ea9a8c01000ca6dad99a31');

    expect(result).to.be.deep.equal(carId);
  });

  it('Deveria lancar erro por carro nao encontrado', async function () {
    sinon.stub(Model, 'findById').resolves([]);
    const service = new CarService();
    const result = await service.getById('63ea9a8c01000ca6dad99a32');
    
    expect(result).to.be.deep.equal([]);
  });
});