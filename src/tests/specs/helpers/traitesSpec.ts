import { crud, hashingKey,isSameKey,generateToken,prepareUser,getUserToken } from "../../../helpers/traites"

describe("Testing traites different methods that can be used as helpers ", () => {
  describe("are all of the needed helping functions defined", () => {
    it("Is crud used for http verb db api is defined", () => {
      expect(crud).toBeDefined()
    })
    it("Is hashing password function is defined", () => {
      expect(hashingKey).toBeDefined()
    })
    it("Is key validation or password validation function is defined", () => {
      expect(isSameKey).toBeDefined()
    })
    it("Is generating token function defined", () => {
      expect(generateToken).toBeDefined()
    })
    it("Is creating user for testing function is defined", () => {
        expect(prepareUser).toBeDefined()
      })
    it("Is logging and getting token function is defined", () => {
        expect(getUserToken).toBeDefined()
    })
  })
})
