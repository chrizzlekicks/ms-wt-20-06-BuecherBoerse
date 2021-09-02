import Book from '../models/book.model';
import extend from 'lodash/extend';
import errorHandler from './../helpers/dbErrorHandler';

//Buch wird erstellt
const create = async (req, res) => {
    try {
        // overwrite the username und the user_id from the req
        req.body.username = req.auth.name
        req.body.owner = req.auth._id

        const book = new Book(req.body);
        try {
            book.image = res.locals.BookUrl;
            book.imagekitIoId = res.locals.BookImageId;
        } catch (err) {
            return res.status(400).json({
                message: 'You need to upload an image',
            });
        }
        await book.save();
        return res.status(200).json({
            message: 'Book upload successful!',
            book: book,
            image: res.locals.BookUrl,
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message,
        });
    }
};

//Liste aller Bücher
const list = async (req, res) => {
    try {
        let bookList = await Book.find().select(
            'name author image category owner status updated created group'
        );
        res.json(bookList);
    } catch (err) {
        return res.status(400).json({
            message: errorHandler.getErrorMessage(err),
        });
    }
};

//Erhalte alle Buecher eines bestimmten Users
const bookByUser = async (req, res) => {
    try {
        // exec -> lean
        let books = await Book.find({ owner: req.params.userId }).exec();
        if (!books) {
            return res.status('400').json({
                error: 'User has no books',
            });
        }
        res.json(books);
    } catch (err) {
        return res.status('400').json({
            error: err.message,
        });
    }
};

//Buch über Buch-ID auswählen
const bookByID = async (req, res, next, id) => {
    try {
        let book = await Book.findById(id);
        if (!book) {
            return res.status('400').json({
                error: 'Book not found',
            });
        }
        req.book = book;
        next();
    } catch (err) {
        return res.status('400').json({
            error: 'Could not retrieve book',
        });
    }
};

//zuvor mit bookByID ausgewähltes Buch anzeigen
const read = (req, res) => {
    return res.json(req.book);
};

//verändere Buch mit PUT
const update = async (req, res) => {
    try {
        // Get Book
        let book = req.book;

        // overwrite the user_id from the req
        // with the old data from the book, so no one can change the book owner
        // Also don't allow to change the image in this route
        // Update the username to the name of the currently loggedin user
        req.body.username = req.auth.name;
        req.body.owner = book.owner;
        req.body.image = book.image;
        req.body.imagekitIoId = book.imagekitIoId;

        // Verändern der restlichen Buchdaten
        book = extend(book, req.body);
        await book.save();
        res.json(book);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

const updateImage = async (req, res) => {
    try {
        // Get Book
        let book = req.book;

        // Only Update image, image_id and timestamp
        book.image = res.locals.BookUrl;
        book.imagekitIoId = res.locals.BookImageId;

        // Save modified book to db
        await book.save();
        res.json(book);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

//lösche Buch
const remove = async (req, res) => {
    try {
        let book = req.book;
        //löscht Bild des Buches aus der Datenbank
        // Loescht Bild vom Server? tbd
        //console.log(book);
        //löscht die restlichen Buchdaten
        let deletedBook = await book.remove();

        return res.status(200).json({
            message: 'Book successfully deleted!',
            book: deletedBook,
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

export default {
    create,
    list,
    bookByID,
    read,
    update,
    updateImage,
    remove,
    bookByUser,
};
