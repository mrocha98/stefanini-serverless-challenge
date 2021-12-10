import { Employee } from './employees.model'

export type CreateEmployeeDTO = Employee

export type UpdateEmployeeDTO = Partial<CreateEmployeeDTO> &
  Pick<Employee, 'id'>
