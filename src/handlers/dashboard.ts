import express, { Request, Response } from "express"
import DashboardModel from "../services/dashboard"
import middlewares from "../middlewares"

const servModel = new DashboardModel()

const categoryFilterProduct = async (req: Request, res: Response) => {
  if (req.body.category === undefined)
    return res.status(404).send("Error: should be post and body should include category")
  const r = await servModel.categoryFilterProduct(req.body.category)
  res.json({ status: "success", data: r }).status(200)
}

const userCompltedOrders = async (req: Request, res: Response) => {
  if (req.body.user_id === undefined)
    return res.status(404).send("Error: should be post and body should include user_id")
  if (parseInt(req.body.decoded_id) !== parseInt(req.body.user_id)) return res.status(401).send("defferent user ids")
  const r = await servModel.userCompltedOrders(req.body.user_id)
  if (r[0] === undefined) return res.status(200).send("this user_id has nothing recorded")
  res.json(r).status(200)
}

const userActiveOrders = async (req: Request, res: Response) => {
  if (req.body.user_id === undefined)
    return res.status(404).send("Error: should be post and body should include user_id")
  if (parseInt(req.body.decoded_id) !== parseInt(req.body.user_id)) return res.status(401).send("defferent user ids")
  const r = await servModel.userActiveOrders(req.body.user_id)
  if (r[0] === undefined) return res.status(200).send("this user_id has nothing recorded")
  res.json(r)
}

const top5Products = async (_req: Request, res: Response) => {
  try {
    const t5 = await servModel.top5Products()
    res.json({ status: "sucess", data: t5 })
  } catch (e) {
    console.log(e)
    res.status(500).json("server error")
  }
}

const DRoutes = (app: express.Application) => {
  app.use(middlewares)
  app.post("/products/category", categoryFilterProduct)
  app.post("/orders/completed", userCompltedOrders)
  app.post("/orders/active", userActiveOrders)
  app.get("/products/top", top5Products)
}

export default DRoutes
