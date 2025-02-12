export class UserDetails{
    empolyeeid!: string;
    firstname!: string;
    lastname!: string;
    dob!: string;
    gender!: string;
    phonenumber!: string;
    doj!: string;
    department!: string;
    position!: string;
    email!: string;
    createsource!: string;
    createsourcetype!: string;
    createdttm!: string;
    modifiedsource!: string;
    modifiedsourcetype!: string;
    modifiedsdttm!: string

    constructor(
        empolyeeid: string,
        firstname: string,
        lastname: string,
        dob: string,
        gender: string,
        phonenumber: string,
        doj: string,
        department: string,
        position: string,
        email: string,
        createsource: string,
        createsourcetype: string,
        createdttm: string,
        modifiedsource: string,
        modifiedsourcetype: string,
        modifiedsdttm: string
    ){
        this.empolyeeid = empolyeeid
        this.firstname = firstname
        this.lastname = lastname
        this.dob = dob
        this.gender = gender
        this.phonenumber = phonenumber
        this.doj = doj
        this.department = department
        this.position = position
        this.email = email
        this.createsource = createsource
        this.createsourcetype = createsourcetype
        this.createdttm = createdttm
        this.modifiedsource = modifiedsource
        this.modifiedsourcetype = modifiedsourcetype
        this.modifiedsdttm = modifiedsdttm
    }
}

export class User{
    constructor(
        username: string,
        password: string
    ){}
}