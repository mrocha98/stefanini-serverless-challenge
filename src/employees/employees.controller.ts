import { StatusCodes } from 'http-status-codes'
import { v4 as uuid } from 'uuid'
import type { EmployeesService } from './employees.service'
import { CreateEmployeeDTO, UpdateEmployeeDTO } from './dto'
import { formatJSONResponse } from '../libs/apiGateway'

type ListParams = Partial<{
  id: string
  limit: number
}>

export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  async list(params: ListParams) {
    if (params.id) {
      const users = await this.employeesService.findById(params.id)
      const user = users.Item || null

      return formatJSONResponse({
        response: user,
      })
    }

    const users = await this.employeesService.list(params.limit || 10)
    return formatJSONResponse({
      response: {
        users,
      },
    })
  }

  async create(employee: Omit<CreateEmployeeDTO, 'id'>) {
    try {
      const id = uuid()
      await this.employeesService.create({ ...employee, id })
      return formatJSONResponse({
        statusCode: StatusCodes.CREATED,
        response: {
          id,
        },
      })
    } catch (error) {
      return formatJSONResponse({
        statusCode: StatusCodes.BAD_REQUEST,
        response: {
          error: JSON.stringify(error),
          message: 'invalid data for employee creation',
        },
      })
    }
  }

  async update(employee: UpdateEmployeeDTO) {
    if (!employee.id)
      return formatJSONResponse({
        statusCode: StatusCodes.BAD_REQUEST,
        response: {
          message: 'must provide an id to update a employee',
        },
      })

    if (employee.name)
      return formatJSONResponse({
        statusCode: StatusCodes.IM_A_TEAPOT,
        response: {
          message: 'name updates are not supported',
        },
      })

    try {
      const update = await this.employeesService.update(employee)
      return formatJSONResponse({
        response: {
          user: update.Attributes || {},
        },
      })
    } catch (error) {
      return formatJSONResponse({
        statusCode: StatusCodes.BAD_REQUEST,
        response: {
          error: JSON.stringify(error),
          message: 'invalid data for employee update',
        },
      })
    }
  }

  async delete(id: string) {
    try {
      const employee = await this.employeesService.findById(id)
      if (!employee.Item)
        return formatJSONResponse({
          statusCode: StatusCodes.BAD_REQUEST,
          response: {
            message: 'there is no entries using this id',
          },
        })

      await this.employeesService.delete(id)
      return formatJSONResponse({
        statusCode: StatusCodes.NO_CONTENT,
      })
    } catch (error) {
      return formatJSONResponse({
        statusCode: StatusCodes.BAD_REQUEST,
        response: {
          error: JSON.stringify(error),
          message: 'invalid id for employee deletion',
        },
      })
    }
  }

  notFound() {
    return formatJSONResponse({
      statusCode: StatusCodes.NOT_FOUND,
    })
  }
}
