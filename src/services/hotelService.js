const Hotel = require('../models/hotel');
exports.getAllHotel = async () => {
return await Hotel.findAll();
};
exports.getHotelById = async (id) => {
return await Hotel.findByPk(id);
};
exports.updateHotel = async (id, hotel) => {
const hotelToUpdate = await Hotel.findByPk(id);
if (hotelToUpdate) {
await hotelToUpdate.update(hotel);
return hotelToUpdate;
}
return null;
}
exports.deleteHotel = async (id) => {
const hotelToDelete = await Hotel.findByPk(id);
if (hotelToDelete) {
await hotelToDelete.destroy();
return hotelToDelete;
}
return null;
}