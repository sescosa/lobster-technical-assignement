import Event from '@ioc:Adonis/Core/Event'
import Logger from '@ioc:Adonis/Core/Logger'
import Order from 'App/Models/Order'
import OrderMailerService from 'App/OrderMailerService'

Event.onAny((eventName, _eventData) => {
  if (eventName.startsWith('domain')) Logger.info(`Domain event <${eventName}> fired`)
})


Event.on('domain:orders:item_created', async (item) => {
  const order = await Order.findOrFail(item.item.orderId)
  const orderMailerService = new OrderMailerService(order.customersEmail)
  orderMailerService.sendEmail()
})

Event.on('domain:orders:item_updated', async (item) => {
  const order = await Order.findOrFail(item.item.orderId)
  const orderMailerService = new OrderMailerService(order.customersEmail)
  orderMailerService.sendEmail()
})
