
export interface User{
    username: string,
    password: string
}

export interface Department{
    departmentid: string;
    departmentname: string;
    noofemployees: string;
    managerid: string;
    createdsource: string
    createdsourcetype: string
    createddate: string
    modifiedsource: string
    modifiedsourcetype: string
    modifieddate: string
}

export interface EmployeeAttendance{
    employeeid: string,
    month?: string,
    date: string,
    departmentid: string,
    departmentname: string,
    available: string,
    checkin: string,
    checkout: string,
    attendancecount: string,
    createdsource: string,
    createdsourcetype: string,
    createddate: string,
    modifiedsource: string,
    modifiedsourcetype: string,
    modifieddate: string
}