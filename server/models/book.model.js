import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name des Buches fehlt',
  },
  author: {
    type: String,
    trim: true,
    required: 'Autor des Buches fehlt',
  },
  image: {
    type: String,
    required: 'Kein Bild ausgewählt',
  },
  imagekitIoId: {
    type: String,
    required: 'Kein Bild ausgewählt',
  },
  category: {
    type: String,
    trim: true,
    required: 'Bitte ein Genre eintragen',
  },
  language: {
    type: String,
    trim: true,
    required: 'Bitte eine Sprache eintragen',
  },
  condition: {
    //Zustand des Buches
    type: String,
    trim: true,
    required: 'Bitte den Zustand angeben',
  },
  description: {
    //Beschreibung des Buches
    type: String,
    required: 'Bitte beschreibe dein Buch',
  },
  //User ID
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: 'Bitte einen User eintragen',
  },
  username: {
    type: String,
    required: 'Bitte einen User eintragen',
  },
  status: {
    //privat, bereit zum Verleihen, verliehen
    type: String,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

export default mongoose.model('Book', BookSchema);
