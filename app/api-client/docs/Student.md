
# Student


## Properties

Name | Type
------------ | -------------
`id` | number
`userId` | number
`rankId` | number
`discountPolicyId` | number
`representativeId` | number
`isActive` | boolean
`lastPromotionDate` | Date
`enrollmentDate` | Date
`notes` | string
`createdAt` | Date
`updatedAt` | Date
`user` | [User](User.md)
`rank` | [Rank](Rank.md)
`discountPolicy` | [DiscountPolicy](DiscountPolicy.md)

## Example

```typescript
import type { Student } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 1,
  "userId": 2,
  "rankId": 1,
  "discountPolicyId": null,
  "representativeId": 3,
  "isActive": true,
  "lastPromotionDate": null,
  "enrollmentDate": Wed Jan 31 20:00:00 VET 2024,
  "notes": Información adicional,
  "createdAt": null,
  "updatedAt": null,
  "user": null,
  "rank": null,
  "discountPolicy": null,
} satisfies Student

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Student
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


