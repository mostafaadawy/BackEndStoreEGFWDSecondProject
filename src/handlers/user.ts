import { Request, Response, Application } from "express"
import { U, UStore } from "../models/user"
import { hashingKey, generateToken } from "../helpers/traites"
import isDataOriginalNoMOdifictions from "../middlewares/authenticate"
import isUserExistsisHeHasRights from "../middlewares/authorizematchparams"

const modelInst = new UStore()

const index = async (req: Request, res: Response) => {
  try {
    const Us = await modelInst.index()
    res.json({ status: "sucess", data: Us })
  } catch (e) {
    res.status(500).json("server error")
  }
}
const show = async (req: Request, res: Response) => {
  try {
    const user_id = parseInt(req.params.id)
    if (!user_id) return res.send("Wrong or Missed User id").status(400)
    const u = await modelInst.show(parseInt(req.params.id))
    return res.json({ status: "sucess", data: u })
  } catch (e) {
    return res.status(500).json("server error")
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, password, email } = req.body
    if (!firstname || !lastname || !password || !email) return res.send("Wrong or Missed parameters").status(400)
    const r = await modelInst.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      hashedpassword: hashingKey(req.body.password)
    })
    return res.json({ status: "sucess", data: r })
  } catch (e) {
    return res.status(500).json("server error")
  }
}
const update = async (req: Request, res: Response) => {
  try {
    const { id, firstname, lastname, password, email } = req.body
    if (!id || !firstname || !lastname || !password || !email) return res.send("Wrong or Missed parameters").status(400)
    const r = await modelInst.update({
      id: req.body.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      hashedpassword: hashingKey(req.body.password),
      email: req.body.email
    })
    return res.json({ status: "sucess", data: r })
  } catch (e) {
    return res.status(500).json("server error")
  }
}
const destroy = async (req: Request, res: Response) => {
  try {
    const user_id = parseInt(req.body.id)
    if (!user_id) return res.send("Wrong or Missed User id").status(400)
    const r = await modelInst.delete(parseInt(req.body.id))
    return res.json({ status: "sucess", data: r })
  } catch (e) {
    return res.status(500).json("server error")
  }
}
const authen = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.send("Wrong or Missed parameters").status(400)
    const r = await modelInst.authen(req.body.email, req.body.password)
    if (r === null || r === undefined) {
      res.status(401)
      res.json({
        status: "wrong credintials",
        token: null
      })
    } else {
      return res.json({
        status: "success",
        token: generateToken(r.id as number, r.firstname as string, r.lastname as string, r.email as string) as string
      })
    }
  } catch (e) {
    return res.status(500).json("server error")
  }
}
const URoutes = (app: Application) => {
  app.get("/users", isDataOriginalNoMOdifictions, isUserExistsisHeHasRights, index)
  app.get("/users/:id", isDataOriginalNoMOdifictions, isUserExistsisHeHasRights, show)
  app.put("/users", isDataOriginalNoMOdifictions, isUserExistsisHeHasRights, update)
  app.post("/users", create)
  app.delete("/users", isDataOriginalNoMOdifictions, isUserExistsisHeHasRights, destroy)
  app.post("/login", authen)
}
export default URoutes
