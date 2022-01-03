import nodemailer from 'nodemailer';
import User from '../models/user.model';
import passwordResetToken from '../models/passwordResetToken.model';
import crypto from 'crypto';
import config from '../config/config';

const requestPasswordReset = async (req, res) => {
    let user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
        return res.status(404).json({
            error: 'User not found'
        });
    }
    // Mask Users?

    let oldtoken = await passwordResetToken.findOne({ user: user._id });
    if (oldtoken) {
        await oldtoken.deleteOne();
    }
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hash = crypto
        .createHmac('sha256', config.passwortResetSalt)
        .update(resetToken)
        .digest('hex');
    const token = new passwordResetToken({
        user: user._id,
        token: hash
    });

    try {
        await token.save();
    } catch (err) {
        return res.status(500).json({
            what: err.name,
            error: err.message
        });
    }
    const link =
        'http://app.kodebi.de/reset?token=' + resetToken + '&id=' + user._id;

    sendPasswordResetMail(user.email, link);

    return res.status(200).json({
        msg: 'Password Reset Token created'
    });
};

async function sendPasswordResetMail(mailTo, resetLink) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: config.mailSmtpServer,
        port: 465,
        secure: true,
        auth: {
            user: config.mailUser,
            pass: config.mailPass
        }
    });

    const mailFrom = { name: 'Kodebi Passwort', address: config.mailFrom };

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: mailFrom,
        bcc: mailFrom, // also send to self for docu
        to: mailTo, // list of receivers
        subject: 'Kodebi Passwort Zurücksetzen', // Subject line
        text:
            'Um dein Passwort zurückzusetzen klicke bitte diesen Link: ' +
            resetLink, // plain text body
        html:
            '<b>Um dein Passwort zurückzusetzen klicke bitte diesen Link:</b>' +
            resetLink // html body
    });

    console.log('Message sent: %s', info.messageId);
}

const resetPassword = async (req, res) => {
    // We need userid, reset token, new password
    const resetToken = await passwordResetToken
        .findOne({ user: req.body.userId })
        .exec();
    if (!resetToken) {
        return res.status(401).json({
            error: 'Token not found'
        });
    }
    const hash = crypto
        .createHmac('sha256', config.passwortResetSalt)
        .update(req.body.token)
        .digest('hex');
    const keyBuffer = Buffer.from(hash, 'hex');
    const hashBuffer = Buffer.from(resetToken.token, 'hex');
    const isValid = crypto.timingSafeEqual(keyBuffer, hashBuffer);
    if (!isValid) {
        return res.status(401).json({
            error: 'Invalid or expired password reset token'
        });
    }

    // Use save for validators
    const user = await User.findById(req.body.userId).exec();
    if (!user) {
        return res.status(404).json({
            error: 'User not found'
        });
    }

    user.password = req.body.password;
    try {
        await user.save();
    } catch (err) {
        return res.status(500).json({
            what: err.name,
            error: err.message
        });
    }

    await resetToken.deleteOne();

    return res.status(200).json({
        message: 'Passwort Reset successful'
    });
};

export default { requestPasswordReset, resetPassword };
