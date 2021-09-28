import {body, validationResult} from 'express-validator';

const userValidationRules = () => {
  return [
    // username must be an email
    body('username').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate,
}

// use as middlewar
//const { userValidationRules, validate } = require('./validator.js')
//app.post('/user', userValidationRules(), validate, (req, res) => {
//  User.create({
//    username: req.body.username,
//    password: req.body.password,
//  }).then(user => res.json(user))
//})