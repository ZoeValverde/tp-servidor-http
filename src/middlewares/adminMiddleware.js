import jwt from "jsonwebtoken"


const adminMiddleware = (req, res, next) => {
  const header = req.headers.authorization
  
  const token = header.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.userLogged = decoded
      
    const userLogged = req.userLogged
          
      if (userLogged.email !== process.env.ADMIN_EMAIL) {
    
    return res.status(403).json({
      success: false,
      message: "Acceso denegado, email no autorizado"
    })
      }
  } catch (e) {
    return res.status(401).json({
      success: false,
      error: e.message
    })
 }
  next()
}

export{ adminMiddleware}