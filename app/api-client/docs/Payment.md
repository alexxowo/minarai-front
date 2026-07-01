
# Payment


## Properties

Name | Type
------------ | -------------
`id` | number
`studentId` | number
`userId` | number
`amount` | string
`paymentDate` | Date
`paymentMethod` | string
`referenceNumber` | string
`receiptPath` | string
`status` | string
`adminNotes` | string
`createdAt` | Date
`updatedAt` | Date
`student` | [Student](Student.md)
`user` | [User](User.md)
`receipt` | [Receipt](Receipt.md)

## Example

```typescript
import type { Payment } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 1,
  "studentId": 1,
  "userId": 2,
  "amount": 800.00,
  "paymentDate": Mon Jun 29 20:00:00 GMT-04:00 2026,
  "paymentMethod": Transferencia,
  "referenceNumber": REF-123456,
  "receiptPath": receipts/abc.png,
  "status": PENDING,
  "adminNotes": null,
  "createdAt": null,
  "updatedAt": null,
  "student": null,
  "user": null,
  "receipt": null,
} satisfies Payment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Payment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


