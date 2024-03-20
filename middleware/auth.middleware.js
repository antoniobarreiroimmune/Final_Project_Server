const roleMiddleware = (requiredRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.sendStatus(401); 
      }
      
      
      requiredRoles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

      if (!requiredRoles.includes(req.user.role)) {
        return res.sendStatus(403); 
      }
      
      next(); 
    } catch (err) {
      next(err); 
    }
  };
};

module.exports = roleMiddleware;
