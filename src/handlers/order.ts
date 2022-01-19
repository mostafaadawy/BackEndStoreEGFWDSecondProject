import { Request, Response, Application } from "express"
import { OStore } from "../models/order"
import middlewares from "../middlewares"

const modelInst = new OStore()

const index = async (req: Request, res: Response) => {
  try {
    const Os = await modelInst.index()
    res.json({ status: "sucess", data: Os })
  } catch (e) {
    res.status(500).json("server error")
  }
}
const show = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) return res.send("Wrong or Missed User id").status(400)
    const p = await modelInst.show(parseInt(req.params.id))
    res.json({ status: "success", data: p })
  } catch (e) {
    res.status(500).json("server error")
  }
}
const create = async (req: Request, res: Response) => {
  try {
    const { order_status, user_id } = req.body
    if (!order_status || !user_id) return res.send("Wrong or Missed parameters").status(400)
    const r = await modelInst.create({
      user_id: req.body.user_id,
      order_status: req.body.order_status
    })
    res.json({ status: "sucess", data: r })
  } catch (e) {
    res.status(500).json("server error")
  }
}
const update = async (req: Request, res: Response) => {
  try {
    const { id, order_status, user_id } = req.body
    if (!id || !order_status || !user_id) return res.send("Wrong or Missed parameters").status(400)
    const r = await modelInst.update({
      id: req.body.id,
      user_id: req.body.user_id,
      order_status: req.body.order_status
    })
    res.json({ status: "sucess", data: r })
  } catch (e) {
    res.status(500).json("server error")
  }
}
const destroy = async (req: Request, res: Response) => {
  try {
    const order_id = parseInt(req.body.id)
    if (!order_id) return res.send("Wrong or Missed User id").status(400)
    const r = await modelInst.delete(parseInt(req.body.id))
    res.json({ status: "sucess", data: r })
  } catch (e) {
    res.status(500).json("server error")
  }
}
const add_product = async (req: Request, res: Response) => {
  try {
    const order_id = req.params.id
    const product_id = req.body.product_id
    const quantity = req.body.quantity
    if (order_id === undefined || product_id === undefined || quantity === undefined)
      return res.status(400).send("missing parameters")
    const r = await modelInst.add_product({
      quantity: parseInt(quantity),
      order_id: parseInt(order_id),
      product_id: parseInt(product_id)
    })
    res.json({ status: "sucess", data: r })
  } catch (err) {
    res.status(500).json("server error")
  }
}

const PRoutes = (app: Application) => {
  app.use(middlewares)
  app.get("/orders", index)
  app.get("/orders/:id", show)
  app.put("/orders", update)
  app.post("/orders", create)
  app.delete("/orders", destroy)
  app.post("/orders/:id/products", add_product)
}

export default PRoutes
