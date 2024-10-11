const User = require('../models/user');
const Role = require('../models/role');
exports.getUserWithRoleName = async (userId) => {
    try {
        const user = await User.findOne({ where: { user_id: userId } });
        if (user) {
            const role = await Role.findOne({ where: { role_id: user.role_id } });
            if (role) {
                return {
                    user_id: user.user_id,
                    name: user.name,
                    phone: user.phone,
                    address: user.address,
                    email: user.email,
                    role: role.role_name 
                };
            } else {
                return { message: 'Role not found' };
            }
        } else {
            return { message: 'User not found' };
        }
    } catch (error) {
        console.error('Error fetching user or role:', error);
        return { message: 'Error fetching user or role' };
    }
};
