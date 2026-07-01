# PagosApi

All URIs are relative to *http://localhost:8000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**_0b4da16a79c767828a756a8749652ba2**](PagosApi.md#_0b4da16a79c767828a756a8749652ba2) | **GET** /api/my-students | Listar alumnos relacionados |
| [**_487c61ce04a9619a56693f5b75e0e9ce**](PagosApi.md#_487c61ce04a9619a56693f5b75e0e9ce) | **PUT** /api/admin/payments/{payment}/verify | Verificar pago (Administrador) |
| [**_5e2794ba3d3c64e70873367505e4a751**](PagosApi.md#_5e2794ba3d3c64e70873367505e4a751) | **POST** /api/payments | Registrar un pago |
| [**_826dc6b24dd704607aa018a59207dd96**](PagosApi.md#_826dc6b24dd704607aa018a59207dd96) | **GET** /api/payments | Listar pagos |
| [**c0d11adea38ecde3d94e4e281c72f01e**](PagosApi.md#c0d11adea38ecde3d94e4e281c72f01e) | **GET** /api/payments/{payment} | Ver detalle de un pago |



## _0b4da16a79c767828a756a8749652ba2

> Model0b4da16a79c767828a756a8749652ba2200Response _0b4da16a79c767828a756a8749652ba2()

Listar alumnos relacionados

Obtiene la lista de los alumnos que el usuario logueado puede gestionar (él mismo si es alumno activo, o sus representados).

### Example

```ts
import {
  Configuration,
  PagosApi,
} from '';
import type { 0b4da16a79c767828a756a8749652ba2Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PagosApi(config);

  try {
    const data = await api._0b4da16a79c767828a756a8749652ba2();
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

[**Model0b4da16a79c767828a756a8749652ba2200Response**](Model0b4da16a79c767828a756a8749652ba2200Response.md)

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


## _487c61ce04a9619a56693f5b75e0e9ce

> Model487c61ce04a9619a56693f5b75e0e9ce200Response _487c61ce04a9619a56693f5b75e0e9ce(payment, verifyPaymentRequest)

Verificar pago (Administrador)

Permite a un administrador aprobar o rechazar un pago. Si se aprueba, se genera automáticamente el recibo.

### Example

```ts
import {
  Configuration,
  PagosApi,
} from '';
import type { 487c61ce04a9619a56693f5b75e0e9ceRequest } from '';

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
  } satisfies 487c61ce04a9619a56693f5b75e0e9ceRequest;

  try {
    const data = await api._487c61ce04a9619a56693f5b75e0e9ce(body);
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

[**Model487c61ce04a9619a56693f5b75e0e9ce200Response**](Model487c61ce04a9619a56693f5b75e0e9ce200Response.md)

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


## _5e2794ba3d3c64e70873367505e4a751

> Model5e2794ba3d3c64e70873367505e4a751201Response _5e2794ba3d3c64e70873367505e4a751(studentId, amount, paymentDate, paymentMethod, referenceNumber, receipt)

Registrar un pago

Permite a un alumno o representante registrar un nuevo pago adjuntando opcionalmente el comprobante digital (imagen o PDF).

### Example

```ts
import {
  Configuration,
  PagosApi,
} from '';
import type { 5e2794ba3d3c64e70873367505e4a751Request } from '';

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
  } satisfies 5e2794ba3d3c64e70873367505e4a751Request;

  try {
    const data = await api._5e2794ba3d3c64e70873367505e4a751(body);
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

[**Model5e2794ba3d3c64e70873367505e4a751201Response**](Model5e2794ba3d3c64e70873367505e4a751201Response.md)

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


## _826dc6b24dd704607aa018a59207dd96

> Model826dc6b24dd704607aa018a59207dd96200Response _826dc6b24dd704607aa018a59207dd96(status)

Listar pagos

Obtiene la lista de pagos registrados. Los administradores ven todos los pagos (con filtro opcional por estado). Los usuarios estándar ven solo sus pagos y los de sus representados.

### Example

```ts
import {
  Configuration,
  PagosApi,
} from '';
import type { 826dc6b24dd704607aa018a59207dd96Request } from '';

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
  } satisfies 826dc6b24dd704607aa018a59207dd96Request;

  try {
    const data = await api._826dc6b24dd704607aa018a59207dd96(body);
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

[**Model826dc6b24dd704607aa018a59207dd96200Response**](Model826dc6b24dd704607aa018a59207dd96200Response.md)

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


## c0d11adea38ecde3d94e4e281c72f01e

> C0d11adea38ecde3d94e4e281c72f01e200Response c0d11adea38ecde3d94e4e281c72f01e(payment)

Ver detalle de un pago

Obtiene la información detallada de un pago específico. Requiere permisos (ser el propietario, el representante del alumno, o administrador).

### Example

```ts
import {
  Configuration,
  PagosApi,
} from '';
import type { C0d11adea38ecde3d94e4e281c72f01eRequest } from '';

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
  } satisfies C0d11adea38ecde3d94e4e281c72f01eRequest;

  try {
    const data = await api.c0d11adea38ecde3d94e4e281c72f01e(body);
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

[**C0d11adea38ecde3d94e4e281c72f01e200Response**](C0d11adea38ecde3d94e4e281c72f01e200Response.md)

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

