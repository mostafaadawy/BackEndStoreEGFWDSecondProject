import express from "express"

const logger = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  console.log(`current visited url is: ${req.url}`)
  next()
}

export default logger
