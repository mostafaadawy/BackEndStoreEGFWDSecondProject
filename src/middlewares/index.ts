import logger from "./logger"
import isDataOriginalNoMOdifictions from "./authenticate"
import isUserExistsis from "./authorizeexists"
const middlewares = [isDataOriginalNoMOdifictions, isUserExistsis]
export default middlewares
