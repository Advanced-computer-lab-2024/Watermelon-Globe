
# Watermelon Globe


🍉🌍 Your ultimate trip planner with a twist! Whether you're dreaming of sandy beaches or snowy peaks, we'll slice through the planning chaos and serve up your perfect itinerary—refreshing, sweet, and oh-so-juicy! Travel planning has never been this fruitful. 🚀✈️


![Watermelon Globe Logo](.\frontend\src\README\WatermelonLogo.jpg)


## Motivation

Because we had to. No, seriously. This project is the product of a group of ambitious students and the phrase: "It’s obligatory." We didn’t just wake up one day and say, “Hey, let’s build a virtual trip planner and name it after a fruit!”

But hey, when life hands you projects, you make… Watermelon Globe 🍉🌍. Our motivation? Passing the course, proving our worth as developers under pressure, and sprinkling in some humor to keep our sanity intact(quite literally).

So, while we didn’t exactly choose this journey, we’ve poured our hearts, souls, and countless late-night debugging sessions into creating something useful, fun, and slightly quirky. Enjoy the fruits of our labor (badum-tshh🥁). 



## Table of Contents

- [Build Status](#Build-Status)
- [Code Style](#Code-Style)
- [Website Screenshots](#Website-Screenshots)
- [Features](#Features)
- [Color Reference](#Color-Reference)
- [Usage/Examples](#Usage/Examples)
- [Installation](#Installation)
- [API Reference](#API-Reference)
- [Tests](#Tests)
- [How to use](#How-to-use)
- [Contribute](#Contribute)
- [Credits](#Credits)
- [License](#license)
## Build Status

The project is fully functional for all user roles, including admins, tourists, governors, tour guides, advertisers, etc. However, a few minor bugs may be encountered. Below is an overview of these issues and their respective solutions:

### Known Issues and Solutions

1. **Hotels Availability**

   - **Bug**: Hotels currently include only one option (JW Marriott).
   - **Solution**: More hotels will be added soon!

2. **Currency Exchange Rate**

   - **Bug**: EGP exchange rate was added manually as the API doesn’t provide it.
   - **Solution**: Make sure to include the manually added rate in any code involving currency changes.

3. **Empty Checkout Page**

   - **Bug**: If the user reaches the checkout page before the shopping cart page, the checkout will be empty.
   - **Solution**: Ensure the proper sequence: **Choose products → Add to cart → Proceed to checkout**.

4. **Hotel Booking with Past Dates**

   - **Bug**: An error occurs when booking hotels with a past date (expected behavior).
   - **Solution**: Always choose a present or future date to avoid errors.

5. **Filtering Activities and Itineraries**

   - **Bug**: The "amount" field always uses Americans dollars, even if a different currency is selected.
   - **Solution**: Use USD for filtering, and then change the currency after filtering to display prices in the chosen currency.

6.**products page bug**

   -**Issue**: The navigation bar in the products page is not functioning properly (currency change is not working)
### Summary

While the system is operational and supports all core functionalities, addressing these issues will further enhance the user experience. Stay tuned for updates!


## Code Style

No strict code style was used in the project,however, all of the developers used visual studio code as their IDE, github as the source control system and a unified mongo database between each other.

- [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?style=flat&logo=github&logoColor=white)](https://github.com)
- [![Visual Studio Code](https://img.shields.io/badge/VS%20Code-0078d7?style=flat&logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/)
- [![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com)



## Website Screenshots

![Postman5](.\frontend\src\README\register.png)

![Postman5](.\frontend\src\README\adminDashboard.png)

![Postman5](.\frontend\src\README\ProductsList.png)

![Postman5](.\frontend\src\README\Complaints.png)







## Tech/Framework used

Here are the technologies and frameworks used in this project, along with links to download or learn more about them:

- [**VS Code**](https://code.visualstudio.com/download): A powerful and lightweight code editor.  
  *Choose the version that suits your OS.*![Visual Studio Code](https://code.visualstudio.com/assets/favicon.ico)

-  [**Node.js**](https://nodejs.org/): A JavaScript runtime for building scalable applications.  ![Node.js](https://nodejs.org/static/images/logo.svg) 


-  [**Nodemon**](https://www.npmjs.com/package/nodemon): A tool to automatically restart the server after code changes.  


-  [**Express**](https://www.npmjs.com/package/express): A web application framework for Node.js.![Express.js](https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png)  


- [**Mongoose**](https://www.npmjs.com/package/mongoose): An ODM library for MongoDB and Node.js.![Mongoose](https://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png)   


- [**React**](https://react.dev/): A JavaScript library for building user interfaces.  ![React](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg) 


- [**Git**](https://git-scm.com/): A version control system to track code changes.  ![Git](https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png) 


- [**Axios**](https://www.npmjs.com/package/axios): A promise-based HTTP client for the browser and Node.js.  ![Axios](https://axios-http.com/assets/logo.svg) 


-[**MongoDB Atlas**](https://www.mongodb.com/atlas/database): A fully managed cloud database.   ![MongoDB](https://webassets.mongodb.com/_com_assets/cms/mongodb-logo-rgb-j6w271g1xn.jpg) 


- [**Postman**](https://www.postman.com/downloads/): A platform for API development and testing.  
  *Choose the version that suits your OS.*

## Features

Our app is designed to provide an exceptional travel experience with a wide range of useful features:

- **Customized Travel Planning**: Plan your trip according to your preferences, including historic sites, beaches, shopping, and budget-conscious options tailored to your needs.
- **Effortless Booking**: Secure your flights, hotels, and transportation directly through the app, all without any redirects—making the booking process fast and simple.
- **Smart Budget Management**: Receive suggestions for activities that fit your remaining budget after booking your flights and accommodations, with transportation costs included to keep everything within your financial plan.
- **Explore Hidden Local Treasures**: Discover curated activities, museums, historical landmarks, and more, complete with pricing and directions to enhance your travel journey.
- **Instant Alerts**: Stay in the loop with real-time notifications sent directly to your app and email about upcoming events and activities you’ve booked.
- **Guided Tours & Custom Itineraries**: Choose from expert-guided tours or create your own adventure with fully customizable itineraries and detailed activity suggestions.
- **In-App Souvenir Shop**: Don't miss the chance to browse our exclusive in-app gift shop, offering unique souvenirs and local items to commemorate your trip.

Whether you’re organizing your next escape or uncovering hidden gems during your travels, our app has everything you need to make your journey unforgettable. Begin your adventure today and experience the world like never before!

## Color Reference

| Color               | Hex                                                                 | Comments                                          |
| ------------------- | ------------------------------------------------------------------- | ------------------------------------------------ |
| Primary             | ![#e89bb5](https://via.placeholder.com/10/e89bb5?text=+) #e89bb5   | Used for buttons and links (PINK)               |
| Hover               | ![#f0a8bf](https://via.placeholder.com/10/f0a8bf?text=+) #f0a8bf   | Hover color for buttons (PINK HOVER)            |
| Secondary           | ![#91c297](https://via.placeholder.com/10/91c297?text=+) #91c297   | Used for header and main text (GREEN)           |
| Secondary Hover     | ![#a4d3a9](https://via.placeholder.com/10/a4d3a9?text=+) #a4d3a9   | Hover color for secondary elements (GREEN HOVER)|
| Dark Pink           | ![#d32e65](https://via.placeholder.com/10/d32e65?text=+) #d32e65   | Used for emphasis or danger elements (DARK PINK)|
| Dark Pink Hover     | ![#e63b73](https://via.placeholder.com/10/e63b73?text=+) #e63b73   | Hover color for dark pink elements              |
| Background          | ![#FCFCFC](https://via.placeholder.com/10/FCFCFC?text=+) #FCFCFC   | Background color for the main page              |
| Section Background  | ![#F6F6F6](https://via.placeholder.com/10/F6F6F6?text=+) #F6F6F6   | Background color for sections                   |
| Card Background     | ![#FFFFFF](https://via.placeholder.com/10/FFFFFF?text=+) #FFFFFF   | Background color for cards                      |

## Usage/Examples

These are some of the major and crucial code examples that sums the key features of the projects aim and purpose

### 1. Handle Booking Logic for an Itinerary
```typescript
// Function to handle booking logic for an itinerary
const handleBooking = async (e: React.FormEvent) => {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Check if payment method and itinerary are selected; prompt the user if not
  if (!paymentMethod || !itinerary) {
    alert('Please select a payment method before booking.');
    return;
  }

  // Check if a date and time are selected; prompt the user if not
  if (!selectedDate || !selectedTime) {
    alert('Please select a date and time.');
    return;
  }

  // Indicate that booking is in progress and reset any previous error state
  setBookingInProgress(true);
  setError(null);

  try {
    // Handle wallet payment option
    if (paymentMethod === 'wallet') {
      const walletResponse = await axios.put(`/api/Tourist/updateWallet/${id}`, {
        amount: -itinerary.priceOfTour,
      });

      if (walletResponse.data.wallet >= 0) {
        alert('Payment confirmed using Wallet!');

        await axios.post('/api/TouristItinerary/createChildItinerary', {
          itinerary: tripid,
          buyer: id,
          chosenDates: [selectedDate],
          chosenTimes: [selectedTime],
          totalPrice: itinerary.priceOfTour,
          status: 'pending',
        });

        await axios.put(`/api/Tourist/updateLoyaltyPoints/${id}`, {
          amountPaid: itinerary.priceOfTour,
        });

        alert('Itinerary booked successfully!');
      } else {
        await axios.put(`/api/Tourist/updateWallet/${id}`, {
          amount: +itinerary.priceOfTour,
        });
        alert('Insufficient wallet balance.');
      }
    } else if (paymentMethod === 'creditCard') {
      alert('Proceeding with credit card payment (Stripe)...');

      await axios.post('/api/TouristItinerary/createChildItinerary', {
        itinerary: tripid,
        buyer: id,
        chosenDates: [selectedDate],
        chosenTimes: [selectedTime],
        totalPrice: itinerary.priceOfTour,
        status: 'pending',
      });

      await axios.put(`/api/Tourist/updateLoyaltyPoints/${id}`, {
        amountPaid: itinerary.priceOfTour,
      });

      alert('Itinerary booked successfully!');
    }
  } catch (err) {
    console.error('Error during booking:', err);
    alert('An error occurred while processing the booking. Please try again later.');
  } finally {
    setBookingInProgress(false);
  }
};
```
### How it works:
 - Validates input fields like payment method, itinerary selection, date, and time, and prompts the user if any are missing.
 - Processes the payment using either the wallet or a credit card (Stripe).
 - If successful, creates a child itinerary and updates loyalty points.
 - Handles errors gracefully and resets the booking state.

### Usage:
Include this in your component to be able to book an itinerary

---
### 2. Handle Flights' Booking
```typescript
const handlePaymentAndBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const bookingResponse = await axios.post(`/api/Tourist/bookFlight/${touristId}`, {
        airline: flight.validatingAirlineCodes[0],
        flightNumber1: flight.itineraries[0]?.segments[0]?.carrierCode + flight.itineraries[0]?.segments[0]?.number,
        departure1: flight.itineraries[0]?.segments[0]?.departure?.at,
        arrival1: flight.itineraries[0]?.segments[0]?.arrival?.at,
        flightNumber2: flight.itineraries[0]?.segments[1]?.carrierCode + flight.itineraries[0]?.segments[1]?.number,
        departure2: flight.itineraries[0]?.segments[1]?.departure?.at,
        arrival2: flight.itineraries[0]?.segments[1]?.arrival?.at,
        price: flight.price?.grandTotal,
        currency: flight.price?.currency,
      });

      const bookingId = bookingResponse.data.booking._id;

      if (paymentMethod === 'wallet') {
        const walletPaymentResponse = await axios.put(`/api/Tourist/updateWallet/${touristId}`, {
          amount: -Number(flight.price?.grandTotal),
        });

        if (walletPaymentResponse.data.wallet >= flight.price?.grandTotal) {
          const loyaltyResponse = await axios.put(`/api/Tourist/updateLoyaltyPoints/${touristId}`, {
            amountPaid: flight.price?.grandTotal,
          });

          alert(`Flight booked successfully! Loyalty Points: ${loyaltyResponse.data.loyaltyPoints} Badge: ${loyaltyResponse.data.badge}`);
        } else {
          setMessage('Insufficient wallet balance.');
        }
      } else if (paymentMethod === 'stripe') {
        const paymentIntentResponse = await axios.post(`/api/Tourist/payFlight`, { bookingId });
        const { clientSecret } = paymentIntentResponse.data;

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) return;
        const paymentResult = await stripe.confirmCardPayment(clientSecret, { payment_method: { card: cardElement } });

        if (paymentResult.error) {
          await axios.delete(`/api/Tourist/deleteBooking/${bookingId}`);
          setMessage(`Payment failed: ${paymentResult.error.message}`);
          return;
        }

        if (paymentResult.paymentIntent?.status === 'succeeded') {
          const loyaltyResponse = await axios.put(`/api/Tourist/updateLoyaltyPoints/${touristId}`, {
            amountPaid: flight.price?.grandTotal,
          });

          alert(`Flight booked successfully! Loyalty Points: ${loyaltyResponse.data.loyaltyPoints} Badge: ${loyaltyResponse.data.badge}`);
        }
      }
    } catch (error) {
      console.error('Error during payment or booking:', error);
      setMessage(`Error: ${error.message}`);
    }
};
```
### How it works:
- Sends flight booking details (e.g., flight numbers, times, and price) to the server.
- Processes payment via wallet or Stripe, ensuring sufficient wallet balance or successful card payment.
- Updates loyalty points and provides a success message with rewards (e.g., points and badges).
- Rolls back the booking if payment fails and handles errors effectively.
### Usage:
Include this in your component to be able to book a flight

---
### 3. Handle Hotel Booking
```typescript
const handlePaymentAndBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const bookingResponse = await axios.post(`/api/Tourist/bookHotel/${touristId}`, {
        hotelId: hotel.id,
        roomType: hotel?.room?.description?.text,
        price: hotel?.price?.base,
        currency: hotel?.price?.currency,
        checkInDate: hotel?.checkInDate,
        checkOutDate: hotel?.checkOutDate,
      });

      const bookingId = bookingResponse.data.booking._id;

      if (paymentMethod === 'wallet') {
        const walletPaymentResponse = await axios.put(`/api/Tourist/updateWallet/${touristId}`, {
          amount: -Number(hotel?.price?.base),
        });

        if (walletPaymentResponse.data.wallet >= hotel?.price?.base) {
          const loyaltyResponse = await axios.put(`/api/Tourist/updateLoyaltyPoints/${touristId}`, {
            amountPaid: hotel?.price?.base,
          });

          alert(`Hotel booked successfully! Loyalty Points: ${loyaltyResponse.data.loyaltyPoints} Badge: ${loyaltyResponse.data.badge}`);
        } else {
          setMessage('Insufficient wallet balance.');
        }
      } else if (paymentMethod === 'stripe') {
        const paymentIntentResponse = await axios.post(`/api/Tourist/payHotel`, { bookingId });
        const { clientSecret } = paymentIntentResponse.data;

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) return;
        const paymentResult = await stripe.confirmCardPayment(clientSecret, { payment_method: { card: cardElement } });

        if (paymentResult.error) {
          await axios.delete(`/api/Tourist/deleteBooking/${bookingId}`);
          setMessage(`Payment failed: ${paymentResult.error.message}`);
          return;
        }

        if (paymentResult.paymentIntent?.status === 'succeeded') {
          const loyaltyResponse = await axios.put(`/api/Tourist/updateLoyaltyPoints/${touristId}`, {
            amountPaid: hotel?.price?.base,
          });

          alert(`Hotel booked successfully! Loyalty Points: ${loyaltyResponse.data.loyaltyPoints} Badge: ${loyaltyResponse.data.badge}`);
        }
      }
    } catch (error) {
      console.error('Error during payment or booking:', error);
      setMessage(`Error: ${error.message}`);
    }
};
```
### How it works:
- Sends hotel booking details (e.g., room type, price, and dates) to the server.
- Processes payment using the wallet or Stripe, validating - sufficient funds or successful payment.
- Updates loyalty points upon successful payment and confirms the booking.
- Cancels the booking and displays an error message if payment fails.

### Usage:
Include this in your component to be able to book in a hotel

---


### 4.Fetch My Bookings
This function retrieves all bookings made by the tourist for both itineraries and activities.

```javascript
useEffect(() => {
    const fetchBookings = async () => {
      try {
        const itineraryResponse = await axios.get<Booking[]>(`/api/Tourist/BookedItineraries/${id}`);
        const activityResponse = await axios.get<Activity[]>(`/api/Tourist/BookedActivities/${id}`);
        setItineraryBookings(itineraryResponse.data);
        setActivities(activityResponse.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (id) {
      fetchBookings();
    }
  }, [id]);
```

### How it works:
- Sends GET requests to fetch booked itineraries and activities for the given `id`.
- Updates the respective state variables with the data returned from the server.
- Handles errors gracefully and ensures loading state is updated.

### Usage:
Include this in your component to automatically fetch bookings when the `id` changes.

---

### 5.Add to Cart
This function allows tourists to add products to their cart.

```javascript
const handleAddToCart = async (productId) => {
    try {
      const quantity = 1;
      const response = await axios.post(`/api/Tourist/addProductToCart/${id}`, { productId, quantity });

      if (response.status === 200) {
        // Temporarily change the button text to "Added to Cart"
        setAddedToCart(prevState => ({ ...prevState, [productId]: true }));

        // Reset the button text back to "Add to Cart" after 3 seconds
        setTimeout(() => {
          setAddedToCart(prevState => ({ ...prevState, [productId]: false }));
        }, 3000);

        console.log('Item added to cart!');
      } else {
        alert('Failed to add product to cart. Please try again.');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('An error occurred while adding product to cart. Please try again.');
    }
  };
```

### How it works:
- Sends a POST request to add a product to the cart with the provided `productId` and a default quantity of 1.
- Provides visual feedback by temporarily changing the button text to "Added to Cart" for 3 seconds.
- Logs a success message or displays an alert in case of an error.

### Usage:
Call this function when a tourist clicks on the "Add to Cart" button for a product.

---










## Installation

Follow these steps to set up the project environment and start the backend and frontend applications:

### Prerequisites

Make sure you have the following installed on your system:

- **Visual Studio Code**  
  Download and install from [here](https://code.visualstudio.com/download). Choose the version that suits your OS.

- **Node.js**  
  Download and install from [here](http://nodejs.org/). Choose the version that suits your OS.

- **MongoDB Atlas**  
  Sign up and create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas/database).  
  Refer to [this video tutorial](https://www.youtube.com/watch?v=s0anSjEeua8&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=4):  
    - **1:00 - 2:40**: Learn how to set up MongoDB Atlas.  
    - **3:20 - 6:10**: Learn how to connect to MongoDB Atlas in your code.

- **Postman**  
  Download and install from [here](https://www.postman.com/downloads). Choose the version that suits your OS.

### Installing Dependencies

Ensure the following packages are installed:

- **Nodemon**  
  Install globally to monitor backend changes:  
  ```bash
  npm install -g nodemon
  ```

- **Express**  
  Backend framework:  
  ```bash
  npm install express
  ```

- **Mongoose**  
  MongoDB ODM for Node.js:  
  ```bash
  npm install mongoose
  ```

- **React**  
  Frontend library:  
  ```bash
  npm install react
  ```

- **Axios**  
  HTTP client for API calls:  
  ```bash
  npm install axios
  ```


## API Reference

This project utilizes the Amadeus API for fetching hotel and flight data and Stripe API for credit card payment. Below are the details of the API endpoints and their usage:

#### Get Access Token

- **Endpoint**: `https://test.api.amadeus.com/v1/security/oauth2/token`

```http
  POST /v1/security/oauth2/token
```

| Parameter      | Type     | Description                                     |
| :------------- | :------- | :---------------------------------------------- |
| `client_id`    | `string` | **Required**. Your Amadeus client ID.           |
| `client_secret`| `string` | **Required**. Your Amadeus client secret.       |
| `grant_type`   | `string` | **Required**. Always set to `client_credentials`.|

#### Get Hotel IDs by City

- **Endpoint**: `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city`
```http
  GET /v1/reference-data/locations/hotels/by-city
```

| Parameter      | Type     | Description                                        |
| :------------- | :------- | :------------------------------------------------- |
| `cityCode`     | `string` | **Required**. The IATA city code (e.g., `PAR` for Paris). |
| `radius`       | `number` | **Optional**. The search radius in kilometers (default: `5`). |
| `radiusUnit`   | `string` | **Optional**. The unit for the radius (default: `KM`). |
| `hotelSource`  | `string` | **Optional**. The source of hotels to search (default: `ALL`). |

#### Get Hotel Offers by Hotel ID

- **Endpoint**: `https://test.api.amadeus.com/v3/shopping/hotel-offers`
```http
  GET /v3/shopping/hotel-offers
```

| Parameter      | Type     | Description                                        |
| :------------- | :------- | :------------------------------------------------- |
| `hotelIds`     | `string` | **Required**. A comma-separated list of hotel IDs. |
| `checkInDate`  | `string` | **Required**. The check-in date (format: `YYYY-MM-DD`). |
| `checkOutDate` | `string` | **Required**. The check-out date (format: `YYYY-MM-DD`). |
| `adults`       | `number` | **Optional**. The number of adults (default: `1`). |
| `roomQuantity` | `number` | **Optional**. The number of rooms (default: `1`). |
| `currency`     | `string` | **Optional**. The currency for the price display (default: `USD`). |
| `priceRange`   | `string` | **Optional**. The price range for filtering offers. |
| `rating`       | `number` | **Optional**. The minimum rating for filtering hotels. |

#### Search Flights

- **Endpoint**: `https://test.api.amadeus.com/v2/shopping/flight-offers`
```http
  GET /v2/shopping/flight-offers
```

| Parameter              | Type     | Description                                       |
| :--------------------- | :------- | :------------------------------------------------ |
| `originLocationCode`    | `string` | **Required**. IATA code for the origin airport.   |
| `destinationLocationCode` | `string` | **Required**. IATA code for the destination airport. |
| `departureDate`        | `string` | **Required**. The departure date (format: `YYYY-MM-DD`). |
| `adults`               | `number` | **Optional**. The number of adults (default: `1`). |
| `returnDate`           | `string` | **Optional**. The return date (format: `YYYY-MM-DD`). |
| `children`             | `number` | **Optional**. The number of children traveling.   |
| `infants`              | `number` | **Optional**. The number of infants traveling.    |
| `travelClass`          | `string` | **Optional**. The travel class (e.g., `ECONOMY`, `BUSINESS`). |
| `nonStop`              | `boolean` | **Optional**. If `true`, only non-stop flights are returned (default: `false`). |
| `maxPrice`             | `number` | **Optional**. The maximum price for the flight.   |
| `max`                  | `number` | **Optional**. The maximum number of flight results to return (default: `250`). |


#### Pay for Flight with Stripe (encrypted)


```http
POST /api/Tourist/payFlight
```

| Parameter       | Type     | Description                                                     |
| :-------------- | :------- | :-------------------------------------------------------------- |
| `bookingId`     | `string` | **Required**. The booking ID for the flight                      |


## Tests

The following tests are included in the project to ensure the functionality of key features. Each test has a corresponding proof image stored within the repository:

1. **Add Product to Cart**: 
   - **Function**: Verifies that a product is successfully added to the shopping cart.
   - **Proof**: ![Postman5](.\frontend\src\README\Postman5.png)
   
2. **Getting Access Token**: 
   - **Function**: Ensures that an access token is successfully retrieved for authenticated API requests.
   - **Proof**: ![Postman6](.\frontend\src\README\Postman6.png)

3. **Updating a Completed Itinerary Rating**: 
   - **Function**: Confirms that the rating for a completed itinerary can be successfully updated.
   - **Proof**: ![Postman7](.\frontend\src\README\Postman7.png)

4. **Using the Token to Get Data via API**: 
   - **Function**: Verifies that the API can be accessed using the obtained access token and returns the expected data.
   - **Proof**: ![Postman8](.\frontend\src\README\Postman8.png)

5. **Update Wallet**: 
   - **Function**: Ensures that the user’s wallet balance is updated correctly after transactions.
   - **Proof**: ![Postman9](.\frontend\src\README\Postman9.png)







## How to Use


Follow these steps to set up the project environment and start the backend and frontend applications:

### Prerequisites

make sure you have downloaded every instance in the [installation section](#Installation)

### Starting the Backend

1. Ensure MongoDB is connected by configuring your `.env` file with your MongoDB Atlas URI.
2. Start the backend server:
   ```bash
   nodemon app.js
   ```

---

### Starting the Frontend

1. Navigate to the React app folder (frontend).
2. Start the React app:
   ```bash
   npm start
   ```

---

Your backend will run at `http://localhost:8000` (or the port you configure), and the frontend will run at `http://localhost:3000`.


## Contribute

We welcome contributions from everyone! Whether you're fixing a typo, adding a new feature, or optimizing our code, your help is appreciated. Here's how you can contribute:

1. **Fork** the repository
2. **Clone** your fork
3. **Create** a new branch for your feature or fix
4. **Make changes** and write tests
5. **Submit** a Pull Request with a clear description of your changes

### Want to support the Team?

Perfect! Our team is *very* excited about the chance of securing a job, and we may or may not(*wink wink*)be running on caffeine and hope. If you want to contribute in a more permanent way, drop us a line(or a job-interview). We might just need your amazing skills (and your willingness to help keep our team from turning into a coffee-drinking zombie crew)!


## Credits

Credits
We would like to extend a huge thank you to the following sources for their resources and inspiration:

 - **Unsplash** – For providing beautiful, high-quality images that enhanced our project.
 - **Dribbble** – For the fantastic design inspirations that guided our visual elements.
 - **YouTube Playlist**: Learn Full Stack Web Development – A series of tutorials that helped shape the backend of our project.
 - **YouTube Video**: Full Stack Development Tutorial – A great resource for understanding core web development concepts.
 - **Mr. ChatGPT** – For providing endless guidance, support, and clever solutions. You rock!
 - **The Amazing and Helpful Engineer Nada Ibrahim (Top el Top)** – For being an incredible mentor and offering invaluable assistance throughout the project.
 
Thank you all for contributing to the open-source community!


## Licenses

This project uses the following licenses:

- **MIT**

- **BSD-2-Clause**

- **Apache 2.0**

