import mongoose from 'mongoose'
import crypto from 'crypto'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name ist erforderlich']
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Bitte gib eine gueltige Email Adresse an'],
        required: [true, "Email ist erforderlich"]
    },
    hashed_password: {
        type: String,
        required: "Password ist erforderlich"
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
})

UserSchema.virtual('password')
    .set(function (password) {
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password
    })

UserSchema.path('hashed_password').validate(function (v) {
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'Password muss mindestens 6 Zeichen lang sein.')
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password ist erforderlich')
    }
}, null)

UserSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function (password) {
        if (!password) return ''
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ''
        }
    },
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}

export default mongoose.model('User', UserSchema)