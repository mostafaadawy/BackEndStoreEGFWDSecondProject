import supertest from "supertest"
import app from "../../../server"
import { crud, prepareUser, getUserToken } from "../../../helpers/traites"

let keyToken: string = ""
const req = supertest(app)

describe("Testing services APIs Endpoints", () => {
  beforeAll(async () => {
    await prepareUser()
    keyToken = await getUserToken()
    for (let i = 0; i < 10; i++) {
      await req
        .post("/products")
        .set("Authorization", `Bearer ${keyToken}`)
        .send({ productname: `prod-${i}`, price: i * 200, category: `category-${i}` })
    }

    for (let i = 0; i < 5; i++) {
      await req.post("/orders").set("Authorization", `Bearer ${keyToken}`).send({ order_status: "active", user_id: 1 })
      await req
        .post("/orders")
        .set("Authorization", `Bearer ${keyToken}`)
        .send({ order_status: "completed", user_id: 1 })
    }
    for (let i = 0; i < 7; i++) {
      await req
        .post(`/orders/${i}/products`)
        .set("Authorization", `Bearer ${keyToken}`)
        .send({ product_id: i, quantity: i * 15 })
    }
  })
  afterAll(async () => {
    await crud("DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;", [], "error")
    await crud("DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;", [], "error")
    await crud("DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;", [], "error")
    await crud("DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;", [], "error")
  })
  it("should filtter the products by the required category wrong input", async () => {
    await req
      .post("/products/category")
      .set("Authorization", `Bearer ${keyToken}`)
      .send({ fake: "category-3" })
      .expect(404)
  })

  it("should filtter the products by the required category", async () => {
    await req
      .post("/products/category")
      .set("Authorization", `Bearer ${keyToken}`)
      .send({ category: "category-1" })
      .expect(200)
  })

  it("should return all completed oreder wrong input", async () => {
    await req.post("/orders/completed").set("Authorization", `Bearer ${keyToken}`).send({ user_id: 400 }).expect(401)
  })
  it("should return all completed oreder ", async () => {
    await req.post("/orders/completed").set("Authorization", `Bearer ${keyToken}`).send({ user_id: 1 }).expect(200)
  })

  it("should return all active order wrong input", async () => {
    await req.post("/orders/acive").set("Authorization", `Bearer ${keyToken}`).send({ user_id: 400 }).expect(404)
  })

  it("should return all active order ", async () => {
    await req.post("/orders/active").set("Authorization", `Bearer ${keyToken}`).send({ user_id: 1 }).expect(200)
  })

  it("Top 5 products should be the output", async () => {
    await req.get("/products/top").set("Authorization", `Bearer ${keyToken}`).expect(200)
  })
})
