require('dotenv').config();  // Load environment variables

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Use the MongoDB URI from the .env.local file
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';  // Default to "portfolio" if not found in .env.local

// Define your existing User schema (adapted to match your model)
const userSchema = new mongoose.Schema({
  systemUserName: { type: String, required: true, unique: true },
  employerName: { type: String, required: true },
  employerEmail: { type: String, required: true, unique: true },
  usertype: { type: Number, required: true },
  password: { type: String, required: true },
});

// Your model
const SysUserModel = mongoose.model('SystemUsers', userSchema);

// Sample user data
const users = [
  {
    systemUserName: "admin",
    employerName: "Admin Company",
    employerEmail: "admin@example.com",
    usertype: 0,
    password: "test",
  },
  {
    systemUserName: "admin2",
    employerName: "Admin2 Company",
    employerEmail: "admin2@example.com",
    usertype: 0,
    password: "test2",
  },
  {
    systemUserName: "employer1",
    employerName: "Employer1 Company",
    employerEmail: "employer1@example.com",
    usertype: 1,
    password: "etest1",
  },
  {
    systemUserName: "employer2",
    employerName: "Employer2 Company",
    employerEmail: "employer2@example.com",
    usertype: 1,
    password: "etest2",
  },
  {
    systemUserName: "employer3",
    employerName: "Employer3 Company",
    employerEmail: "employer3@example.com",
    usertype: 1,
    password: "etest3",
  },
  {
    systemUserName: "employer4",
    employerName: "Employer4 Company",
    employerEmail: "employer4@example.com",
    usertype: 1,
    password: "etest4",
  }
];

// Function to hash password and seed users
const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Loop through each user and hash their password before saving
    for (const userData of users) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const newUser = new SysUserModel({
        systemUserName: userData.systemUserName,
        employerName: userData.employerName,
        employerEmail: userData.employerEmail,
        usertype: userData.usertype,
        password: hashedPassword,
      });

      await newUser.save();
      console.log(`User ${userData.systemUserName} saved successfully!`);
    }

    // Close the connection after seeding
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding users:', error);
    mongoose.connection.close();
  }
};

// Run the seeding function
seedUsers();
