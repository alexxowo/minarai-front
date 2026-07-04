
# StoreRepresentativeRequest


## Properties

Name | Type
------------ | -------------
`firstName` | string
`lastName` | string
`identificationNumber` | string
`email` | string
`dob` | Date
`phone` | string
`password` | string
`isAdultStudent` | boolean
`rankId` | number
`createStudent` | boolean
`student` | [StoreRepresentativeRequestStudent](StoreRepresentativeRequestStudent.md)

## Example

```typescript
import type { StoreRepresentativeRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "firstName": Juan,
  "lastName": Pérez,
  "identificationNumber": V-12345678,
  "email": juan.perez@example.com,
  "dob": Tue May 14 20:00:00 VET 1985,
  "phone": +584120000000,
  "password": 12345678,
  "isAdultStudent": false,
  "rankId": 1,
  "createStudent": false,
  "student": null,
} satisfies StoreRepresentativeRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as StoreRepresentativeRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


