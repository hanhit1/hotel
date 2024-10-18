const User = require('../models/user');
const Role = require('../models/role');
const e = require('express');
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
            const admins = await User.findAll({ where: { role_id: role.role_id } });
            return admins;
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
        const updated = await User.update(user, {
            where: { user_id: userId }
        });
        if (updated) {
            const updatedUser = await User.findOne({ where: { user_id: userId } });
            return updatedUser;
        }
        return { message: 'Admin not found' };
    } catch (error) {
        console.error('Error updating admin:', error);
        throw error
    }
}
exports.deleteAdmin = async (userId) => {
    try {
        const adminToDelete = await User.findOne({ where: { user_id: userId } });
        if (adminToDelete) {
            await adminToDelete.destroy();
            return adminToDelete;
        } else {
            return { message: 'User is not an admin' };
        }
    } catch (error) {
        return { message: 'Error deleting admin' };
    }
}
exports.getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ where: { email: email } });
        return user;
    }
    catch (error) {
        console.error('Error fetching user by email:', error);
        return { message: 'Error fetching user by email' };
    }
};
exports.createUser = async (user) => {
    try {
        const newUser = await User.create(user);
        return newUser;
    }
    catch (error) {
        console.error('Error creating user:', error);
        return { message: 'Error creating user' };
    }
}
