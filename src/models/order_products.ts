import { crud } from "../helpers/traites"
export type OP = {
  id?: number
  quantity: number
  order_id: number
  product_id: number
}
export class OPStore {
  async index(): Promise<OP[]> {
    return await crud("SELECT * FROM order_products", [], "cant find")
  }
  async show(id: number): Promise<OP> {
    const r = await crud("SELECT * FROM order_products WHERE id=($1)", [id], "cant show")
    return r[0]
  }
  async create(op: OP): Promise<OP> {
    const r = await crud(
      "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *",
      [op.quantity, op.order_id, op.product_id],
      "cant create"
    )
    return r[0]
  }
  async update(op: OP): Promise<OP> {
    const r = await crud(
      "UPDATE order_products SET quantity=($2), order_id=($3), product_id=($4) WHERE id=($1) RETURNING *",
      [op.id, op.quantity, op.order_id, op.product_id],
      "cant update"
    )
    return r[0]
  }
  async delete(id: number): Promise<OP> {
    const r = await crud("DELETE FROM order_products WHERE id=($1) RETURNING *", [id], "cant delete")
    return r[0]
  }
}
