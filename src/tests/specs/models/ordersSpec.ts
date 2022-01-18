import { OStore, O } from "../../../models/order"
import { crud, hashingKey, generateToken } from "../../../helpers/traites"
const Store = new OStore()

describe("Testing order Model", () => {
  describe("Are all of orders Model Methods Defined", () => {
    it("Is Getting all records endpoint function defined", () => {
      expect(Store.index).toBeDefined()
    })
    it("Is Create endpoint function defined", () => {
      expect(Store.create).toBeDefined()
    })
    it("Is Show endpoint function defined", () => {
      expect(Store.show).toBeDefined()
    })
    it("Is Update endpoint function defined", () => {
      expect(Store.update).toBeDefined()
    })
    it("Is Delete endpoint function defined", () => {
      expect(Store.delete).toBeDefined()
    })
  })
  describe("Test All order Model DB APIs", () => {
    beforeAll(async () => {
      await crud(
        "INSERT INTO users (firstname, lastname, hashedpassword, email) VALUES('firstname','lastname','pass','email@email.com')",
        [],
        "error"
      )
      await crud("INSERT INTO orders (order_status, user_id) VALUES('paied', 1) RETURNING *", [], "error")
    })
    afterAll(async () => {
      await crud("DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;", [], "error")
      await crud("DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;", [], "error")
    })
    it("Create method should return the created order", async () => {
      const temp = await Store.create({ order_status: "paied", user_id: 1 })
      expect(temp.order_status).toBe("paied")
    })
    it("Update method should return new updated order", async () => {
      const temp = await Store.update({ id: 1, order_status: "unpaied", user_id: 1 })
      expect(temp.order_status).toBe("unpaied")
    })
    it("Show method should return one order info", async () => {
      const temp = await Store.show(1)
      expect(temp.order_status).toBe("unpaied")
    })
    it("Delete method should return order info", async () => {
      // await crud("DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;",[],"error")
      const temp = await Store.delete(1)
      expect(temp.order_status).toBe("unpaied")
    })
  })
})
