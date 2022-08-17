import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { appKey } from 'Config/app'


export default class Auth {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    if ( appKey !== request.header('App_Key')) {
      response.unauthorized({ error: 'Not authorized request' })
      return
    }

    await next()
  }
}