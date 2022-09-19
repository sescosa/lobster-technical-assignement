import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.enu('preferred_language', ['es','en'], {
        useNative: true,
        enumName: 'user_preferred_language',
        existingType: false,
      }).notNullable().defaultTo('es')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('preferred_language')
    })
  }
}
