import isDataOriginalNoMOdifictions from "../../../middlewares/authenticate"
import isUserExists from "../../../middlewares/authorizeexists"
import isUserExistsisHeHasRights from "../../../middlewares/authorizematchparams"

describe("Testing customed middlewares ", () => {
  describe("Are all of theses middlewares are defined", () => {
    it("Is data checking for any modifocation or ulter function is defined", () => {
      expect(isDataOriginalNoMOdifictions).toBeDefined()
    })
    it("Is preventing old and non esisted longer users function is defined", () => {
      expect(isUserExists).toBeDefined()
    })
    it("Is preventing different users from accessing accept their issues function is defined", () => {
      expect(isUserExistsisHeHasRights).toBeDefined()
    })
  })
})
