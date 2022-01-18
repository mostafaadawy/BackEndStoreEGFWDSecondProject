import { Request, Response, NextFunction } from "express"
import { crud } from "../helpers/traites"
import config from "../config"
const isUserExistsisHeHasRights = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.decoded_id === undefined)
      return next(res.status(404).json("must authenticated first to get authorized after"))
    const r = await crud("SELECT id FROM users WHERE id=($1)", [parseInt(req.body.decoded_id)], "cant show")
    if (r[0] === undefined) return next(res.status(404).json("you have no role"))

    if (req.params.id) {
      if (parseInt(req.params.id) !== parseInt(r[0].id)) return next(res.status(404).json("you have no role"))
    }
    if (req.body.id) {
      if (parseInt(req.body.id) !== parseInt(r[0].id)) return next(res.status(404).json("you have another user id"))
    }
    config.role = 1
    config.user_id = r[0].id

    return next()
  } catch (err) {
    return next(res.status(404).json("cant authenticate"))
  }
}

export default isUserExistsisHeHasRights
