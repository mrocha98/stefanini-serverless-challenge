import { EmployeesService } from './employees.service'
import { EmployeesController } from './employees.controller'

import { document } from '../database/dynamodb.client'

interface ModuleContent {
  employeesService: EmployeesService
  employeesController: EmployeesController
}

export class EmployeesModule implements ModuleContent {
  public readonly employeesService: EmployeesService
  public readonly employeesController: EmployeesController

  constructor() {
    this.employeesService = new EmployeesService(document)
    this.employeesController = new EmployeesController(this.employeesService)
  }
}
