import { crud, isSameKey } from "../helpers/traites"
export type P = {
  id?: number
  productname: string
  price: number
  category: string
}
export class PStore {
  async index(): Promise<P[]> {
    try {
      return await crud("SELECT * FROM products", [], "cant find")
    } catch (e) {
      throw new Error(`${e}`)
    }
  }
  async show(id: number): Promise<P> {
    try {
      const r = await crud("SELECT * FROM products WHERE id=($1)", [id], "cant show")
      return r[0]
    } catch (e) {
      throw new Error(`${e}`)
    }
  }
  async create(p: P): Promise<P> {
    try {
      const r = await crud(
        "INSERT INTO products (productname, price, category) VALUES($1, $2, $3) RETURNING *",
        [p.productname, p.price, p.category],
        "cant create"
      )
      return r[0]
    } catch (e) {
      throw new Error(`${e}`)
    }
  }
  async update(p: P): Promise<P> {
    try {
      const r = await crud(
        "UPDATE products SET productname=($2), price=($3), category=($4) WHERE id=($1) RETURNING *",
        [p.id, p.productname, p.price, p.category],
        "cant update"
      )
      return r[0]
    } catch (e) {
      throw new Error(`${e}`)
    }
  }
  async delete(id: number): Promise<P> {
    try {
      const r = await crud("DELETE FROM products WHERE id=($1) RETURNING *", [id], "cant delete")
      return r[0]
    } catch (e) {
      throw new Error(`${e}`)
    }
  }
}
