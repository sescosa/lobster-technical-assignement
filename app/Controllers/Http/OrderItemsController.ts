import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Item from 'App/Models/Item'
import Event from '@ioc:Adonis/Core/Event'
import OrderMailerService from 'App/OrderMailerService'
import Order from 'App/Models/Order'

export default class OrderItemsController {
  public async store({ request, response, params }: HttpContextContract) {
    const itemData = await request.validate({ schema: storeItemSchema })

    const item = new Item()
    item.name = itemData.name
    item.price = itemData.price
    item.orderId = params.order_id
    await item.save()

    const order = await Order.findOrFail(params.order_id)
    const orderMailerService = new OrderMailerService(order.customersEmail)
    orderMailerService.sendEmail()

    Event.emit('domain:orders:item_created', { item })

    return response.redirect().toRoute('OrdersController.show', [params.order_id])
  }

  public async update({ request, response, params }: HttpContextContract) {
    const itemData = await request.validate({ schema: updateItemSchema })

    const item = await Item.findOrFail(params.id)
    item.name = itemData.name
    item.price = itemData.price
    await item.save()

    Event.emit('domain:orders:item_updated', { item })

    return response.redirect().toRoute('OrdersController.show', [params.order_id])
  }

  public async destroy({ params, response }: HttpContextContract) {
    const itemToDelete = await Item.findOrFail(params.id)
    await itemToDelete.delete()

    Event.emit('domain:orders:item_destroyed', { item: itemToDelete })

    return response.redirect().toRoute('OrdersController.show', [params.order_id])
  }
}

// More info on Adonis Validator at: https://docs.adonisjs.com/guides/validator/introduction
const storeItemSchema = schema.create({
  name: schema.string(),
  price: schema.number(),
})
const updateItemSchema = schema.create({
  name: schema.string(),
  price: schema.number(),
})
