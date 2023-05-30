Parking Lot
This is a parking lot management system implemented in Node.js. It allows vehicles to be parked and unparked, calculates parking fees, and generates tickets and receipts.

Features
Park a vehicle and generate a parking ticket.
Unpark a vehicle and generate a parking receipt.
Calculate the correct fees for a parked vehicle.
Error handling for full parking lot and invalid ticket number.

Installation:
Navigate to the project directory:

cd parking-lot
Install the dependencies:

npm install

Run the project:

> cd ParkingLot
> node app.js

Usage
The parking lot functionality is provided through the ParkingLot class. You can use the class methods to interact with the parking lot.

Usage:-

javascript:

const { ParkingLot } = require('./parkingLot');

// Create a new parking lot with 10 spots and a rate of $2 per hour
const parkingLot = new ParkingLot(10, 2);

// Park a vehicle and generate a ticket
const ticketNumber = parkingLot.park('ABC123');

// Unpark a vehicle and generate a receipt
const vehicleNumber = parkingLot.unpark(ticketNumber);

// Calculate the parking fee for a given number of hours
const hoursParked = 3;
const fee = parkingLot.calculateFee(hoursParked);
API
ParkingLot(totalSpots, rate)
totalSpots: The total number of parking spots in the lot.
rate: The hourly parking rate.
park(vehicleNumber)
Parks a vehicle in the parking lot and generates a ticket.

vehicleNumber: The number or identifier of the vehicle.
Returns the generated ticket number.

unpark(ticketNumber)
Unparks a vehicle from the parking lot and generates a receipt.

ticketNumber: The ticket number generated when the vehicle was parked.
Returns the vehicle number.

calculateFee(hoursParked)
Calculates the parking fee for a vehicle based on the number of hours parked.

hoursParked: The number of hours the vehicle was parked.
Returns the calculated fee.

Testing
The project includes unit tests using the Mocha testing framework. To run the tests, use the following command:

command to run test cases:
npm test

Author
Uday Reddy