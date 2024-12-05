const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Function to log environment variables
const logEnvironmentVariables = () => {
    console.log("🌟🔧 Checking Environment Variables 🔍...");
    console.log("🚀 PORT:", process.env.PORT || "Default: 8000");
    console.log("📞 MPESA_PAYBILL:", process.env.MPESA_PAYBILL || "❌ Missing");
    console.log("🔑 PASSKEY:", process.env.PASSKEY || "❌ Missing");
    console.log("🛡️ MPESA_CONSUMER_KEY:", process.env.MPESA_CONSUMER_KEY || "❌ Missing");
    console.log("🔐 MPESA_CONSUMER_SECRET:", process.env.MPESA_CONSUMER_SECRET || "❌ Missing");
    console.log("🌐 CALLBACK_URL:", process.env.CALLBACK_URL || "❌ Missing");
    console.log("✨ All checks complete! ✅");
};

// Log the environment variables on server startup
app.listen(port, () => {
    console.log(`🌟✨ Server is up and running on port ${port}! 🎉🚀`);
    logEnvironmentVariables();
});

// Home route
app.get("/", (req, res) => {
    res.send(`
        <h1>🌟 Welcome to the MPESA STK Push Service! 🌟</h1>
        <p>🚀 Server is running smoothly ✅</p>
    `);
});

// Middleware to generate token
const generateToken = async (req, res, next) => {
    try {
        const { MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET } = process.env;

        if (!MPESA_CONSUMER_KEY || !MPESA_CONSUMER_SECRET) {
            throw new Error("🛑 Consumer Key or Secret is missing in environment variables!");
        }

        const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString("base64");
        console.log("🔑 Generating MPESA token...");
        const response = await axios.get(
            "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
            {
                headers: { Authorization: `Basic ${auth}` },
            }
        );

        console.log("✅ Token generated successfully!");
        req.token = response.data.access_token;
        next();
    } catch (error) {
        console.error("❌ Error generating token:", error.response?.data || error.message);
        res.status(500).json({
            error: "💥 Failed to generate token! Please check your credentials or internet connection. 🔄",
            details: error.response?.data || error.message,
        });
    }
};

// Test token generation
app.get("/token", generateToken, (req, res) => {
    res.json({
        message: "🔑 Token generated successfully! 🎉",
        token: req.token,
    });
});

app.post("/stk", generateToken, async (req, res) => {
    const { phone, amount } = req.body;

    if (!phone || !amount) {
        return res.status(400).json({
            error: "📵 Phone number and 💰 Amount are required to proceed! 🚫",
        });
    }

    try {
        const date = new Date();
        const timestamp = `${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(-2)}${("0" + date.getDate()).slice(-2)}${(
            "0" + date.getHours()
        ).slice(-2)}${("0" + date.getMinutes()).slice(-2)}${("0" + date.getSeconds()).slice(-2)}`;

        const { MPESA_PAYBILL, PASSKEY, CALLBACK_URL } = process.env;

        if (!MPESA_PAYBILL || !PASSKEY || !CALLBACK_URL) {
            throw new Error("🛑 Required environment variables (MPESA_PAYBILL, PASSKEY, CALLBACK_URL) are missing!");
        }

        const password = Buffer.from(`${MPESA_PAYBILL}${PASSKEY}${timestamp}`).toString("base64");

        const stkRequest = {
            "BusinessShortCode": MPESA_PAYBILL,
            "Password": password,
            "Timestamp": timestamp,  // Ensure the correct timestamp is used
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,
            "PartyA": `254${phone.substring(1)}`,
            "PartyB": MPESA_PAYBILL,
            "PhoneNumber": `254${phone.substring(1)}`,
            "CallBackURL": CALLBACK_URL,
            "AccountReference": "CompanyXLTD",
            "TransactionDesc": "Payment of X"
        };

        // Debugging console logs
        console.log("STK Request Debug Info:");
        console.log("BusinessShortCode:", MPESA_PAYBILL);
        console.log("Password (Base64):", password);
        console.log("Timestamp:", timestamp);
        console.log("TransactionType:", "CustomerPayBillOnline");
        console.log("Amount:", amount);
        console.log("PartyA (Phone Number):", `254${phone.substring(1)}`);
        console.log("PartyB (PayBill):", MPESA_PAYBILL);
        console.log("PhoneNumber:", `254${phone.substring(1)}`);
        console.log("CallBackURL:", CALLBACK_URL);
        console.log("AccountReference:", "Payment");
        console.log("TransactionDesc:", "Payment");

        // Logging the entire request object for completeness
        console.log("Complete STK Request Object:", stkRequest);

        console.log("📡 Sending STK Push request...");
        const response = await axios.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            stkRequest,
            {
                headers: { Authorization: `Bearer ${req.token}` },
            }
        );

        console.log("✅ STK Push response:", response.data);
        res.status(200).json({
            message: "📲 STK Push sent successfully! Check your phone to proceed. 😊",
            data: response.data,
        });
    } catch (error) {
        console.error("❌ STK Push error details:", error.response?.data || error.message);
        res.status(500).json({
            error: "💥 Failed to initiate STK Push. Please check your credentials or try again later. 🔄",
            details: error.response?.data || error.message,
        });
    }
});

// Callback route
app.post("/callback", (req, res) => {
    console.log("🔔 Callback data received! 📨");
    const callbackData = req.body;

    if (!callbackData?.Body?.stkCallback?.CallbackMetadata) {
        return res.status(400).json({
            error: "⚠️ No Callback Metadata received. Please try again. 😟",
        });
    }

    console.log("✅ Callback Metadata:", callbackData.Body.stkCallback.CallbackMetadata);
    res.json({
        message: "🎉 Callback received successfully! Thank you for using our service. 🙏",
        data: callbackData.Body.stkCallback.CallbackMetadata,
    });
});
