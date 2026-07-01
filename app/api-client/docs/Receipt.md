
# Receipt


## Properties

Name | Type
------------ | -------------
`id` | number
`paymentId` | number
`receiptNumber` | string
`issuedAt` | Date
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { Receipt } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 1,
  "paymentId": 1,
  "receiptNumber": REC-20260630-1,
  "issuedAt": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies Receipt

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Receipt
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


