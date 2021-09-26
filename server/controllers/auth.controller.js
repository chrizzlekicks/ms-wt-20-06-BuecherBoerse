import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import config from './../../config/config';

const signin = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email
    });
    if (!user)
      return res.status(404).json({
        error: 'User not found'
      });

    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({
        error: "Email and password don't match."
      });
    }

    // JSON Web Tokens
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        group: user.group
      },
      config.jwtSecret,
      {
        expiresIn: '30 days'
      }
    );

    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('t', token, {
      httpOnly: true,
      expire: new Date(Date.now() + oneDay)
    });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        group: user.group
      }
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Could not sign in'
    });
  }
};

const signout = (req, res) => {
  res.clearCookie('t');
  return res.status(200).json({
    message: 'signed out'
  });
};

// Beschuetze Anfrage mit JWT
// Abfrage ob Benutzer angemeldet ist
// Wird in den Routen benutzt
const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth'
});

// Darf der Benutzer die Aktion ausfuehren?
// Sein eigenes Profil bearbeiten ist in Ordnung
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!authorized) {
    return res.status(403).json({
      error: 'User is not authorized'
    });
  }
  next();
};

const hasAuthorizationForNewMessage = (req, res, next) => {
  const authorized = req.body.sender == req.auth._id;

  if (!authorized) {
    return res.status(403).json({
      error: 'User is not the sender of the new message'
    });
  }
  next();
};

const hasAuthorizationForConversation = (req, res, next) => {
  const isrecipient = req.conv.recipients.some(
    (recipient) => recipient._id == req.auth._id
  );

  const authorized = req.auth && isrecipient;

  if (!authorized) {
    return res.status(403).json({
      error: 'User is not part of conversation'
    });
  }
  next();
};

//Dürfen BenutzerInnen etwas an einem Buch ändern?
const hasAuthorizationForBook = (req, res, next) => {
  const authorized = req.auth && req.book.owner == req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: 'User is not authorized for book'
    });
  }
  next();
};

export default {
  signin,
  signout,
  requireSignin,
  hasAuthorization,
  hasAuthorizationForBook,
  hasAuthorizationForConversation,
  hasAuthorizationForNewMessage
};
