
# Model42f77e072dec84b0e1094cca1228298e200ResponseUser


## Properties

Name | Type
------------ | -------------
`id` | number
`firstName` | string
`lastName` | string
`email` | string
`role` | string

## Example

```typescript
import type { Model42f77e072dec84b0e1094cca1228298e200ResponseUser } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 1,
  "firstName": Admin,
  "lastName": User,
  "email": admin@minarai.com,
  "role": ADMIN,
} satisfies Model42f77e072dec84b0e1094cca1228298e200ResponseUser

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Model42f77e072dec84b0e1094cca1228298e200ResponseUser
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


