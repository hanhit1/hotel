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
exports.getAdmin = async () => {
    try {
        const role = await Role.findOne({ where: { role_name: 'Admin' } });
        if (role) {
            const users = await User.findAll({ where: { role_id: role.role_id } });
            return users;
        } else {
            return { message: 'Role not found' };
        }
    } catch (error) {
        console.error('Error fetching admin:', error);
        return { message: 'Error fetching admin' };
    }
}
exports.updateAdmin = async (userId, user) => {
    try {
        const userToUpdate = await User.findOne({ where: { user_id: userId } });
        if (userToUpdate) {
            const role = await Role.findOne({ where: { role_name: 'Admin' } });
            if (role) {
                user.role_id = role.role_id;
                await userToUpdate.update(user);
                return userToUpdate;
            } else {
                return { message: 'Role not found' };
            }
        } else {
            return { message: 'User not found' };
        }
    } catch (error) {
        console.error('Error updating admin:', error);
        return { message: 'Error updating admin' };
    }
}
exports.deleteAdmin = async (userId) => {
    try {
        const userToDelete = await User.findOne({ where: { user_id: userId } });
        if (userToDelete) {
            const role = await Role.findOne({ where: { role_name: 'Admin' } });
            if (role) {
                if (userToDelete.role_id === role.role_id) {
                    await userToDelete.destroy();
                    return userToDelete;
                } else {
                    return { message: 'User is not an admin' };
                }
            } else {
                return { message: 'Role not found' };
            }
        } else {
            return { message: 'User not found' };
        }
    } catch (error) {
        console.error('Error deleting admin:', error);
        return { message: 'Error deleting admin' };
    }
}
