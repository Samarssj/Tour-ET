import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
    name: String,
    location: String
}, { strict: false });

const roomSchema = new mongoose.Schema({
    hotel: mongoose.Schema.Types.ObjectId,
    type: String
}, { strict: false });

const Hotel = mongoose.model('Hotel', hotelSchema);
const Room = mongoose.model('Room', roomSchema);

async function inspect() {
  try {
    const finalUrl = "mongodb+srv://samar:%23Gokussj4@cluster0.uas7nfl.mongodb.net/test?retryWrites=true&w=majority";
    await mongoose.connect(finalUrl);
    
    const hotel = await Hotel.findOne({ name: "Lalibela View Hotel" });
    if (hotel) {
        const rooms = await Room.find({ hotel: hotel._id });
        console.log(`Hotel: ${hotel.name}, Rooms: ${rooms.length}`);
        rooms.forEach(r => console.log(`  - ${r.type}`));
    }
    
    process.exit(0);
  } catch (err) {
    console.error("Inspection failed:", err);
    process.exit(1);
  }
}

inspect();
