MPESA STK Push Service
This project implements a Node.js application for Safaricom MPESA STK Push functionality. Developed by Eng. Johnson Mwangi, it allows users to make payments directly from their mobile phones using Safaricom's MPESA API.

Features
🌟 Token Generation: Securely generates access tokens using the MPESA Consumer Key and Secret.
📲 STK Push: Initiates an STK Push request to the user's mobile phone for seamless payment.
🔔 Callback Handling: Processes payment notifications via a designated callback URL.
🌐 Environment Variables Logging: Ensures all necessary configurations are correctly set.
Prerequisites
Before running the application, ensure you have the following:

Node.js and npm: Installed on your machine.
MPESA Sandbox Credentials: Obtain the following from the Safaricom Developer Portal:
Consumer Key
Consumer Secret
Paybill/Shortcode
Passkey
.env File: Create a .env file in the root of your project and include these variables:
plaintext
Copy code
PORT=8000
MPESA_PAYBILL=YOUR_PAYBILL_NUMBER
PASSKEY=YOUR_PASSKEY
MPESA_CONSUMER_KEY=YOUR_CONSUMER_KEY
MPESA_CONSUMER_SECRET=YOUR_CONSUMER_SECRET
CALLBACK_URL=https://your-server/callback
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/mpesa-stk-push.git
cd mpesa-stk-push
Install dependencies:

bash
Copy code
npm install
Configure the .env file as described in the Prerequisites section.

Start the application:

bash
Copy code
npm start
Endpoints
1. Home
GET /
Returns a welcome message indicating the server is running.
2. Generate Token
GET /token
Generates and returns an MPESA access token.
3. STK Push
POST /stk
Initiates an MPESA STK Push request.
Request Body:
json
Copy code
{
  "phone": "254712345678",
  "amount": 100
}
Response:
json
Copy code
{
  "message": "📲 STK Push sent successfully! Check your phone to proceed. 😊",
  "data": {
    // Safaricom's STK Push API response
  }
}
4. Callback
POST /callback
Handles payment notifications from Safaricom.
Debugging
Environment Variables: Logs all required variables on server startup for troubleshooting.
STK Push Debugging: Provides detailed logs for each STK Push request, including the timestamp, password, and payload data.
Common Issues
Invalid Timestamp: Ensure the Timestamp field is formatted as yyyyMMddHHmmss.
Missing Environment Variables: Verify that all required fields in the .env file are correctly set.
Token Generation Errors: Ensure the MPESA Consumer Key and Secret are valid.
Future Improvements
Add authentication and rate limiting for endpoints.
Implement production environment configurations for enhanced security.
Develop a front-end interface for users to interact with the service.
About the Developer
This application was developed by Eng. Johnson Mwangi. If you have any questions or feedback, feel free to reach out via email:

📧 johnsonthuraniramwangi@gmail.com

License
This project is open-source and licensed under the MIT License. Contributions are welcome! 🎉

Happy Coding! 🚀