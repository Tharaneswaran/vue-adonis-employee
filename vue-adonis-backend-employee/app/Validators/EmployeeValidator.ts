import { schema, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class StaffValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name : schema.string( [ rules.alpha({allow : ['space']}) ]),
    dob : schema.date(),
    doj : schema.date(),
    email : schema.string([rules.unique({table:'employees',column:'email'})],[rules.email()]),
    phone : schema.string([rules.unique({table:'employees',column:'phone'})],[ rules.mobile({ locale : ['en-IN']}) ]),
    departmentId : schema.number([ rules.exists({table : 'departments', column : 'id'}) ]),

  })

}
