Parking Lot

This is a parking lot management system implemented in Node.js. It allows vehicles to be parked and unparked, calculates parking fees, and generates tickets and receipts.

Features

- Park a vehicle and generate a parking ticket.
- Unpark a vehicle and generate a parking receipt.
- Calculate the correct fees for a parked vehicle.
- Error handling for a full parking lot and an invalid ticket number.

Installation

1. Navigate to the project directory:

```
cd parking-lot
```

2. Install the dependencies:

```
npm install
```

3. Run the project:

```
cd ParkingLot
node app.js
```

Usage

The parking lot functionality is provided through the `ParkingLot` class. You can use the class methods to interact with the parking lot.

Example:

```javascript
const ParkingLot = require('./ParkingLot');

// Create a new parking lot with initial spot counts and fee model
const spotCounts = {
  Motorcycle: 10,
  Car: 20,
  Bus: 5,
};

const feeModel = {
  Airport: {
    Motorcycle: [[0, 60, 5], [60, 180, 10], [180, Infinity, 15]],
    Car: [[0, 60, 10], [60, 180, 15], [180, Infinity, 20]],
    Bus: [[0, 180, 20], [180, Infinity, 30]],
  },
  Stadium: {
    Motorcycle: [[0, 120, 10], [120, 240, 15], [240, Infinity, 20]],
    Car: [[0, 120, 15], [120, 240, 20], [240, Infinity, 25]],
    Bus: [[0, 240, 25], [240, Infinity, 35]],
  },
  Mall: {
    Motorcycle: [[0, 180, 15], [180, 360, 20], [360, Infinity, 25]],
    Car: [[0, 180, 20], [180, 360, 25], [360, Infinity, 30]],
    Bus: [[0, 360, 30], [360, Infinity, 40]],
  },
};

const parkingLot = new ParkingLot(spotCounts, feeModel);

// Park a vehicle and generate a ticket
const ticket = parkingLot.parkVehicle('Car', 'Airport');

// Unpark a vehicle and generate a receipt
const receipt = parkingLot.unparkVehicle(ticket.ticketNumber);

// Calculate the parking fee for a given duration
const hoursParked = 3;
const fee = parkingLot.calculateFees('Car', hoursParked, 'Airport');
```

API

**ParkingLot(spotCounts, feeModel)**

- spotCounts: The initial spot counts for each vehicle type.
- feeModel: The fee model for calculating parking fees.

**parkVehicle(vehicleType, location)**

Parks a vehicle in the parking lot and returns a ticket.

- vehicleType: The type of vehicle to be parked.
- location: The location where the vehicle is parked.

Returns the ticket information.

**unparkVehicle(ticketNumber)**

Unparks a vehicle from the parking lot and returns a receipt with fees.

- ticketNumber: The ticket number of the vehicle to be unparked.

Returns the receipt information.

**getAvailableSpots(location)**

Retrieves the available spots for each vehicle type at a specific location.

- location: The location to check available spots.

Returns the available spots for each vehicle type.

**calculateFees(vehicleType, duration, location)**

Calculates the parking fees for a vehicle based on the duration and

 location.

- vehicleType: The type of vehicle.
- duration: The duration of parking in minutes.
- location: The location of the parking lot.

Returns the calculated parking fees.

Testing

The project includes unit tests using the Mocha testing framework. To run the tests, use the following command:

```
npm test
```

Author

Uday Reddy
