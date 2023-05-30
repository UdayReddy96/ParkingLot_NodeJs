const { expect } = require('chai');
const ParkingLot = require('../parkingLot');

describe('ParkingLot', () => {
  let parkingLot;

  beforeEach(() => {
    // Create a new instance of ParkingLot before each test
    const spotCounts = {
      Motorcycle: 100,
      Car: 80,
      Bus: 40,
    };

    const feeModel = {
      Mall: {
        Motorcycle: [[0, Infinity, 10]],
        Car: [[0, Infinity, 20]],
        Bus: [[0, Infinity, 50]],
      },
      Stadium: {
        Motorcycle: [
          [0, 4 * 60, 30],
          [4 * 60, 12 * 60, 60],
          [12 * 60, Infinity, 100],
        ],
        Car: [
          [0, 4 * 60, 60],
          [4 * 60, 12 * 60, 120],
          [12 * 60, Infinity, 200],
        ],
      },
      Airport: {
        Motorcycle: [
          [0, 60, 0],
          [60, 8 * 60, 40],
          [8 * 60, 24 * 60, 60],
          [24 * 60, Infinity, 80],
        ],
        Car: [
          [0, 12 * 60, 60],
          [12 * 60, 24 * 60, 80],
          [24 * 60, Infinity, 100],
        ],
      },
    };

    parkingLot = new ParkingLot(spotCounts, feeModel.Mall);
  });

  describe('parkVehicle', () => {
    it('should park a Motorcycle and return a ticket', () => {
      const ticket = parkingLot.parkVehicle('Motorcycle', 'Mall');

      expect(ticket).to.have.property('ticketNumber');
      expect(ticket).to.have.property('spotNumber');
      expect(ticket).to.have.property('entryDateTime');
    });

    it('should park a Car and return a ticket', () => {
      const ticket = parkingLot.parkVehicle('Car', 'Mall');

      expect(ticket).to.have.property('ticketNumber');
      expect(ticket).to.have.property('spotNumber');
      expect(ticket).to.have.property('entryDateTime');
    });

    it('should park a Bus and return a ticket', () => {
      const ticket = parkingLot.parkVehicle('Bus', 'Mall');

      expect(ticket).to.have.property('ticketNumber');
      expect(ticket).to.have.property('spotNumber');
      expect(ticket).to.have.property('entryDateTime');
    });

    it('should park a Bus and return a ticket for Stadium', () => {
      const ticket = parkingLot.parkVehicle('Bus', 'Stadium');

      expect(ticket).to.have.property('ticketNumber');
      expect(ticket).to.have.property('spotNumber');
      expect(ticket).to.have.property('entryDateTime');
    });

    it('should park a Car and return a ticket for Stadium', () => {
      const ticket = parkingLot.parkVehicle('Bus', 'Stadium');

      expect(ticket).to.have.property('ticketNumber');
      expect(ticket).to.have.property('spotNumber');
      expect(ticket).to.have.property('entryDateTime');
    });

    it('should park a Bus and return a ticket for Airport', () => {
      const ticket = parkingLot.parkVehicle('Bus', 'Airport');

      expect(ticket).to.have.property('ticketNumber');
      expect(ticket).to.have.property('spotNumber');
      expect(ticket).to.have.property('entryDateTime');
    });

    it('should park a Car and return a ticket for Airport', () => {
      const ticket = parkingLot.parkVehicle('Bus', 'Airport');

      expect(ticket).to.have.property('ticketNumber');
      expect(ticket).to.have.property('spotNumber');
      expect(ticket).to.have.property('entryDateTime');
    });

    it('should throw an error for an invalid vehicle type', () => {
      expect(() => parkingLot.parkVehicle('SUV', 'Mall')).to.throw('Invalid vehicle type');
    });

    it('should throw an error when no available spots for the vehicle type', () => {
      parkingLot.spots.Motorcycle = 0;

      expect(() => parkingLot.parkVehicle('Motorcycle', 'Mall')).to.throw('No available spots for Motorcycle');
    });
  });

  describe('unparkVehicle', () => {
    // it('should unpark a vehicle and return a receipt', () => {
    //   const ticket = parkingLot.parkVehicle('Car', 'Mall');
    //   const receipt = parkingLot.unparkVehicle(ticket.ticketNumber);

    //   expect(receipt).to.have.property('receiptNumber');
    //   expect(receipt).to.have.property('ticketNumber');
    //   expect(receipt).to.have.property('spotNumber');
    //   expect(receipt).to.have.property('entryDateTime');
    //   expect(receipt).to.have.property('exitDateTime');
    //   expect(receipt).to.have.property('fees');
    // });

    it('should throw an error for an invalid ticket number', () => {
      expect(() => parkingLot.unparkVehicle('123456')).to.throw('Invalid ticket number');
    });
  });
});
