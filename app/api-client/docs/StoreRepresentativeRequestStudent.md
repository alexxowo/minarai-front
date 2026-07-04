
# StoreRepresentativeRequestStudent


## Properties

Name | Type
------------ | -------------
`firstName` | string
`lastName` | string
`identificationNumber` | string
`dob` | Date
`phone` | string
`email` | string
`rankId` | number
`discountPolicyId` | number
`enrollmentDate` | Date
`notes` | string

## Example

```typescript
import type { StoreRepresentativeRequestStudent } from ''

// TODO: Update the object below with actual values
const example = {
  "firstName": Pedrito,
  "lastName": Pérez,
  "identificationNumber": V-87654321,
  "dob": Wed Aug 19 19:30:00 VET 2015,
  "phone": +584120000000,
  "email": pedrito@example.com,
  "rankId": 1,
  "discountPolicyId": 1,
  "enrollmentDate": Tue Jun 30 20:00:00 VET 2026,
  "notes": Notas del alumno,
} satisfies StoreRepresentativeRequestStudent

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as StoreRepresentativeRequestStudent
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


