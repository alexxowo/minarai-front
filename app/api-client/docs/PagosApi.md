# PagosApi

All URIs are relative to *http://localhost:8000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createPayment**](PagosApi.md#createpayment) | **POST** /api/payments | Registrar un pago |
| [**getMyStudents**](PagosApi.md#getmystudents) | **GET** /api/my-students | Listar alumnos relacionados |
| [**getPayments**](PagosApi.md#getpayments) | **GET** /api/payments | Listar pagos |
| [**showPayment**](PagosApi.md#showpayment) | **GET** /api/payments/{payment} | Ver detalle de un pago |
| [**verifyPayment**](PagosApi.md#verifypaymentoperation) | **PUT** /api/admin/payments/{payment}/verify | Verificar pago (Administrador) |



## createPayment

> CreatePayment201Response createPayment(studentId, amount, paymentDate, paymentMethod, referenceNumber, receipt)

Registrar un pago

Permite a un alumno o representante registrar un nuevo pago adjuntando opcionalmente el comprobante digital (imagen o PDF).

### Example

```ts
import {
  Configuration,
  PagosApi,
} from '';
import type { CreatePaymentRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PagosApi(config);

  const body = {
    // number
    studentId: 56,
    // number
    amount: 3.4,
    // Date
    paymentDate: 2013-10-20,
    // string
    paymentMethod: paymentMethod_example,
    // string (optional)
    referenceNumber: referenceNumber_example,
    // Blob | Archivo de comprobante (jpg, jpeg, png, pdf) (optional)
    receipt: BINARY_DATA_HERE,
  } satisfies CreatePaymentRequest;

  try {
    const data = await api.createPayment(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **studentId** | `number` |  | [Defaults to `undefined`] |
| **amount** | `number` |  | [Defaults to `undefined`] |
| **paymentDate** | `Date` |  | [Defaults to `undefined`] |
| **paymentMethod** | `string` |  | [Defaults to `undefined`] |
| **referenceNumber** | `string` |  | [Optional] [Defaults to `undefined`] |
| **receipt** | `Blob` | Archivo de comprobante (jpg, jpeg, png, pdf) | [Optional] [Defaults to `undefined`] |

### Return type

[**CreatePayment201Response**](CreatePayment201Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `multipart/form-data`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Pago registrado exitosamente |  -  |
| **401** | No autorizado |  -  |
| **422** | Error de validación (ej. no autorizado para este alumno) |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getMyStudents

> GetMyStudents200Response getMyStudents()

Listar alumnos relacionados

Obtiene la lista de los alumnos que el usuario logueado puede gestionar (él mismo si es alumno activo, o sus representados).

### Example

```ts
import {
  Configuration,
  PagosApi,
} from '';
import type { GetMyStudentsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PagosApi(config);

  try {
    const data = await api.getMyStudents();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**GetMyStudents200Response**](GetMyStudents200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Lista de alumnos |  -  |
| **401** | No autorizado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getPayments

> GetPayments200Response getPayments(status)

Listar pagos

Obtiene la lista de pagos registrados. Los administradores ven todos los pagos (con filtro opcional por estado). Los usuarios estándar ven solo sus pagos y los de sus representados.

### Example

```ts
import {
  Configuration,
  PagosApi,
} from '';
import type { GetPaymentsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PagosApi(config);

  const body = {
    // 'PENDING' | 'APPROVED' | 'REJECTED' | Filtrar por estado del pago (solo disponible para administradores) (optional)
    status: status_example,
  } satisfies GetPaymentsRequest;

  try {
    const data = await api.getPayments(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **status** | `PENDING`, `APPROVED`, `REJECTED` | Filtrar por estado del pago (solo disponible para administradores) | [Optional] [Defaults to `undefined`] [Enum: PENDING, APPROVED, REJECTED] |

### Return type

[**GetPayments200Response**](GetPayments200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Lista de pagos |  -  |
| **401** | No autorizado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## showPayment

> ShowPayment200Response showPayment(payment)

Ver detalle de un pago

Obtiene la información detallada de un pago específico. Requiere permisos (ser el propietario, el representante del alumno, o administrador).

### Example

```ts
import {
  Configuration,
  PagosApi,
} from '';
import type { ShowPaymentRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PagosApi(config);

  const body = {
    // number | ID del pago
    payment: 56,
  } satisfies ShowPaymentRequest;

  try {
    const data = await api.showPayment(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **payment** | `number` | ID del pago | [Defaults to `undefined`] |

### Return type

[**ShowPayment200Response**](ShowPayment200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Detalle del pago |  -  |
| **401** | No autorizado |  -  |
| **403** | Prohibido / Sin permisos |  -  |
| **404** | Pago no encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## verifyPayment

> VerifyPayment200Response verifyPayment(payment, verifyPaymentRequest)

Verificar pago (Administrador)

Permite a un administrador aprobar o rechazar un pago. Si se aprueba, se genera automáticamente el recibo.

### Example

```ts
import {
  Configuration,
  PagosApi,
} from '';
import type { VerifyPaymentOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PagosApi(config);

  const body = {
    // number | ID del pago
    payment: 56,
    // VerifyPaymentRequest
    verifyPaymentRequest: ...,
  } satisfies VerifyPaymentOperationRequest;

  try {
    const data = await api.verifyPayment(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **payment** | `number` | ID del pago | [Defaults to `undefined`] |
| **verifyPaymentRequest** | [VerifyPaymentRequest](VerifyPaymentRequest.md) |  | |

### Return type

[**VerifyPayment200Response**](VerifyPayment200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Pago verificado exitosamente |  -  |
| **401** | No autorizado |  -  |
| **403** | Prohibido / Sin permisos de administrador |  -  |
| **422** | Error de validación o pago ya procesado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

