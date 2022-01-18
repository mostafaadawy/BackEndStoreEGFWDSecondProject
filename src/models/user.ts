import { crud, isSameKey } from "../helpers/traites"
export type U = {
  id?: number
  firstname: string
  lastname: string
  email: string
  hashedpassword: string
}
export class UStore {
  async index(): Promise<U[]> {
    return await crud("SELECT id, firstname, lastname, email FROM users", [], "cant find")
  }
  async show(id: number): Promise<U> {
    const r = await crud("SELECT id, firstname, lastname, email FROM users WHERE id=($1)", [id], "cant show")
    return r[0]
  }
  async create(u: U): Promise<U> {
    const r = await crud(
      "INSERT INTO users (firstname, lastname, hashedpassword, email) VALUES($1, $2, $3, $4) RETURNING id, firstname, lastname, email",
      [u.firstname, u.lastname, u.hashedpassword, u.email],
      "cant create"
    )
    return r[0]
  }
  async update(u: U): Promise<U> {
    const r = await crud(
      "UPDATE users SET firstname=($2), lastname=($3), hashedpassword=($4),email=($5) WHERE id=($1) RETURNING id, firstname, lastname, email",
      [u.id, u.firstname, u.lastname, u.hashedpassword, u.email],
      "cant update"
    )
    return r[0]
  }
  async delete(id: number): Promise<U> {
    const r = await crud("DELETE FROM users WHERE id=($1) RETURNING *", [id], "cant delete")
    return r[0]
  }
  async authen(email: string, password: string): Promise<U | null> {
    const r = await crud("SELECT * FROM users WHERE email=($1)", [email], "cant authenticate")
    if (r[0] === undefined) return null
    if (isSameKey(password, r[0].hashedpassword)) return r[0]
    return null
  }
}
