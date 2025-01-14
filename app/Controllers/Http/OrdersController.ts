import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Event from '@ioc:Adonis/Core/Event'
import Order from 'App/Models/Order'

export default class OrdersController {
  public async index({ view }: HttpContextContract) {
    const orders = await Order.query().preload('items')
    return await view.render('orders/index', { orders })
  }

  public async show({ view, params }: HttpContextContract) {
    const order = await Order.query().where('id', '=', params.id).preload('items').firstOrFail()
    const languages = {
      'es': 'Spanish',
      'en': 'English'
    }
    return await view.render('orders/show/show.edge', { order, languages })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const orderData = await request.validate({ schema: updateOrderSchema })

    const order = await Order.findOrFail(params.id)
    order.customersName = orderData.customersName
    order.customersEmail = orderData.customersEmail
    order.customersPhone = orderData.customersPhone
    order.preferredLanguage = orderData.preferredLanguage
    await order.save()

    Event.emit('domain:orders:order_updated', { order })

    return response.redirect().toRoute('OrdersController.show', [params.id])
  }
}

const updateOrderSchema = schema.create({
  customersName: schema.string(),
  customersEmail: schema.string([
    rules.email()
  ]),
  customersPhone: schema.string(),
  preferredLanguage: schema.enum(['es','en'] as const),
})