import { BaseCommand } from '@adonisjs/core/build/standalone'
import { OrderFactory } from 'Database/factories'
import execa from 'execa'

export default class RepopulateDb extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'repopulate:db'

  /**
   * Command description is displayed in the "help" output
   */
  public static description =
    'Destroys and then recreates all DB tables. Then it populates them with some fake orders and items. This command can be found in "commands/RepopulateDb.ts"'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: false,
  }

  public async run() {
    this.logger.info(
      'Hello! This is a custom command. You can find it in "commands/RepopulateDb.ts" if you are curious'
    )

    this.logger.info('Rolling back all migrations....')
    await execa.node('ace', ['migration:rollback', '--batch=0'], {
      stdio: 'inherit',
    })

    this.logger.info('Running all migrations....')
    await execa.node('ace', ['migration:run'], {
      stdio: 'inherit',
    })

    this.logger.info('Creating some Orders and Items with fake random data....')
    await OrderFactory.with('items', 2).createMany(20)

    this.logger.info('Command finished!')
  }
}
