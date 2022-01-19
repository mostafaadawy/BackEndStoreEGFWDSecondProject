import { UStore, U } from "../../../models/user"
import { crud, hashingKey, generateToken } from "../../../helpers/traites"
const Store = new UStore()

describe("Testing User Model", () => {
  describe("Are all of users Model Methods Defined", () => {
    it("Is Authentication endpoint function defined", () => {
      expect(Store.authen).toBeDefined()
    })
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
  describe("Test All user Model DB APIs", () => {
    beforeAll(async () => {
      await crud(
        "INSERT INTO users (firstname, lastname, hashedpassword, email) VALUES('firstname','lastname','pass','email@email.com')",
        [],
        "error"
      )
    })
    afterAll(async () => {
      await crud("DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;", [], "error")
    })
    it("Create method should return the user", async () => {
      const temp = await Store.create({
        firstname: "fname",
        lastname: "lname",
        hashedpassword: hashingKey("pass"),
        email: "test@mail.com"
      })
      expect(temp.firstname).toBe("fname")
    })
    it("Authenticate method should return the authenticated user", async () => {
      const temp = await Store.authen("test@mail.com", "pass")
      expect(temp?.firstname).toBe("fname")
    })
    it("Index should return no of saved users", async () => {
      const temp = await Store.index()
      expect(temp.length).toBe(2)
    })
    
    it("Update method should return new user info", async () => {
      const temp = await Store.update({
        id: 1,
        firstname: "f2name",
        lastname: "l2name",
        hashedpassword: "test",
        email: "test2@mail.com"
      })
      expect(temp.firstname).toBe("f2name")
    })
    it("Show method should return user info", async () => {
      const temp = await Store.show(1)
      expect(temp.firstname).toBe("f2name")
    })
    it("Delete method should return new user info", async () => {
      const temp = await Store.delete(1)
      expect(temp.firstname).toBe("f2name")
    })
  })
})
