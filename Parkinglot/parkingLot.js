class ParkingLot {
  /**
   * Constructs a ParkingLot object.
   * @param {Object} spotCounts - The initial spot counts for each vehicle type.
   * @param {Object} feeModel - The fee model for calculating parking fees.
   */
  constructor(spotCounts, feeModel) {
    this.spots = {
      Motorcycle: spotCounts.Motorcycle || 0,
      Car: spotCounts.Car || 0,
      Bus: spotCounts.Bus || 0,
    };
    this.feeModel = feeModel;
    this.vehicles = {};
  }

  /**
   * Parks a vehicle in the parking lot and returns a ticket.
   * @param {string} vehicleType - The type of vehicle to be parked.
   * @param {string} location - The location where the vehicle is parked.
   * @returns {Object} The ticket information.
   * @throws {Error} If the vehicle type is invalid or no available spots for the vehicle type.
   */
  parkVehicle(vehicleType, location) {
    if (!this.spots.hasOwnProperty(vehicleType)) {
      throw new Error('Invalid vehicle type');
    }

    if (this.spots[vehicleType] === 0) {
      throw new Error(`No available spots for ${vehicleType}`);
    }

    const ticketNumber = this.generateTicketNumber();
    const spotNumber = this.assignSpot(vehicleType);

    const entryDateTime = new Date();
    this.vehicles[ticketNumber] = {
      vehicleType,
      spotNumber,
      entryDateTime,
      location,
    };

    return {
      ticketNumber,
      spotNumber,
      entryDateTime,
    };
  }

  /**
   * Unparks a vehicle from the parking lot and returns a receipt with fees.
   * @param {string} ticketNumber - The ticket number of the vehicle to be unparked.
   * @returns {Object} The receipt information.
   * @throws {Error} If the ticket number is invalid.
   */
  unparkVehicle(ticketNumber) {
    if (!this.vehicles.hasOwnProperty(ticketNumber)) {
      throw new Error('Invalid ticket number');
    }

    const vehicle = this.vehicles[ticketNumber];
    const { vehicleType, spotNumber, entryDateTime, location } = vehicle;

    const exitDateTime = new Date();
    const duration = Math.ceil((exitDateTime - entryDateTime) / (1000 * 60)); // Duration in minutes

    const fees = this.calculateFees(vehicleType, duration, location);
    delete this.vehicles[ticketNumber];
    this.releaseSpot(vehicleType);

    return {
      receiptNumber: this.generateReceiptNumber(),
      ticketNumber,
      spotNumber,
      entryDateTime,
      exitDateTime,
      fees,
    };
  }

  /**
   * Retrieves the available spots for each vehicle type.
   * @param {string} location - The location to check available spots.
   * @returns {Object} The available spots for each vehicle type.
   */
  getAvailableSpots(location) {
    const availableSpots = {};
    for (const vehicleType in this.spots) {
      if (this.spots.hasOwnProperty(vehicleType)) {
        const spotCount = this.spots[vehicleType];
        availableSpots[vehicleType] = spotCount;
      }
    }
    return availableSpots;
  }

  /**
   * Generates a random ticket number.
   * @returns {string} The generated ticket number.
   */
  generateTicketNumber() {
    return this.generateRandomId();
  }

  /**
   * Generates a random receipt number.
   * @returns {string} The generated receipt number.
   */
  generateReceiptNumber() {
    return this.generateRandomId();
  }

  /**
   * Generates a random alphanumeric ID.
   * @returns {string} The generated ID.
   */
  generateRandomId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   * Assigns a spot for the vehicle type.
   * @param {string} vehicleType - The type of vehicle.
   * @returns {number} The assigned spot number.
   */
  assignSpot(vehicleType) {
    this.spots[vehicleType]--;
    return this.spots[vehicleType] + 1;
  }

  /**
   * Releases a spot for the vehicle type.
   * @param {string} vehicleType - The type of vehicle.
   */
  releaseSpot(vehicleType) {
    this.spots[vehicleType]++;
  }

  /**
   * Calculates the parking fees for a vehicle based on the duration and location.
   * @param {string} vehicleType - The type of vehicle.
   * @param {number} duration - The duration of parking in minutes.
   * @param {string} location - The location of the parking lot.
   * @returns {number} The calculated parking fees.
   * @throws {Error} If no fee model available for the vehicle type at the location.
   */
  calculateFees(vehicleType, duration, location) {
    if (!this.feeModel.hasOwnProperty(location) || !this.feeModel[location].hasOwnProperty(vehicleType)) {
      throw new Error(`No fee model available for ${vehicleType} at ${location}`);
    }

    const feeIntervals = this.feeModel[location][vehicleType];
    let fees = 0;

    for (const interval of feeIntervals) {
      const [start, end, fee] = interval;
      if (duration >= start && duration < end) {
        fees += fee;
      }
    }

    return fees;
  }
}

module.exports = ParkingLot;
