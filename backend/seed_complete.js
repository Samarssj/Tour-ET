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
  { name: "Lalibela Rock-Hewn Churches", location: "Lalibela", duration: "3 Days", pricePerAdult: 8000, rating: 5, totalRatings: 12, type: "HistoricalPlace", description: [{ title: "Overview", content: "Explore the 11 monolithic churches." }], priceRange: "5000-10000", to_do_type: "Culture & History", image: ["https://images.unsplash.com/photo-1580320209809-a0c51e645872?auto=format&fit=crop&w=1200&q=80"] },
  { name: "Simien Mountains Trek", location: "Simien Mountains", duration: "5 Days", pricePerAdult: 18000, rating: 4.8, totalRatings: 8, type: "Park", description: [{ title: "Overview", content: "Breathtaking trekking." }], priceRange: "morethan15000", to_do_type: "Trekking", image: ["https://images.unsplash.com/photo-1541432901912-2d8868175450?auto=format&fit=crop&w=1200&q=80"] },
  { name: "Axum Ancient Kingdom", location: "Axum", duration: "2 Days", pricePerAdult: 6500, rating: 4.5, totalRatings: 15, type: "HistoricalPlace", description: [{ title: "Overview", content: "Cradle of civilization." }], priceRange: "5000-10000", to_do_type: "Historical", image: ["https://images.unsplash.com/photo-1599834164807-633857597148?auto=format&fit=crop&w=1200&q=80"] },
  { name: "Rift Valley Lakes Tour", location: "Rift Valley", duration: "4 Days", pricePerAdult: 9000, rating: 4.7, totalRatings: 10, type: "Adventure", description: [{ title: "Overview", content: "Beautiful lakes and birds." }], priceRange: "5000-10000", to_do_type: "Nature", image: ["https://images.unsplash.com/photo-1523805081446-ebefad99c289?auto=format&fit=crop&w=1200&q=80"] },
  { name: "Addis Ababa City Tour", location: "Addis Ababa", duration: "1 Day", pricePerAdult: 3500, rating: 4.6, totalRatings: 20, type: "City", description: [{ title: "Overview", content: "Explore the capital." }], priceRange: "less5000", to_do_type: "Urban", image: ["https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"] },
  { name: "Danakil Depression Expedition", location: "Danakil", duration: "4 Days", pricePerAdult: 25000, rating: 4.9, totalRatings: 5, type: "Adventure", description: [{ title: "Overview", content: "Hottest place on Earth." }], priceRange: "morethan15000", to_do_type: "Extreme Adventure", image: ["https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"] },
  { name: "Gondar Castles & Palaces", location: "Gondar", duration: "2 Days", pricePerAdult: 7500, rating: 4.7, totalRatings: 14, type: "HistoricalPlace", description: [{ title: "Overview", content: "The Camelot of Africa." }], priceRange: "5000-10000", to_do_type: "History", image: ["https://images.unsplash.com/photo-1523805081446-ebefad99c289?auto=format&fit=crop&w=1200&q=80"] },
  { name: "Lake Langano Beach Resort", location: "Lake Langano", duration: "3 Days", pricePerAdult: 11000, rating: 4.5, totalRatings: 9, type: "Group", description: [{ title: "Overview", content: "Relax by the brown lake." }], priceRange: "10000-15000", to_do_type: "Relaxation", image: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"] },
  { name: "Arba Minch & Dorze Village", location: "Arba Minch", duration: "4 Days", pricePerAdult: 13000, rating: 4.8, totalRatings: 11, type: "Adventure", description: [{ title: "Overview", content: "Crocodiles and weavers." }], priceRange: "10000-15000", to_do_type: "Cultural", image: ["https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"] },
  { name: "Bale Mountains National Park", location: "Bale Mountains", duration: "5 Days", pricePerAdult: 16000, rating: 4.7, totalRatings: 7, type: "Park", description: [{ title: "Overview", content: "Endemic wildlife." }], priceRange: "morethan15000", to_do_type: "Wildlife", image: ["https://images.unsplash.com/photo-1516422317943-3e44555b9f98?auto=format&fit=crop&w=1200&q=80"] }
];

const sampleHotels = [
    { name: "Lalibela View Hotel", location: "Lalibela", description: "Views of Lasta mountains.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80" },
    { name: "Simien Lodge", location: "Simien Mountains", description: "Highest lodge in Africa.", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" },
    { name: "Axum Heritage Hotel", location: "Axum", description: "Comfort in ancient city.", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80" },
    { name: "Haile Resort Ziway", location: "Rift Valley", description: "Luxury by the lake.", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80" },
    { name: "Sheraton Addis", location: "Addis Ababa", description: "Luxury in the capital.", image: "https://images.unsplash.com/photo-1541971875076-8f97a344446d?auto=format&fit=crop&w=800&q=80" },
    { name: "Kuria Kuriftu", location: "Danakil", description: "Desert oasis comfort.", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80" },
    { name: "Goha Hotel Gondar", location: "Gondar", description: "Overlooking the castles.", image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=800&q=80" },
    { name: "Sabana Beach Resort", location: "Lake Langano", description: "Beachfront relaxation.", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80" },
    { name: "Paradise Lodge Arba Minch", location: "Arba Minch", description: "Traditional luxury.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80" },
    { name: "Bale Mountain Lodge", location: "Bale Mountains", description: "In the heart of the park.", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80" }
];

async function seed() {
  try {
    const finalUrl = "mongodb+srv://samar:%23Gokussj4@cluster0.uas7nfl.mongodb.net/test?retryWrites=true&w=majority";
    await mongoose.connect(finalUrl);
    
    await Package.deleteMany({});
    await Hotel.deleteMany({});
    await Room.deleteMany({});
    
    await Package.insertMany(samplePackages);
    const createdHotels = await Hotel.insertMany(sampleHotels);

    const rooms = [];
    createdHotels.forEach(hotel => {
        rooms.push(
            { hotel: hotel._id, roomNumber: 101, type: "Single Room", description: "Cozy single room.", images: ["https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"], price: 800, taken: false },
            { hotel: hotel._id, roomNumber: 202, type: "Double Room", description: "Spacious double room.", images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80"], price: 1500, taken: false },
            { hotel: hotel._id, roomNumber: 303, type: "Luxury Suite", description: "Premium luxury suite.", images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"], price: 3000, taken: false }
        );
    });

    await Room.insertMany(rooms);
    console.log("Database seeded successfully with all locations and room types!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();
