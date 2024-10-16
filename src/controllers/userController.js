const userService = require('../services/userService');
exports.getAdmin = async (req, res) => {
   try {
       const admin = await userService.getAdmin();
       res.status(200).json(admin);
   } catch (error) {
         console.error('Error getting admin:', error);
         res.status(500).json({ message: 'Error getting admin' });
    }
}
exports.updateAdmin = async (req, res) => {
    try {
        const user = await userService.updateAdmin(req.params.id, req.body);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating admin:', error);
        res.status(500).json({ message: 'Error updating admin' });
    }
};
exports.deleteAdmin = async (req, res) => {
    try {
        const user = await userService.deleteAdmin(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting admin:', error);
        res.status(500).json({ message: 'Error deleting admin' });
    }
}