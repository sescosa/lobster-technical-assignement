import { test } from '@japa/runner'
import Order from 'App/Models/Order'
import Event from '@ioc:Adonis/Core/Event'

test.group('OrdersController system acceptance tests', (group) => {
  group.each.setup(() => {
    Event.restore()
    return () => Event.restore()
  })

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

  test(`Given a PUT request to the "/orders/:id" endpoint
  With a request payload of: { customersName: 'John', customersEmail: 'john@example.com', customersPhone: '+34123123' }
  And with an ":id" of an Order that exists in the Database
  Then we get a 200 status back`).run(async ({ client }) => {
    const existingOrder = await Order.firstOrFail()

    const response = await client.put(`/orders/${existingOrder.id}`).form({
      customersName: 'John',
      customersEmail: 'john@example.com',
      customersPhone: '+34123123',
    })

    response.assertStatus(200)
  })

  test(`Given a PUT request to the "/orders/:id" endpoint
  With a request payload of: { customersName: 'John', customersEmail: 'john@example.com', customersPhone: '+34123123' }
  And with an ":id" of an Order that exists in the Database
  Then the event "domain:orders:order_updated" gets fired`).run(async ({ client, assert }) => {
    const existingOrder = await Order.firstOrFail()

    const eventFaker = Event.fake(['domain:orders:order_updated'])

    await client.put(`/orders/${existingOrder.id}`).form({
      customersName: 'John',
      customersEmail: 'john@example.com',
      customersPhone: '+34123123',
    })

    assert.isTrue(eventFaker.exists('domain:orders:order_updated'))
  })
})
