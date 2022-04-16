export interface IDepartment {
    departmentID: number,
    departmentName: string,
    locationID?: number,
    managerID?: number,
}

export interface IDepartmentList{
    status: boolean,
    message:string,
    timestamp:number,
    data: Array<IDepartment>
}
