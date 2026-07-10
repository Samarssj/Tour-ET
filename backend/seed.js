import mongoose from "mongoose";
import dotenv from "dotenv";
import Package from "./Models/packageModel.js";

dotenv.config();

const packages = [
  {
    title: "Lalibela Rock-Hewn Churches",
    city: "Lalibela",
    country: "Ethiopia",
    description: ["Visit the UNESCO World Heritage site of Lalibela, featuring 11 monolithic rock-cut churches carved from solid basaltic rock."],
    type: "Adventure",
    price: 8000,
    rate: 5,
    days: 4,
    image: ["https://images.unsplash.com/flagged/photo-1572644973628-e9be84915d59?auto=format&fit=crop&w=800&q=80"],
    rating: 5,
    totalRatings: 42,
    departureDates: [],
  },
  {
    title: "Simien Mountains Trek",
    city: "Simien Mountains",
    country: "Ethiopia",
    description: ["Trek through the dramatic landscapes of the Simien Mountains, home to the endangered Gelada baboon and stunning viewpoints."],
    type: "Adventure",
    price: 18000,
    rate: 5,
    days: 7,
    image: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"],
    rating: 5,
    totalRatings: 38,
    departureDates: [],
  },
  {
    title: "Axum Ancient Kingdom",
    city: "Axum",
    country: "Ethiopia",
    description: ["Explore the ancient capital of the Aksumite Empire, featuring remarkable stelae and archaeological wonders."],
    type: "Adventure",
    price: 6000,
    rate: 4,
    days: 3,
    image: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/07/1c/01/getlstd-property-photo.jpg?w=800&h=500&s=1"],
    rating: 4,
    totalRatings: 20,
    departureDates: [],
  },
  {
    title: "Rift Valley Lakes Tour",
    city: "Rift Valley",
    country: "Ethiopia",
    description: ["Discover the Ethiopian Rift Valley with its diverse people, cultural attractions, and lakes renowned for birdlife."],
    type: "City",
    price: 7500,
    rate: 3,
    days: 4,
    image: ["https://images.unsplash.com/photo-1580320209809-a0c51e645872?auto=format&fit=crop&w=800&q=80"],
    rating: 3,
    totalRatings: 15,
    departureDates: [],
  },
  {
    title: "Addis Ababa City Tour",
    city: "Addis Ababa",
    country: "Ethiopia",
    description: ["Experience the vibrant capital city of Ethiopia, including the National Museum, Merkato market, and panoramic city views."],
    type: "City",
    price: 3500,
    rate: 4,
    days: 2,
    image: ["https://images.unsplash.com/photo-1489493887464-892be6d1daae?auto=format&fit=crop&w=800&q=80"],
    rating: 4,
    totalRatings: 30,
    departureDates: [],
  },
  {
    title: "Danakil Depression Expedition",
    city: "Danakil",
    country: "Ethiopia",
    description: ["Explore the lowest point in Africa - the Danakil Depression - featuring volcanic landscapes, salt flats, and extreme heat."],
    type: "Adventure",
    price: 14000,
    rate: 5,
    days: 3,
    image: ["https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80"],
    rating: 5,
    totalRatings: 28,
    departureDates: [],
  },
  {
    title: "Gondar Castles & Palaces",
    city: "Gondar",
    country: "Ethiopia",
    description: ["Visit the historic royal city of Gondar, known as the Camelot of Africa, featuring medieval castles and palaces."],
    type: "Adventure",
    price: 5500,
    rate: 4,
    days: 3,
    image: ["https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80"],
    rating: 4,
    totalRatings: 22,
    departureDates: [],
  },
  {
    title: "Lake Langano Beach Resort",
    city: "Lake Langano",
    country: "Ethiopia",
    description: ["Relax at the shores of Lake Langano, one of the few Rift Valley lakes free of bilharzia, perfect for swimming and water sports."],
    type: "Adventure",
    price: 4500,
    rate: 3,
    days: 2,
    image: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"],
    rating: 3,
    totalRatings: 18,
    departureDates: [],
  },
  {
    title: "Arba Minch & Dorze Village",
    city: "Arba Minch",
    country: "Ethiopia",
    description: ["Visit the twin lakes of Arba Minch and explore the Dorze people's unique beehive-shaped traditional houses."],
    type: "Adventure",
    price: 5000,
    rate: 3,
    days: 3,
    image: ["https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"],
    rating: 3,
    totalRatings: 12,
    departureDates: [],
  },
  {
    title: "Bale Mountains National Park",
    city: "Bale Mountains",
    country: "Ethiopia",
    description: ["Explore the stunning highlands of the Bale Mountains, home to endemic wildlife including the Ethiopian wolf and mountain nyala."],
    type: "Adventure",
    price: 12000,
    rate: 4,
    days: 5,
    image: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"],
    rating: 4,
    totalRatings: 25,
    departureDates: [],
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
    if (count > 1) {
      console.log(`Database already has ${count} packages. Skipping seed.`);
      process.exit(0);
    }

    // Delete existing data if it's the old single package
    if (count === 1) {
      await Package.deleteMany({});
      console.log("Cleared old data. Seeding fresh packages...");
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
