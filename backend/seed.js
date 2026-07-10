import mongoose from "mongoose";
import dotenv from "dotenv";
import Package from "./Models/packageModel.js";

dotenv.config();

const packages = [
  {
    name: "Bale Mountains National Park",
    location: "Bale Mountains",
    duration: "5 days",
    pricePerAdult: 12000,
    description: [{ title: "Overview", text: "Explore the stunning highlands of the Bale Mountains, home to endemic wildlife including the Ethiopian wolf and mountain nyala." }],
    priceRange: "10000-15000",
    image: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"],
    type: "Park",
    to_do_type: "Wildlife & Trekking",
    rating: 4,
    totalRatings: 25,
  },
  {
    name: "Lalibela Rock-Hewn Churches",
    location: "Lalibela",
    duration: "4 days",
    pricePerAdult: 8000,
    description: [{ title: "Overview", text: "Visit the UNESCO World Heritage site of Lalibela, featuring 11 monolithic rock-cut churches carved from solid basaltic rock." }],
    priceRange: "5000-10000",
    image: ["https://images.unsplash.com/flagged/photo-1572644973628-e9be84915d59?auto=format&fit=crop&w=800&q=80"],
    type: "HistoricalPlace",
    to_do_type: "Culture & History",
    rating: 5,
    totalRatings: 42,
  },
  {
    name: "Simien Mountains Trek",
    location: "Simien Mountains",
    duration: "7 days",
    pricePerAdult: 18000,
    description: [{ title: "Overview", text: "Trek through the dramatic landscapes of the Simien Mountains, home to the endangered Gelada baboon and stunning viewpoints." }],
    priceRange: "morethan15000",
    image: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"],
    type: "Adventure",
    to_do_type: "Trekking & Wildlife",
    rating: 5,
    totalRatings: 38,
  },
  {
    name: "Axum Ancient Kingdom",
    location: "Axum",
    duration: "3 days",
    pricePerAdult: 6000,
    description: [{ title: "Overview", text: "Explore the ancient capital of the Aksumite Empire, featuring remarkable stelae and archaeological wonders." }],
    priceRange: "5000-10000",
    image: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/07/1c/01/getlstd-property-photo.jpg?w=800&h=500&s=1"],
    type: "HistoricalPlace",
    to_do_type: "Culture & History",
    rating: 4,
    totalRatings: 20,
  },
  {
    name: "Rift Valley Lakes Tour",
    location: "Rift Valley",
    duration: "4 days",
    pricePerAdult: 7500,
    description: [{ title: "Overview", text: "Discover the Ethiopian Rift Valley with its diverse people, cultural attractions, and lakes renowned for birdlife." }],
    priceRange: "5000-10000",
    image: ["https://images.unsplash.com/photo-1580320209809-a0c51e645872?auto=format&fit=crop&w=800&q=80"],
    type: "City",
    to_do_type: "Nature & Birdwatching",
    rating: 3,
    totalRatings: 15,
  },
  {
    name: "Addis Ababa City Tour",
    location: "Addis Ababa",
    duration: "2 days",
    pricePerAdult: 3500,
    description: [{ title: "Overview", text: "Experience the vibrant capital city of Ethiopia, including the National Museum, Merkato market, and panoramic city views." }],
    priceRange: "less5000",
    image: ["https://images.unsplash.com/photo-1489493887464-892be6d1daae?auto=format&fit=crop&w=800&q=80"],
    type: "City",
    to_do_type: "City Tour",
    rating: 4,
    totalRatings: 30,
  },
  {
    name: "Danakil Depression Expedition",
    location: "Danakil",
    duration: "3 days",
    pricePerAdult: 14000,
    description: [{ title: "Overview", text: "Explore the lowest point in Africa - the Danakil Depression - featuring volcanic landscapes, salt flats, and extreme heat." }],
    priceRange: "10000-15000",
    image: ["https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80"],
    type: "Adventure",
    to_do_type: "Volcanic & Extreme",
    rating: 5,
    totalRatings: 28,
  },
  {
    name: "Gondar Castles & Palaces",
    location: "Gondar",
    duration: "3 days",
    pricePerAdult: 5500,
    description: [{ title: "Overview", text: "Visit the historic royal city of Gondar, known as the Camelot of Africa, featuring medieval castles and palaces." }],
    priceRange: "5000-10000",
    image: ["https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80"],
    type: "HistoricalPlace",
    to_do_type: "Culture & History",
    rating: 4,
    totalRatings: 22,
  },
  {
    name: "Lake Langano Beach Resort",
    location: "Lake Langano",
    duration: "2 days",
    pricePerAdult: 4500,
    description: [{ title: "Overview", text: "Relax at the shores of Lake Langano, one of the few Rift Valley lakes free of bilharzia, perfect for swimming and water sports." }],
    priceRange: "less5000",
    image: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"],
    type: "Group",
    to_do_type: "Beach & Water Sports",
    rating: 3,
    totalRatings: 18,
  },
  {
    name: "Arba Minch & Dorze Village",
    location: "Arba Minch",
    duration: "3 days",
    pricePerAdult: 5000,
    description: [{ title: "Overview", text: "Visit the twin lakes of Arba Minch and explore the Dorze people's unique beehive-shaped traditional houses." }],
    priceRange: "less5000",
    image: ["https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"],
    type: "Group",
    to_do_type: "Culture & Nature",
    rating: 3,
    totalRatings: 12,
  },
];

async function seed() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database successfully");

    // Check if data already exists
    const count = await Package.countDocuments();
    if (count > 0) {
      console.log(`Database already has ${count} packages. Skipping seed.`);
      process.exit(0);
    }

    // Insert packages
    const result = await Package.insertMany(packages);
    console.log(`Successfully seeded ${result.length} packages!`);
    process.exit(0);
  } catch (error) {
    console.log("Error:", error.message);
    process.exit(1);
  }
}

seed();
