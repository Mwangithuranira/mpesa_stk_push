# 🌟 MPESA STK Push Service 🌟

Welcome to the **MPESA STK Push Service**! This Node.js application provides seamless integration with Safaricom's MPESA API, allowing users to make payments directly from their mobile phones. Developed with ❤️ by **Eng. Johnson Mwangi**.

---

## 🚀 Features

- **Secure Token Generation**: Automatically generates access tokens for MPESA API authentication.
- **STK Push Payments**: Sends an STK Push request to users for instant payment authorization.
- **Payment Callback Handling**: Handles notifications for completed payments.
- **Environment Variable Logging**: Ensures all required configurations are correctly set for smooth operation.

---

## 📋 Prerequisites

Before running this application, ensure you have:

1. **Node.js and npm**: Installed on your local machine.
2. **MPESA Sandbox Credentials**: Get the following from [Safaricom Developer Portal](https://developer.safaricom.co.ke/):
   - Consumer Key
   - Consumer Secret
   - Paybill/Shortcode
   - Passkey
3. **.env File**: Create a `.env` file in the project root and add the following:
   ```plaintext
   PORT=8000
   MPESA_PAYBILL=YOUR_PAYBILL_NUMBER
   PASSKEY=YOUR_PASSKEY
   MPESA_CONSUMER_KEY=YOUR_CONSUMER_KEY
   MPESA_CONSUMER_SECRET=YOUR_CONSUMER_SECRET
   CALLBACK_URL=https://your-server/callback
🛠️ Installation
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

🌐 API Endpoints

1. Home
GET /
Returns a friendly message confirming the server is running.

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
Handles notifications from Safaricom about payment status.


📖 How It Works
Token Generation: Authenticates with Safaricom's API using your credentials to get an access token.

STK Push: Uses the token to send a payment request to the user’s phone.


Callback Handling: Listens for a response from Safaricom about the transaction status.
🐞 Debugging
Environment Variables: Logs all variables at startup to ensure proper setup.


Request Debugging: Logs complete details for each STK Push request, including the payload and timestamp.

Common Issues:
Invalid Timestamp: Ensure Timestamp is formatted as yyyyMMddHHmmss.


Token Generation Errors: Verify your Consumer Key and Secret.



✨ Developer Notes


This project was crafted with care by Eng. Johnson Mwangi. For inquiries or support, please feel free to contact me:

📧 Email: johnsonthuraniramwangi@gmail.com

🛠️ Future Enhancements

🔒 Implement authentication and rate limiting.

🌍 Add production environment configurations for enhanced security.

🖥️ Build a front-end interface for a user-friendly experience.

📜 License
This project is licensed under the MIT License. Contributions and feedback are highly encouraged! 🚀

👨‍💻 Developed By
Eng. Johnson Mwangi

📧 johnsonthuraniramwangi@gmail.com

Happy Coding! 💻🚀