import { PStore, P } from "../../../models/product"
import { crud, hashingKey, generateToken } from "../../../helpers/traites"
const Store = new PStore()

describe("Testing Product Model", () => {
  describe("Are all of productss Model Methods Defined", () => {
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
  describe("Test All Product Model DB APIs", () => {
    beforeAll(async () => {
      await crud(
        "INSERT INTO products (productname, price, category) VALUES('shoes', 200, 'men') RETURNING *",
        [],
        "error"
      )
    })
    afterAll(async () => {
      await crud("DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;", [], "error")
    })
    it("Create method should return the created product", async () => {
      const temp = await Store.create({ productname: "pname", price: 5, category: "black-middle" })
      expect(temp.category).toBe("black-middle")
    })
    it("Update method should return new updated product", async () => {
      const temp = await Store.update({ id: 1, productname: "p1name", price: 15, category: "black-end" })
      expect(temp.category).toBe("black-end")
    })
    it("Show method should return one product info", async () => {
      const temp = await Store.show(1)
      expect(temp.category).toBe("black-end")
    })
    it("Delete method should return product info", async () => {
      const temp = await Store.delete(1)
      expect(temp.category).toBe("black-end")
    })
  })
})
