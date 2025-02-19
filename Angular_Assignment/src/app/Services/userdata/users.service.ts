export class UserDetails{
    employeeid!: string;
    firstname!: string;
    lastname!: string;
    dob!: string;
    gender!: string;
    bloodgroup!: string;
    phonenumber!: string;
    doj!: string;
    department!: string;
    position!: string;
    email!: string;
    createsource!: string;
    createsourcetype!: string;
    createdate!: string;
    modifiedsource!: string;
    modifiedsourcetype!: string;
    modifieddate!: string
username: any;

    constructor(
        employeeid: string,
        firstname: string,
        lastname: string,
        dob: string,
        gender: string,
        bloodgroup: string,
        phonenumber: string,
        doj: string,
        department: string,
        position: string,
        email: string,
        createsource: string,
        createsourcetype: string,
        createdate: string,
        modifiedsource: string,
        modifiedsourcetype: string,
        modifieddate: string
    ){
        this.employeeid = employeeid
        this.firstname = firstname
        this.lastname = lastname
        this.dob = dob
        this.gender = gender
        this.bloodgroup = bloodgroup
        this.phonenumber = phonenumber
        this.doj = doj
        this.department = department
        this.position = position
        this.email = email
        this.createsource = createsource
        this.createsourcetype = createsourcetype
        this.createdate = createdate
        this.modifiedsource = modifiedsource
        this.modifiedsourcetype = modifiedsourcetype
        this.modifieddate = modifieddate
    }
}

export class User{
    username!: string
    password!: string
    constructor(
        username: string,
        password: string
    ){
        this.username = username
        this.password = password
    }
}

export class DepartmentDetails{
    departmentid!: string;
    departmentname!: string;
    noofemployees!: string;
    managerid!: string;
    createdsource!: string
    createdsourcetype!: string
    createddate!: string
    modifiedsource!: string
    modifiedsourcetype!: string
    modifieddate!: string

    constructor(
        departmentid: string,
        departmentname: string,
        noofemployees: string,
        managerid: string,
        createdsource: string,
        createdsourcetype: string,
        createddate: string,
        modifiedsource: string,
        modifiedsourcetype: string,
        modifieddate: string,
    ){
        this.departmentid = departmentid;
        this.departmentname = departmentname;
        this.noofemployees = noofemployees;
        this.managerid = managerid;
        this.createdsource = createdsource
        this.createdsourcetype = createdsourcetype
        this.createddate = createddate
        this.modifiedsource = modifiedsource
        this.modifiedsourcetype = modifiedsourcetype
        this.modifieddate = modifieddate
    }
}

export class EmployeeAttendance{
    employeeid!: string;
    date!: string;
    departmentid!: string;
    departmentname!: string;
    available!: boolean;
    checkin!: string;
    checkout!: string;
    attendancecount!: bigint;
    createdsource!: string;
    createdsourcetype!: string;
    createddate!: string;
    modifiedsource!: string;
    modifiedsourcetype!: string;
    modifieddate!: string;

    constructor(
        employeeid: string,
        date: string,
        departmentid: string,
        departmentname: string,
        available: boolean,
        checkin: string,
        checkout: string,
        attendancecount: bigint,
        createdsource: string,
        createdsourcetype: string,
        createddate: string,
        modifiedsource: string,
        modifiedsourcetype: string,
        modifieddate: string,
    ){
        this.employeeid = employeeid
        this.date = date;
        this.departmentid = departmentid;
        this.departmentname = departmentname;
        this.available = available;
        this.checkin = checkin;
        this.checkout = checkout;
        this.attendancecount = attendancecount;
        this.createdsource = createdsource
        this.createdsourcetype = createdsourcetype
        this.createddate = createddate
        this.modifiedsource = modifiedsource
        this.modifiedsourcetype = modifiedsourcetype
        this.modifieddate = modifieddate
    }
}