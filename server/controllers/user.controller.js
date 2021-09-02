import User from '../models/user.model';
import extend from 'lodash/extend';
import errorHandler from './../helpers/dbErrorHandler';

// Erstelle Benutzer
const create = async (req, res) => {
    // POST daher body
    const user = new User(req.body);
    try {
        await user.save();
        return res.status(200).json({
            message: 'Benutzer erfolgreich erstellt!',
            user: user,
        });
    } catch (err) {
        return res.status(500).json({
            what: err.name
        });
    }
};

// Liste alle Benutzer auf
const list = async (req, res) => {
    try {
        let users = await User.find().select('name email updated created group');
        res.json(users);
    } catch (err) {
        return res.status(500).json({
            what: err.name
        });
    }
};

// Einzelne Benutzer finden
// An die Anfrage anhaengen und weiterleiten
const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                error: 'User nicht gefunden',
            });
        }
        req.profile = user;
        next();
    } catch (err) {
        return res.status(500).json({
            error: 'Could not retrieve user',
        });
    }
};

// Lese Benutzer, Entferne Passwort
const read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

// veraendere user
const update = async (req, res) => {
    try {
        let user = req.profile;
        // lodash - merge and extend user profile
        user = extend(user, req.body);
        await user.save();
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    } catch (err) {
        return res.status(500).json({
            what: err.name
        });
    }
};

// loesche user
const remove = async (req, res) => {
    try {
        let user = req.profile;
        let deletedUser = await user.remove();
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        res.json(deletedUser);
    } catch (err) {
        return res.status(500).json({
            what: err.name
        });
    }
};

export default {
    create,
    userByID,
    read,
    list,
    remove,
    update,
};
