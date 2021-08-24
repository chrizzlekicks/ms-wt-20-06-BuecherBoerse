import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name des Buches fehlt']
    },
    author: {
        type: String,
        trim: true,
        required: [true, 'Autor des Buches fehlt']
    },
    image: {
        type: String,
        required: [true, 'Kein Bild ausgewählt']
    },
    imagekitIoId: {
        type: String,
        required: [true, 'Kein Bild ausgewählt']
    },
    category: {
        type: String,
        trim: true,
        required: [true, "Bitte ein Genre eintragen"]
    },
    language: {
        type: String,
        trim: true,
        required: [true, "Bitte eine Sprache eintragen"]
    },
    condition: {		//Zustand des Buches
        type: String,
        trim: true,
        required: [true, "Bitte den Zustand angeben"]
    },
    description: {		//Beschreibung des Buches
        type: String,
        required: [true, "Bitte beschreibe dein Buch"]
    },
    //User ID
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Bitte einen User eintragen"]
    },
    username: {
        type: String,
        required: [true, "Bitte einen User eintragen"]
    },
    status: {	//privat, bereit zum Verleihen, verliehen
        type: String,
        trim: true,
    },
    group: {
        type: String,
        trim: true,
        lowercase: true
        //required: [true, 'Gruppe ist erforderlich']
    },
    {
        timestamps: true
    }
});

export default mongoose.model('Book', BookSchema);
