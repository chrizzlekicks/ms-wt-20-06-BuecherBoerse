// Sinnvoll Fehlermeldungen

// fix error handler

const getUniqueErrorMessage = (err) => {
    let output
    try {
        let fieldName =
            err.message.substring(err.message.lastIndexOf('.$') + 2,
                err.message.lastIndexOf('_1'))
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) +
            ' already exists'
    } catch (ex) {
        output = 'Unique field already exists'
    }
    return output
}
// Fehler aus der Datenbank
// Wenn die Anfrage falsche Eingaben macht
const getErrorMessage = (err) => {
    let message = ''
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err)
                break
            default:
                message = err.message
        }
    } else {
        for (let errName in err.errors) {
            if (err.errors[errName].message)
                message = err.errors[errName].message
        }
    }
    return message
}

const goodError = (err) => {
    if(err.name === 'ValidationError') return err = handleValidationError(err, res);
    if(err.code && err.code == 11000) return err = handleDuplicateKeyError(err, res);
    return res.status(500).send('An unknown error occurred.');
    }

//handle email or username duplicates
const handleDuplicateKeyError = (err, res) => {
   const field = Object.keys(err.keyValue);
   const code = 409;
   const error = `An account with that ${field} already exists.`;
   res.status(code).send({messages: error, fields: field});
}

const handleValidationError = (err, res) => {
   let errors = Object.values(err.errors).map(el => el.message);
   let fields = Object.values(err.errors).map(el => el.path);
   let code = 400;
   if(errors.length > 1) {
      const formattedErrors = errors.join(' ');
      res.status(code).send({messages: formattedErrors, fields:     fields});
    } else {
       res.status(code).send({messages: errors, fields: fields})
    }
}

export default { getErrorMessage }