import supertest from "supertest"
import app from "../../server"
const request = supertest(app)
describe("Server homepage responce", () => {
  it("Test home page end-point", async () => {
    const response = await request.get("/")
    expect(response.status).toBe(200)
  })
})
