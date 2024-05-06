const {loginController} = require("../../controllers/login/loginController")

const loginHandler = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await loginController(email, password);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { loginHandler };
