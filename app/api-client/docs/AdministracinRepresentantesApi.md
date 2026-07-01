# AdministracinRepresentantesApi

All URIs are relative to *http://localhost:8000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**deactivateRepresentative**](AdministracinRepresentantesApi.md#deactivaterepresentative) | **PATCH** /api/admin/representatives/{user}/deactivate | Desactivar un representante y sus alumnos |
| [**getRepresentatives**](AdministracinRepresentantesApi.md#getrepresentatives) | **GET** /api/admin/representatives | Listar todos los representantes |
| [**showRepresentative**](AdministracinRepresentantesApi.md#showrepresentative) | **GET** /api/admin/representatives/{user} | Ver ficha de un representante y sus representados |
| [**storeRepresentative**](AdministracinRepresentantesApi.md#storerepresentativeoperation) | **POST** /api/admin/representatives | Crear un representante |



## deactivateRepresentative

> deactivateRepresentative(user)

Desactivar un representante y sus alumnos

Suspende la cuenta de un representante y desactiva a todos sus alumnos asociados en cascada (Solo Admin).

### Example

```ts
import {
  Configuration,
  AdministracinRepresentantesApi,
} from '';
import type { DeactivateRepresentativeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdministracinRepresentantesApi(config);

  const body = {
    // number | ID del usuario representante
    user: 56,
  } satisfies DeactivateRepresentativeRequest;

  try {
    const data = await api.deactivateRepresentative(body);
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
| **user** | `number` | ID del usuario representante | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Representante y representados desactivados exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getRepresentatives

> getRepresentatives()

Listar todos los representantes

Obtiene una lista de todos los usuarios registrados como representantes o adultos (Solo Admin).

### Example

```ts
import {
  Configuration,
  AdministracinRepresentantesApi,
} from '';
import type { GetRepresentativesRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdministracinRepresentantesApi(config);

  try {
    const data = await api.getRepresentatives();
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

`void` (Empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Lista de representantes |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## showRepresentative

> showRepresentative(user)

Ver ficha de un representante y sus representados

Detalle completo del representante con la lista de sus alumnos asociados (Solo Admin).

### Example

```ts
import {
  Configuration,
  AdministracinRepresentantesApi,
} from '';
import type { ShowRepresentativeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdministracinRepresentantesApi(config);

  const body = {
    // number | ID del usuario representante
    user: 56,
  } satisfies ShowRepresentativeRequest;

  try {
    const data = await api.showRepresentative(body);
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
| **user** | `number` | ID del usuario representante | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Ficha del representante |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## storeRepresentative

> storeRepresentative(storeRepresentativeRequest)

Crear un representante

Crea un nuevo usuario representante (padre o adulto) y opcionalmente le asocia y registra a su primer alumno en el dojo (Solo Admin).

### Example

```ts
import {
  Configuration,
  AdministracinRepresentantesApi,
} from '';
import type { StoreRepresentativeOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdministracinRepresentantesApi(config);

  const body = {
    // StoreRepresentativeRequest
    storeRepresentativeRequest: ...,
  } satisfies StoreRepresentativeOperationRequest;

  try {
    const data = await api.storeRepresentative(body);
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
| **storeRepresentativeRequest** | [StoreRepresentativeRequest](StoreRepresentativeRequest.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Representante creado exitosamente |  -  |
| **422** | Error de validación |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

