import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

const isDataOriginalNoMOdifictions = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (authHeader === undefined) return next(res.status(404).json("Token is Needed"))
    const bearer = authHeader?.split(" ")[0].toLowerCase()
    if (bearer !== "bearer") return next(res.status(404).json("Defferent Token Type!"))
    const token = authHeader?.split(" ")[1]
    if (token === undefined) return next(res.status(404).json("Authentication Token Needed!"))
    const decoded = verify(token as string, process.env.JWT_SECRET_KEY as string)
    if (!decoded) return next(res.status(404).json("Authentication Failed!"))
    req.body.decoded_id = decoded.user.id
    return next()
  } catch (err) {
    next(res.status(404).json("Something Wrong in Authentication!"))
  }
}

export default isDataOriginalNoMOdifictions
