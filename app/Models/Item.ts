import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'

export default class Item extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public name: string

  @column({
    consume: (value) => +(value / 100).toFixed(2),
    prepare: (value) => Math.round(value * 100),
  })
  public price: number

  @column()
  public orderId: number
  @belongsTo(() => Order)
  public order: BelongsTo<typeof Order>
}
