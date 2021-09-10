import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Orders extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.string('customers_name').notNullable().defaultTo('')
      table.string('customers_email').notNullable().defaultTo('')
      table.string('customers_phone').notNullable().defaultTo('')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
