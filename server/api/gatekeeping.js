// const requireToken = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization;
//     const user = await User.findByToken(token);
//     req.user = user;
//     next();
//   } catch (e) {
//     next(e);
//   }
// };

// function adminCheck(req, res, next) {
//   if (req.user.role === "admin") {
//     next();
//   } else {
//     return res.sendStatus(401);
//   }
// }

// module.exports = { requireToken, adminCheck };

//C: keep working on this!
