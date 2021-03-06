import { crud } from "../helpers/traites"
import { OP } from "../models/order_products"
export type O = {
  id?: number
  order_status: string
  user_id: number
}
export class OStore {
  async index(): Promise<O[]> {
    try {
      return await crud("SELECT * FROM orders", [], "cant find")
    } catch (e) {
      throw new Error(`${e}`)
    }
  }
  async show(id: number): Promise<O> {
    try {
      const r = await crud("SELECT * FROM orders WHERE id=($1)", [id], "cant show")
      return r[0]
    } catch (e) {
      throw new Error(`${e}`)
    }
  }
  async create(o: O): Promise<O> {
    try {
      const r = await crud(
        "INSERT INTO orders (order_status, user_id) VALUES($1, $2) RETURNING *",
        [o.order_status, o.user_id],
        "cant create"
      )
      return r[0]
    } catch (e) {
      throw new Error(`${e}`)
    }
  }
  async update(o: O): Promise<O> {
    try {
      const r = await crud(
        "UPDATE orders SET order_status=($2), user_id=($3) WHERE id=($1) RETURNING *",
        [o.id, o.order_status, o.user_id],
        "cant update"
      )
      return r[0]
    } catch (e) {
      throw new Error(`${e}`)
    }
  }
  async delete(id: number): Promise<O> {
    try {
      const r = await crud("DELETE FROM orders WHERE id=($1) RETURNING *", [id], "cant delete")
      return r[0]
    } catch (e) {
      throw new Error(`${e}`)
    }
  }
  async add_product(op: OP): Promise<OP> {
    try {
      const r = await crud(
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *",
        [op.quantity, op.order_id, op.product_id],
        "cant add"
      )
      return r[0]
    } catch (e) {
      throw new Error(`${e}`)
    }
  }
}
