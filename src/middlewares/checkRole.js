const userService = require('../services/userService.js');
const checkRole = (requiredRoles) => {
    return async (req, res, next) => {
      const userId = req.user.id; 
  const user = await userService.getUserWithRoleName(userId);
  console.log(user);
  console.log(requiredRoles);
      if (!requiredRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Bạn không có quyền truy cập' });
      }
      next();
    };
  };
module.exports = checkRole;