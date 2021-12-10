import type { DynamoDB } from 'aws-sdk'
import { CreateEmployeeDTO, UpdateEmployeeDTO } from './dto'
import { Table } from '../database/table.enum'
import { withoutUndefinedOrNullEntries } from '../libs/object'
import { Builder } from '../libs/builder'

export class EmployeesService {
  constructor(private readonly documentClient: DynamoDB.DocumentClient) {}

  async list(limit: number) {
    return this.documentClient
      .scan({
        TableName: Table.Employees,
        Select: 'ALL_ATTRIBUTES',
        Limit: limit,
      })
      .promise()
  }

  async findById(id: string) {
    return this.documentClient
      .get({
        TableName: Table.Employees,
        Key: {
          id,
        },
      })
      .promise()
  }

  async create(data: CreateEmployeeDTO) {
    return this.documentClient
      .put({
        TableName: Table.Employees,
        Item: {
          ...data,
        },
      })
      .promise()
  }

  async update({ id, ...data }: UpdateEmployeeDTO) {
    const parsedData = withoutUndefinedOrNullEntries(data)
    const builder = new Builder(parsedData)

    console.log({
      parsedData,
      updateExpr: builder.createUpdateExpression(),
      expressionAttr: builder.createExpressionAttributeValues(),
    })

    return this.documentClient
      .update({
        TableName: Table.Employees,
        Key: {
          id,
        },
        UpdateExpression: builder.createUpdateExpression(),
        ExpressionAttributeValues: builder.createExpressionAttributeValues(),
        ReturnValues: 'UPDATED_NEW',
      })
      .promise()
  }

  async delete(id: string) {
    return this.documentClient
      .delete({
        TableName: Table.Employees,
        Key: {
          id,
        },
        ConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
          ':id': id,
        },
      })
      .promise()
  }
}
