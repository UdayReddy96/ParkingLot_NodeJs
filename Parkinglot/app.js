const readline = require('readline');
const ParkingLot = require('./parkingLot');

// Initialize the parking lot with spot counts and fee models
const spotCounts = {
  Motorcycle: 50,
  Car: 100,
  Bus: 20,
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

// Create an instance of the ParkingLot class
const parkingLot = new ParkingLot(spotCounts, feeModel);

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to display the menu options
function displayMenu() {
  console.log('\nMenu:');
  console.log('1. Park Vehicle');
  console.log('2. Unpark Vehicle');
  console.log('3. Check Available Spots');
  console.log('4. Exit');
  console.log('----------------------');
}

// Function to process user input
function processInput(option) {
  switch (option) {
    case '1': {
      // Park Vehicle
      rl.question('Enter vehicle type (Motorcycle, Car, Bus): ', (vehicleType) => {
        rl.question('Enter location (Airport, Stadium, Mall): ', (location) => {
          try {
            const ticket = parkingLot.parkVehicle(vehicleType, location);
            console.log('Vehicle parked. Ticket:', ticket);
          } catch (error) {
            console.log('Error:', error.message);
          }
          displayMenu();
        });
      });
      break;
    }
    case '2': {
      // Unpark Vehicle
      rl.question('Enter ticket number: ', (ticketNumber) => {
        try {
          const receipt = parkingLot.unparkVehicle(ticketNumber);
          console.log('Vehicle unparked. Receipt:', receipt);
        } catch (error) {
          console.log('Error:', error.message);
        }
        displayMenu();
      });
      break;
    }
    case '3': {
      // Check Available Spots
      rl.question('Enter location (Airport, Stadium, Mall): ', (location) => {
        const availableSpots = parkingLot.getAvailableSpots(location);
        console.log('Available spots at', location + ':', availableSpots);
        displayMenu();
      });
      break;
    }
    case '4': {
      // Exit
      rl.close();
      break;
    }
    default: {
      console.log('Invalid option. Please try again.');
      displayMenu();
      break;
    }
  }
}

// Display the initial menu
displayMenu();

// Start the input processing loop
rl.on('line', (input) => {
  processInput(input.trim());
}).on('close', () => {
  console.log('Exiting the application...');
  process.exit(0);
});
