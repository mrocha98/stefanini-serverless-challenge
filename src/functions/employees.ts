import { APIGatewayProxyHandler } from 'aws-lambda'

import { EmployeesModule } from '../employees/employees.module'
import { HttpMethod } from '../http/method.enum'

export const handle: APIGatewayProxyHandler = async (event) => {
  const { employeesController } = new EmployeesModule()

  switch (event.httpMethod) {
    case HttpMethod.Get:
      return employeesController.list(event.queryStringParameters || {})
    case HttpMethod.Post:
      return employeesController.create(JSON.parse(event.body))
    case HttpMethod.Patch:
      return employeesController.update(JSON.parse(event.body))
    case HttpMethod.Delete:
      return employeesController.delete(event.queryStringParameters.id)
    default:
      return employeesController.notFound()
  }
}
