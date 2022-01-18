import { crud } from "../../helpers/traites"
describe("testing database connection", () => {
  it("database connection is ok", async () => {
    const response = await crud("SELECt NOW()", [], "error")
    expect(response[0].now).toBeDefined
  })
})
