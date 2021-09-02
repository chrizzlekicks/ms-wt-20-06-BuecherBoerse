import nodemailer from 'nodemailer';
import User from '../models/user.model';
import passwordResetToken from '../models/passwordResetToken.model';
import crypto from 'crypto';
import config from './../../config/config';

const requestPasswordReset = async (req, res) => {
    let user = await User.findOne({
        email: req.body.email,
    });
    if (!user) {
        return res.status(404).json({
            error: 'User not found',
        });
    }
    // Mask Users?

    let oldtoken = await passwordResetToken.findOne({ user: user._id });
    if (oldtoken) { await oldtoken.deleteOne(); }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hash = crypto.createHmac("sha256", config.passwortResetSalt).update(resetToken).digest("hex")
    const token = new passwordResetToken(({
        user: user._id,
        token: hash
    }));

    try {
        await token.save();
    } catch (err) {
        return res.status(500).json({
            what: err.name
        });
    }
    const link = "https://www.kodebi.de/auth/resetPassword?token=" + resetToken + "&id=" + user._id
    console.log(link);
    //sendPasswordResetMail(user.email, "Password Reset Request", { name: user.name, link: link, }, "./template/requestResetPassword.handlebars");
    //return link;

    return res.status(200).json({
        message: 'Passwort Reset Token created'
    });
}

async function sendPasswordResetMail(mailTo, resetLink) {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: config.mailSmtpServer,
        port: 465,
        secure: true,
        auth: {
            user: config.mailUser,
            pass: config.mailPass
        },
    });

    // sender address "Kodebi" <passwort@kodebi.de> {name: 'Kodebi', address: 'passwort@kodebi.de'}
    const mailFrom = { name: "Kodebi", address: config.mailFrom }

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: mailFrom,
        bcc: mailFrom, // also send to myself for docu
        to: mailTo, // list of receivers
        subject: "Password Reset", // Subject line
        text: "Click this link: " + resetLink, // plain text body
        html: "<b>Hello world?</b>" + resetLink, // html body
    });

    console.log("Message sent: %s", info.messageId);
}

const resetPassword = async (req, res) => {
    // We need userid, reset token, new password
    let resetToken = await passwordResetToken.findOne({ user: req.body.userId }).exec();
    if (!resetToken) {
        return res.status(401).json({
            error: 'Token not found',
        });
    }

    const keyBuffer = Buffer.from(req.body.token, "hex")
    const hashBuffer = Buffer.from(resetToken.token, "hex")
    const isValid = await crypto.timingSafeEqual(keyBuffer, hashBuffer)
    if (!isValid) {
        return res.status(401).json({
            error: "Invalid or expired password reset token",
        });
    }

    // if(!req.body.password || req.body.password.length < 6){
    //     return res.status('401').json({
    //         error: 'Password too short',
    //     });
    // }

    // { runValidators: true, context: 'query' };
    // let user = await User.findByIdAndUpdate(req.body.userId,{ $set: { password: req.body.password } },{ new: true}).exec();

    // Use save for validators
    let user = await Book.findById(req.body.userId);
    if (!user) {
        return res.status(404).json({
             error: 'User not found',
        });
    }

    user.password = req.body.password;
    try {
        await user.save();
    } catch (err) {
        return res.status(500).json({
            what: err.name
        });
    }

    await resetToken.deleteOne();

    return res.status(200).json({
        message: 'Passwort Reset succesfull'
    });
}

export default { requestPasswordReset, resetPassword }