
# StorePaymentResponse


## Properties

Name | Type
------------ | -------------
`message` | string
`payment` | [Payment](Payment.md)

## Example

```typescript
import type { StorePaymentResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "message": Pago registrado con éxito. Pendiente de verificación por el administrador.,
  "payment": null,
} satisfies StorePaymentResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as StorePaymentResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


