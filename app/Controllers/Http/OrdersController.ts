import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'

export default class OrdersController {
  public async index({ view }: HttpContextContract) {
    const orders = await Order.query().preload('items')
    return await view.render('orders/index', { orders })
  }

  public async show({ view, params }: HttpContextContract) {
    const order = await Order.query().where('id', '=', params.id).preload('items').firstOrFail()
    return await view.render('orders/show/show.edge', { order })
  }
}
