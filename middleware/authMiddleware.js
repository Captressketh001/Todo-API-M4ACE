import jwt from "jsonwebtoken";

export const protect = async (
  req,
  res,
  next
) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    console.log(token)
    if (!token) {
      res.status(401).json({ message: "Not authenticated, no token" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) 
    req.user = decoded.id
    console.log(req.user)
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authenticated, token failed" });
  }
};