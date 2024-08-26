const mongoose = require('mongoose');

const uri = 'mongodb+srv://tendryarivony:tptmbds2024@mastermbds.gae8jfk.mongodb.net/?retryWrites=true&w=majority&appName=mastermbds';

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
