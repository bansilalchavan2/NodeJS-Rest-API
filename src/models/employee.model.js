var dbConn  = require('../../config/db.config');

var Employee = function(employee){
    this.firstname     =   employee.firstname;
    this.lastname      =   employee.lastname;
    this.email          =   employee.email;
    this.mobile          =   employee.mobile;
    this.status         =   employee.status ? employee.status : 1;
    this.created_at     =   new Date();
}

// get all employees
Employee.getAllEmployees = (result) =>{
    dbConn.query('SELECT * FROM employees WHERE is_deleted=0', (err, res)=>{
        if(err){
            console.log('Error while fetching employess', err);
            result(null,err);
        }else{
            console.log('Employees fetched successfully');
            result(null,res);
        }
    })
}

// get employee by ID from DB
Employee.getEmployeeByID = (id, result)=>{
    dbConn.query('SELECT * FROM employees WHERE id=?', id, (err, res)=>{
        if(err){
            console.log('Error while fetching employee by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

// create new employee
Employee.createEmployee = (employeeReqData, result) =>{
    dbConn.query('INSERT INTO employees SET ? ', employeeReqData, (err, res)=>{
        if(err){
            console.log(err);
            console.log('Error while inserting data');
            result(null, err);
        }else{
            console.log('Employee created successfully');
            result(null, res)
        }
    })
}

// update employee
Employee.updateEmployee = (id, employeeReqData, result)=>{
    dbConn.query("UPDATE employees SET firstname=?,lastname=?,email=?,mobile=? WHERE id = ?", [employeeReqData.firstname,employeeReqData.lastname,employeeReqData.email,employeeReqData.mobile, id], (err, res)=>{
        if(err){
            console.log('Error while updating the employee');
            result(null, err);
        }else{
            console.log("Employee updated successfully");
            result(null, res);
        }
    });
}

// delete employee
Employee.deleteEmployee = (id, result)=>{
    // dbConn.query('DELETE FROM employees WHERE id=?', [id], (err, res)=>{
    //     if(err){
    //         console.log('Error while deleting the employee');
    //         result(null, err);
    //     }else{
    //         result(null, res);
    //     }
    // })
    dbConn.query("UPDATE employees SET is_deleted=? WHERE id = ?", [1, id], (err, res)=>{
        if(err){
            console.log('Error while deleting the employee');
            result(null, err);
        }else{
            console.log("Employee deleted successfully");
            result(null, res);
        }
    });
}

module.exports = Employee;