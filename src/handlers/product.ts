import { Request, Response, Application } from "express"
import { PStore } from "../models/product"
import middlewares from "../middlewares"

const modelInst = new PStore()

const index = async (req: Request, res: Response) => {
  try {
    const Ps = await modelInst.index()
    res.json({ status: "sucess", data: Ps })
  } catch (e) {
    res.status(500).json("server error")
  }
}
const show = async (req: Request, res: Response) => {
  try {
    const product_id = parseInt(req.params.id)
    if (!product_id) return res.send("Wrong or Missed User id").status(400)
    const p = await modelInst.show(parseInt(req.params.id))
    res.json({ status: "sucess", data: p })
  } catch (e) {
    res.status(500).json("server error")
  }
}
const create = async (req: Request, res: Response) => {
  try {
    const { category, price, productname } = req.body
    if (!category || !price || !productname) return res.send("Wrong or Missed parameters").status(400)
    const r = await modelInst.create({
      price: req.body.price,
      productname: req.body.productname,
      category: req.body.category
    })
    res.json({ status: "sucess", data: r })
  } catch (e) {
    console.log(e)
    res.status(500).json("server error")
  }
}
const update = async (req: Request, res: Response) => {
  try {
    const { id, category, price, productname } = req.body
    if (!id || !category || !price || !productname) return res.send("Wrong or Missed parameters").status(400)
    const r = await modelInst.update({
      id: req.body.id,
      price: req.body.price,
      productname: req.body.productname,
      category: req.body.category
    })
    res.json({ status: "sucess", data: r })
  } catch (e) {
    res.status(500).json("server error")
  }
}
const destroy = async (req: Request, res: Response) => {
  try {
    const product_id = parseInt(req.body.id)
    if (!product_id) return res.send("Wrong or Missed User id").status(400)
    const r = await modelInst.delete(parseInt(req.body.id))
    res.json({ status: "sucess", data: r })
  } catch (e) {
    res.status(500).json("server error")
  }
}
const PRoutes = (app: Application) => {
  app.use(middlewares)
  app.get("/products", index)
  app.get("/products/:id", show)
  app.put("/products", update)
  app.post("/products", create)
  app.delete("/products", destroy)
}

export default PRoutes
