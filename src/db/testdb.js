import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

let uri = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://localhost:27017/test"; 
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology:true  })

const contactSchema = new mongoose.Schema({
    _id : String,
    name: String,
    tel: String,
    address: String,
    photo:String
})

const photoSchema = new mongoose.Schema({
    _id: String,
    image: Buffer, 
    mimetype: String 
})

contactSchema.index({ name:1 })
photoSchema.index({ contact_id:1 })

const Contact = mongoose.model("contacts", contactSchema);
const Photo = mongoose.model("photos", photoSchema);

export { Contact, Photo, mongoose };
