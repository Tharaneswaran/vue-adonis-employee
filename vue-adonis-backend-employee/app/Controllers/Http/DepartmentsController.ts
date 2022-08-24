import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Departments from "App/Models/Department";
import DepartmentValidator from "App/Validators/DepartmentValidator";
export default class DepartmentsController {

    public async insertRecord({request} : HttpContextContract){
        try{
                       
           const result = await request.validate(DepartmentValidator)
            const deptDetails = new Departments();
            deptDetails.name = result.name;
            // deptDetails.createdAt = DateTime.now()
            // deptDetails.updatedAt = DateTime.now()
            deptDetails.save();

            return "Inserted Successfully" 

    
        }
        catch(error){
             
            return "Insert Failed";
        }
    
    }

    public async updateRecord({request} : HttpContextContract)
    {
        try{
            const valDept = await request.validate(DepartmentValidator)
            const deptDetails =  await Departments.findOrFail(Number(request.input('id')));
            deptDetails.name = valDept.name;
            // deptDetails.updatedAt = DateTime.now()
            deptDetails.save();
            return "Department Details Successfully Updated"
        }catch(err){
            console.log(err);
            return "Department ID Does Not exists"
        }
    }


    public async deleteRecord({request} : HttpContextContract)
    {
        try{
            const deptDetails = await Departments.findOrFail(Number(request.input('id')))
            await deptDetails.delete();
            return "Department ID successfully deleted"
        }catch{
            return "Department ID doesnot exists"
        }
    }


    public async fetchAll({request} : HttpContextContract){
        try{
           const all = await Departments.query()
                                        .orderBy('id',request.input('sortManner'))
           return all
        }
       catch{
        return "Cannot fetch Data"
       }
    }

} 

