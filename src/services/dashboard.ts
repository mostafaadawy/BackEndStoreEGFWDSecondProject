import { crud } from "../helpers/traites"
import { P } from "../models/product"
import { O } from "../models/order"
export default class DashboardModel {
  async categoryFilterProduct(cat: string): Promise<P[]> {
    const r = await crud(`SELECT * FROM products WHERE category=($1)`, [cat], "error")
    return r
  }
  async userCompltedOrders(uid: string): Promise<O[]> {
    const r = await crud(`SELECT * FROM orders WHERE user_id=($1) AND order_status=('completed')`, [uid], "error")
    return r
  }
  async userActiveOrders(uid: string): Promise<O[]> {
    const r = await crud(`SELECT * FROM orders WHERE user_id=(${uid}) AND order_status=('active')`, [], "error")
    return r
  }
  async top5Products(): Promise<{ productname: string; price: number; sum: number }[]> {
    const r = await crud(
      `SELECT sum(order_products.quantity), price, productname as top_five FROM products 
          INNER JOIN order_products ON products.id = order_products.product_id 
          GROUP BY products.id ORDER BY top_five DESC LIMIT 5`,
      [],
      "Error"
    )
    return r
  }
}
