import {OPStore} from "../../../models/order_products"
import { crud } from "../../../helpers/traites"
const Store = new OPStore()

describe("Testing order_products Model", () => {
  describe("Are all of order_products Model Methods Defined", () => {
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
  describe("Test All order_products Model DB APIs", () => {
    beforeAll(async () => {
        await crud("INSERT INTO users (firstname, lastname, hashedpassword, email) VALUES('firstname','lastname','pass','email@email.com')",
                [],"error")    
        await crud("INSERT INTO products (productname, price, category) VALUES('shoes', 200, 'men') RETURNING *",
            [],"error")
        await crud("INSERT INTO orders (order_status, user_id) VALUES('paied', 1) RETURNING *", [], "error")
        await crud("INSERT INTO order_products (order_id, product_id, quantity) VALUES(1, 1, 3) RETURNING *",[],"error")
    })
    afterAll(async () => {
        await crud("DELETE FROM order_products;", [], "error")
        await crud("DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;", [], "error")
        await crud("DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;", [], "error")
        await crud("DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;", [], "error")
    })
    it("Create method should return the created order_products", async () => {
      const temp=await Store.create({order_id: 1 ,product_id: 1, quantity:5})
      expect(parseInt(temp.order_id as unknown as string)).toBe(1)
    })
    it("Update method should return new updated order_products", async () => {
      const temp=await Store.update({id:1,order_id: 1 ,product_id: 1, quantity:5})
      expect(temp.quantity).toBe(5)
    })
    it("Show method should return one order_products info", async () => {
      const temp=await Store.show(1)
      expect(temp.quantity).toBe(5)
    })
    it("Delete method should return order_products info", async () => {
      const temp=await Store.delete(1)
      expect(temp.quantity).toBe(5)
    })

  })
})
