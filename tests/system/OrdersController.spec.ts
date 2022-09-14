import { test } from '@japa/runner'
import Order from 'App/Models/Order'

test.group('OrdersController system acceptance tests', () => {
  test(`Given a GET request to the "/orders" endpoint
  Then we get a 200 status back`).run(async ({ client }) => {
    const response = await client.get('/orders')

    response.assertStatus(200)
  })

  test(`Given a GET request to the "/orders/:id" endpoint
  With an ":id" of an Order that exists in the Database
  Then we get a 200 status back`).run(async ({ client }) => {
    const existingOrder = await Order.firstOrFail()

    const response = await client.get(`/orders/${existingOrder.id}`)

    response.assertStatus(200)
  })
})
