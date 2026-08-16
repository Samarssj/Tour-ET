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

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
}, { timestamps: true });

const roomSchema = new mongoose.Schema({
    hotel: { type: mongoose.Schema.Types.ObjectId, required: true },
    taken: { type: Boolean, default: false },
    roomNumber: { type: Number, required: true },
    type: { type: String, required: true },
    description: { type: String },
    images: [{ type: String, required: false }],
    price: { type: Number, required: false },
}, { timestamps: true });

const Package = mongoose.model('Package', packageSchema);
const Hotel = mongoose.model('Hotel', hotelSchema);
const Room = mongoose.model('Room', roomSchema);

const samplePackages = [
  {
    name: "Lalibela Rock-Hewn Churches",
    image: ["https://images.unsplash.com/photo-1580320209809-a0c51e645872?auto=format&fit=crop&w=1200&q=80"],
    location: "Lalibela",
    duration: "3 Days",
    pricePerAdult: 8000,
    rating: 5,
    totalRatings: 12,
    type: "HistoricalPlace",
    description: [{ title: "Day 1", content: "Explore the 11 monolithic churches carved out of solid basaltic rock." }],
    priceRange: "5000-10000",
    to_do_type: "Culture & History"
  },
  {
    name: "Simien Mountains Trekking",
    image: ["https://images.unsplash.com/photo-1541432901912-2d8868175450?auto=format&fit=crop&w=1200&q=80"],
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
    name: "Axum Ancient Stelae",
    image: ["https://images.unsplash.com/photo-1599834164807-633857597148?auto=format&fit=crop&w=1200&q=80"],
    location: "Axum",
    duration: "2 Days",
    pricePerAdult: 6500,
    rating: 4.5,
    totalRatings: 15,
    type: "City",
    description: [{ title: "History", content: "Visit the cradle of Ethiopian civilization." }],
    priceRange: "5000-10000",
    to_do_type: "Cultural"
  }
];

const sampleHotels = [
    {
        name: "Lalibela View Hotel",
        location: "Lalibela",
        description: "Breathtaking views of the Lasta mountains and the town of Lalibela.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Gonder Castle Lodge",
        location: "Gonder",
        description: "Experience the royal treatment near the Fasil Ghebbi castles.",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Axum Heritage Hotel",
        location: "Axum",
        description: "Modern comfort in the heart of the ancient city.",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
    }
];

async function seed() {
  try {
    const finalUrl = "mongodb+srv://samar:%23Gokussj4@cluster0.uas7nfl.mongodb.net/test?retryWrites=true&w=majority";
    console.log("Connecting to Atlas...");
    await mongoose.connect(finalUrl);
    console.log("Connected to MongoDB Atlas successfully!");
    
    await Package.deleteMany({});
    await Hotel.deleteMany({});
    await Room.deleteMany({});
    console.log("Cleared existing data.");
    
    const createdPackages = await Package.insertMany(samplePackages);
    console.log("Successfully seeded packages!");

    const createdHotels = await Hotel.insertMany(sampleHotels);
    console.log("Successfully seeded hotels!");

    const rooms = [];
    createdHotels.forEach(hotel => {
        rooms.push(
            {
                hotel: hotel._id,
                roomNumber: 101,
                type: "Standard Double",
                description: "Spacious room with a double bed and mountain view.",
                images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80"],
                price: 1200,
                taken: false
            },
            {
                hotel: hotel._id,
                roomNumber: 202,
                type: "Luxury Suite",
                description: "Premium suite with a private balcony and luxury amenities.",
                images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"],
                price: 2500,
                taken: false
            }
        );
    });

    await Room.insertMany(rooms);
    console.log("Successfully seeded rooms!");
    
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();
