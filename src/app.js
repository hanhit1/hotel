const express = require('express');
const app = express();
const port = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const hotelRoute = require('./routes/hotelRoute');
const checkRole = require('./middlewares/checkRole');
const authenticateJWT = require('./middlewares/authenticateJWT');
app.use(authenticateJWT,checkRole(["SuperAdmin"]),hotelRoute);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
