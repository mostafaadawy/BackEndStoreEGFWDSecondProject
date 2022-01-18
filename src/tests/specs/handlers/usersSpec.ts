import supertest from "supertest"
import { crud } from "../../../helpers/traites"
import app from "../../../server"
let keyToken = ""
const req = supertest(app)

describe("Testing Users' APIs Endpoints", () => {
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
  it("login get nothing for wrong credinatials", async () => {
    const res = await req
      .post("/login")
      .set("Content-type", "application/json")
      .send({ email: "email@email.com", password: "fake" })
    expect(res.status).toBe(401)
    expect(res.body.token).toBe(null)
  })
  it("Get all users", async () => {
    const res = await req
      .get("/users")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${keyToken}`)
    // console.log(keyToken) to have console work comment expect in it function
    expect(res.status).toBe(200)
    expect(res.body.data.length).toBe(2)
  })
  it("Get certain user from its id", async () => {
    const res = await req
      .get(`/users/2`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${keyToken}`)
    expect(res.status).toBe(200)
    expect(res.body.data.firstname).toBe("ufname")
  })
  it("should refuse to send data to authentecated but not autherized user", async () => {
    const res = await req
      .get(`/users/1`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${keyToken}`)
    expect(res.status).toBe(404)
  })
  it("update user info endpoint", async () => {
    const res = await req
      .put(`/users`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${keyToken}`)
      .send({ id: 2, firstname: "mostafa", lastname: "sayed", password: "test", email: "mostafa@mail.com" })
    expect(res.status).toBe(200)
    expect(res.body.data.firstname).toBe("mostafa")
  })
  it("delete user api", async () => {
    const res = await req
      .delete(`/users`)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${keyToken}`)
      .send({ id: 2 })
    expect(res.status).toBe(200)
    expect(res.body.data.firstname).toBe("mostafa")
  })
})
