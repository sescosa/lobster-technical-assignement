import Event from '@ioc:Adonis/Core/Event'
import Logger from '@ioc:Adonis/Core/Logger'

Event.onAny((eventName, _eventData) => {
  if (eventName.startsWith('domain')) Logger.info(`Domain event <${eventName}> fired`)
})

