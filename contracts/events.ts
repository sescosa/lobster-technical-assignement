/**
 * Contract source: https://git.io/JfefG
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

import Item from 'App/Models/Item'
import Order from 'App/Models/Order'

declare module '@ioc:Adonis/Core/Event' {
  /*
  |--------------------------------------------------------------------------
  | Define typed events
  |--------------------------------------------------------------------------
  |
  | You can define types for events inside the following interface and
  | AdonisJS will make sure that all listeners and emit calls adheres
  | to the defined types.
  |
  | For example:
  |
  | interface EventsList {
  |   'new:user': UserModel
  | }
  |
  | Now calling `Event.emit('new:user')` will statically ensure that passed value is
  | an instance of the the UserModel only.
  |
  */
  interface EventsList {
    'domain:orders:item_updated': {
      item: Item
    }
    'domain:orders:item_created': {
      item: Item
    }
    'domain:orders:item_destroyed': {
      item: Item
    }

    'domain:orders:order_updated': {
      order: Order
    }
  }
}
