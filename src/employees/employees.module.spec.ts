import { EmployeesModule } from './employees.module'

jest.mock('../database/dynamodb.client', () => ({
  __esModule: true,
  document: function () {
    return jest.fn()
  },
}))

jest.mock('./employees.service', () => ({
  __esModule: true,
  EmployeesService: function () {
    return jest.fn()
  },
}))

jest.mock('./employees.controller', () => ({
  __esModule: true,
  EmployeesController: function () {
    return jest.fn()
  },
}))

describe('EmployeesModule', () => {
  it('should have a employessService', () => {
    const module = new EmployeesModule()
    expect(module.employeesService).toBeDefined()
  })

  it('should have a employessController', () => {
    const module = new EmployeesModule()
    expect(module.employeesController).toBeDefined()
  })
})
