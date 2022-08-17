import { schema ,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class DeptValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name : schema.string([rules.unique({table:'departments',column:'name'})]),
  })
}