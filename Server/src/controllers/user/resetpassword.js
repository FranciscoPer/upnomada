/*
 * ============================================
 * Controlador para Generar y Enviar un Token de Restablecimiento
 * ============================================
 */
/*
const { User } = require('../../db');
const crypto = require('crypto');
const sendEmail = require('../../utils/sendEmail');

const requestPasswordReset = async (email) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('No account with that email address exists.');
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const resetURL = `http://${process.env.FRONT_END_HOST}/reset/${token}`;

    const message = `
        You are receiving this because you (or someone else) have requested the reset of the password for your account.
        Please click on the following link, or paste this into your browser to complete the process:
        ${resetURL}
        If you did not request this, please ignore this email and your password will remain unchanged.
    `;

    await sendEmail({
        to: user.email,
        subject: 'Password Reset',
        text: message
    });

    return { message: 'Recovery email sent.' };
};

module.exports = { requestPasswordReset };
*/

/*
 * ============================================
 * Controlador para Restablecer la Contraseña
 * ============================================
 */
/*
const { User } = require('../../db');
const bcrypt = require('bcryptjs');

const resetPassword = async (token, newPassword) => {
    const user = await User.findOne({
        where: {
            resetPasswordToken: token,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        }
    });

    if (!user) {
        throw new Error('Password reset token is invalid or has expired.');
    }

    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    
    await user.save();
    
    return { message: 'Password has been reset.' };
};

module.exports = { resetPassword };
*/

/*
 * ============================================
 * Handlers para Solicitudes de Recuperación de Contraseña
 * ============================================
 */
/*
// Handler para solicitar reseteo de contraseña
const { requestPasswordReset } = require('../../controllers/user/resetPasswordController');
const requestPasswordResetHandler = async (req, res) => {
    try {
        const response = await requestPasswordReset(req.body.email);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { requestPasswordResetHandler };

// Handler para confirmar reseteo de contraseña
const { resetPassword } = require('../../controllers/user/resetPasswordConfirmController');
const resetPasswordHandler = async (req, res) => {
    try {
        const response = await resetPassword(req.body.token, req.body.newPassword);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { resetPasswordHandler };
*/

/*
 * ============================================
 * Configuración de Rutas para Usuario
 * ============================================
 */
/*
const express = require('express');
const { requestPasswordResetHandler, resetPasswordHandler } = require('../handlers/user');
const router = express.Router();
router.post('/request-reset', requestPasswordResetHandler);
router.post('/reset-password', resetPasswordHandler);
module.exports = router;
*/
