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
const mailRoute = require('./routes/mailRoute');
const i18n = require('./middlewares/i18n');
const upload = require('./routes/fileRoute');
app.use(upload);
app.use(i18n);
app.use(express.json());
app.get('/not-found', (req, res) => {
    res.status(404).send({ error: res.__('error.not_found') });
});

app.get('/invalid-input', (req, res) => {
    res.status(400).send({ error: res.__('error.invalid_input') });
});

app.get('/unauthorized', (req, res) => {
    res.status(403).send({ error: res.__('error.unauthorized') });
});
//app.use(authenticateJWT);
app.use(mailRoute);
app.use(hotelRoute);
app.use(userRoute);
app.use(reservationRoute);
app.use(roomRoute);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
