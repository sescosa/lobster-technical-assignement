import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Event from '@ioc:Adonis/Core/Event'
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

  public async update({ request, response, params }: HttpContextContract) {
    const orderData = await request.validate({ schema: updateOrderSchema })

    const order = await Order.findOrFail(params.id)
    order.customersName = orderData.customersName
    order.customersEmail = orderData.customersEmail
    order.customersPhone = orderData.customersPhone
    await order.save()

    Event.emit('domain:orders:order_updated', { order })

    return response.redirect().toRoute('OrdersController.show', [params.id])
  }
}

const updateOrderSchema = schema.create({
  customersName: schema.string(),
  customersEmail: schema.string(),
  customersPhone: schema.string(),
})