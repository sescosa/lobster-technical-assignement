import Factory from '@ioc:Adonis/Lucid/Factory'
import Item from 'App/Models/Item'
import Order from 'App/Models/Order'

export const OrderFactory = Factory.define(Order, ({ faker }) => {
  return {
    customersEmail: faker.internet.exampleEmail(),
    customersName: faker.name.fullName(),
    customersPhone: faker.phone.number('+34 #########'),
    preferredLanguage: 'es',
  }
})
  .relation('items', () => ItemFactory)
  .build()

export const ItemFactory = Factory.define(Item, ({ faker }) => {
  return {
    name: faker.commerce.productName(),
    price: faker.datatype.float({ min: 0, max: 200, precision: 0.01 }),
  }
}).build()
