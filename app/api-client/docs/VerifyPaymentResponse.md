
# VerifyPaymentResponse


## Properties

Name | Type
------------ | -------------
`message` | string
`payment` | [Payment](Payment.md)

## Example

```typescript
import type { VerifyPaymentResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "message": Pago aprobado y recibo generado.,
  "payment": null,
} satisfies VerifyPaymentResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as VerifyPaymentResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


