const express = require('express');
const app = express();
const port = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const hotelRoute = require('./routes/hotelRoute');
const authenticateJWT = require('./middlewares/authenticateJWT');
const userRoute = require('./routes/userRoute');
const reservationRoute = require('./routes/reservationRoute');
const roomRoute = require('./routes/roomRoute');
app.use(authenticateJWT);
app.use(hotelRoute);
app.use(userRoute);
app.use(reservationRoute);
app.use(roomRoute);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
