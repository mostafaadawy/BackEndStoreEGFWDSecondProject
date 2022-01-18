import DashboardModel from "../../../services/dashboard"
import { crud } from "../../../helpers/traites"
const Store = new DashboardModel()

describe("Testing service database apis ", () => {
  describe("Are all of service Model Methods Defined", () => {
    it("Is filter product by category is defined", () => {
      expect(Store.categoryFilterProduct).toBeDefined()
    })
    it("Is filter order by status complete is defined", () => {
      expect(Store.userCompltedOrders).toBeDefined()
    })
    it("Is filter order by  status active is defined", () => {
      expect(Store.userActiveOrders).toBeDefined()
    })
    it("Is sorting and limit selection by 5 most or top function is defined", () => {
      expect(Store.top5Products).toBeDefined()
    })
  })
})
