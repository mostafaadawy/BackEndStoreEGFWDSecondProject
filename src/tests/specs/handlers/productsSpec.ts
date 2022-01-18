import supertest from "supertest"
import { crud } from "../../../helpers/traites"
import app from "../../../server"
let keyToken = ""

const req = supertest(app)

describe("Testing Products' APIs Endpoints", () => {
  beforeAll(async () => {
    await crud(
      "INSERT INTO users (firstname, lastname, hashedpassword, email) VALUES('firstname','lastname','pass','email@email.com')",
      [],
      "error"
    )
    await crud(
      "INSERT INTO products (productname, price, category) VALUES('shoes', 200, 'men') RETURNING *",
      [],
      "error"
    )
  })
  afterAll(async () => {
    await crud("DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;", [], "error")
    await crud("DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;", [], "error")
  })
  it("Create user", async () => {
    const res = await req
      .post("/users")
      .set("Content-type", "application/json")
      .send({ firstname: "ufname", lastname: "ulname", password: "test", email: "utest@mail.com" })
    expect(res.status).toBe(200)
  })
  it("login generate token for right credinatials", async () => {
    const res = await req
      .post("/login")
      .set("Content-type", "application/json")
      .send({ email: "utest@mail.com", password: "test" })
    const { token } = res.body
    keyToken = token
    expect(res.status).toBe(200)
  })
  it("Create product", async () => {
    const res = await req
      .post("/products")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${keyToken}`)
      .send({ productname: "t-shirt", price: 150, category: "clothes" })
    expect(res.status).toBe(200)
  })
  it("Get all products", async () => {
    const res = await req
      .get("/products")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${keyToken}`)
    // console.log(keyToken) to have console work comment expect in it function
    expect(res.status).toBe(200)
    expect(res.body.data.length).toBe(2)
  })
  it("Get certain user from its id", async () => {
    const res = await req
      .get(`/products/1`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${keyToken}`)
    expect(res.status).toBe(200)
    expect(res.body.data.category).toBe("men")
  })
  it("update product info endpoint", async () => {
    const res = await req
      .put(`/products`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${keyToken}`)
      .send({ id: 2, productname: "t2-shirt", price: 150, category: "2clothes" })
    expect(res.status).toBe(200)
    expect(res.body.data.category).toBe("2clothes")
  })
  it("delete product api", async () => {
    const res = await req
      .delete(`/products`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${keyToken}`)
      .send({ id: 1 })
    expect(res.status).toBe(200)
    expect(res.body.data.category).toBe("men")
  })
})
