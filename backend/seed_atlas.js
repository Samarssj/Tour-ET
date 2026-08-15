import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  pricePerAdult: { type: Number, required: true },
  description: [{ type: Object, required: true }],
  rating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  priceRange: { type: String, enum: ["less5000", "5000-10000", "10000-15000", "morethan15000"] },
  departureDates: [{ type: Date }],
  image: [{ type: String }],
  type: { type: String, required: true, enum: ["HistoricalPlace", "City", "Group", "Park", "Adventure"] },
  to_do_type: { type: String, required: true },
  map: { type: String }
}, { timestamps: true });

const Package = mongoose.model('Package', packageSchema);

const samplePackages = [
  {
    name: "Rock-Hewn Churches of Lalibela",
    image: ["https://images.unsplash.com/photo-1580320209809-a0c51e645872?auto=format&fit=crop&w=800&q=80"],
    location: "Lalibela",
    duration: "3 Days",
    pricePerAdult: 12500,
    rating: 5,
    totalRatings: 12,
    type: "Adventure",
    description: [{ title: "Day 1", content: "Explore the 11 monolithic churches carved out of solid basaltic rock." }],
    priceRange: "10000-15000",
    to_do_type: "Sightseeing"
  },
  {
    name: "Simien Mountains Trekking",
    image: ["https://images.unsplash.com/photo-1541432901912-2d8868175450?auto=format&fit=crop&w=800&q=80"],
    location: "Gonder",
    duration: "5 Days",
    pricePerAdult: 18000,
    rating: 4.8,
    totalRatings: 8,
    type: "Park",
    description: [{ title: "Overview", content: "A breathtaking adventure through the 'Roof of Africa'." }],
    priceRange: "morethan15000",
    to_do_type: "Trekking"
  },
  {
    name: "The Ancient Stelae of Axum",
    image: ["https://images.unsplash.com/photo-1599834164807-633857597148?auto=format&fit=crop&w=800&q=80"],
    location: "Axum",
    duration: "2 Days",
    pricePerAdult: 9500,
    rating: 4.5,
    totalRatings: 15,
    type: "City",
    description: [{ title: "History", content: "Visit the cradle of Ethiopian civilization." }],
    priceRange: "5000-10000",
    to_do_type: "Cultural"
  }
];

async function seed() {
  try {
    const finalUrl = "mongodb+srv://samar:%23Gokussj4@cluster0.uas7nfl.mongodb.net/test?retryWrites=true&w=majority";
    console.log("Connecting to Atlas...");
    await mongoose.connect(finalUrl);
    console.log("Connected to MongoDB Atlas successfully!");
    
    await Package.deleteMany({});
    console.log("Cleared existing packages.");
    
    await Package.insertMany(samplePackages);
    console.log("Successfully seeded Atlas with sample packages!");
    
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();
