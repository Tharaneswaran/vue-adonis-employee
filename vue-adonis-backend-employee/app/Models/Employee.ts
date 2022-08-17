import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import departments from 'App/Models/Department'

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public dob : DateTime

  @column()
  public doj : DateTime

  @column()
  public email : string

  @column()
  public phone: bigint

  @column()
  public departmentId: number

  @hasOne(() => departments )
  public department: HasOne<typeof departments>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
