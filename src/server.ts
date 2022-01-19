import express, { Request, Response } from "express"
import bodyParser from "body-parser"
import URoutes from "./handlers/user"
import PRoutes from "./handlers/product"
import ORoutes from "./handlers/order"
import logger from "./middlewares/logger"
import DRoutes from "./handlers/dashboard"
const app: express.Application = express()
const address: string = "localhost:3000"

app.use(bodyParser.json())
app.use(express.json())
app.get("/", function (req: Request, res: Response) {
  res.send("Welcome to the second project !")
})
URoutes(app)
PRoutes(app)
DRoutes(app)
ORoutes(app)
app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})
export default app
