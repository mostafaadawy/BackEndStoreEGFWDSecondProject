import supertest from "supertest"
import { crud } from "../../../helpers/traites"
import app from "../../../server"
let keyToken = ""

const req = supertest(app)

describe("Testing Orders / APIs Endpoints", () => {
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
  it("Create order", async () => {
    const res = await req
      .post("/orders")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${keyToken}`)
      .send({ order_status: "paied", user_id: 1 })
    expect(res.status).toBe(200)
  })
  it("Get all orders", async () => {
    const res = await req
      .get("/orders")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${keyToken}`)
    expect(res.status).toBe(200)
    expect(res.body.data.length).toBe(2)
  })
  it("Get certain order from its id", async () => {
    const res = await req
      .get("/orders/2")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${keyToken}`)
    expect(res.status).toBe(200)
    expect(res.body.data.order_status).toBe("paied")
  })
  it("update order info endpoint", async () => {
    const res = await req
      .put(`/orders`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${keyToken}`)
      .send({ id: 1, order_status: "unpaid", user_id: 1 })
    expect(res.status).toBe(200)
    expect(res.body.data.order_status).toBe("unpaid")
  })
  it("delete order api", async () => {
    const res = await req
      .delete(`/orders`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${keyToken}`)
      .send({ id: 1 })
    expect(res.status).toBe(200)
    expect(res.body.data.order_status).toBe("unpaid")
  })
})
