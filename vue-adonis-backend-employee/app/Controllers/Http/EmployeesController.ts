import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employees from 'App/Models/Employee';
import EmployeeValidator from 'App/Validators/EmployeeValidator';

export default class EmployeesController {

    public async insertRecord({ request }: HttpContextContract) {
        try {

            const result = await request.validate(EmployeeValidator)
            const empDetails = new Employees();
            // const logDetails = new Log();
            empDetails.name = result.name;
            empDetails.dob = result.dob
            empDetails.doj = result.doj
            empDetails.phone = BigInt(result.phone)
            empDetails.email = result.email;
            empDetails.departmentId = result.departmentId
            // empDetails.createdAt = DateTime.now()
            // empDetails.updatedAt = DateTime.now()
            // logDetails.action = "Insert"
            // logDetails.performedAt = DateTime.now()
            empDetails.save();
            // logDetails.save()
            return "Inserted Successfully"
        }
        catch (error) {

            return "Insert Failed";
        }

    }


    public async updateRecord({ request }: HttpContextContract) {
        try {
            const valEmp = await request.validate(EmployeeValidator)
            const empDetails = await Employees.findOrFail(request.input('id'));
            empDetails.name = valEmp.name
            empDetails.dob = valEmp.dob
            empDetails.doj = valEmp.doj
            empDetails.phone = BigInt(valEmp.phone)
            empDetails.email = valEmp.email
            empDetails.departmentId = valEmp.departmentId
            // empDetails.updatedAt = DateTime.now()
            empDetails.save();
            return "Employee details successfully updated"
        } catch (err) {
            console.log(err);
            return "Employee ID  does not exists"
        }
    }

    public async deleteRecord({ request }: HttpContextContract) {
        try {
            const empDetails = await Employees.findOrFail(Number(request.input('id')))
            await empDetails.delete();
            return "Employee successfully deleted"
        } catch {
            return "Employee ID doesnot exists"
        }
    }

    public async fetchAll() {
        try {
            const all = await Employees.all();
            return all.reverse()
        }
        catch {
            return "Cannot fetch Data"
        }
    }

    public async fetchJoin() {

        const data = await Employees
            .query()
            .join('departments', 'employees.department_id', '=', 'departments.id')
            .select('employees.department_id')
            .select('departments.name as department_name')
            .select('employees.id')
            .select('employees.name')
            .select('employees.dob')
            .select('employees.doj')
            .select('employees.email')
            .select('employees.phone')

            
        const FinalData:any = []

        data.forEach(element => {

            FinalData.push({
                id : element.$attributes.id,
                name : element.$attributes.name,
                dob : element.$attributes.dob,
                doj : element.$attributes.doj,
               email : element.$attributes.email,
                phone : element.$attributes.phone,
               departmentId : element.$attributes.departmentId,
                departmentName : element.$extras['department_name'],
            })

            // console.log(data)
            // return data
        });
        //return FinalData.reverse()

        return FinalData.sort((a: { id: number; },b: { id: number; })=>{
            return a.id - b.id
        });
    }
}
