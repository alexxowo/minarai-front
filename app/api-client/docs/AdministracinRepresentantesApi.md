# AdministracinRepresentantesApi

All URIs are relative to *http://localhost:8000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**_0035c4e1ba50d6fdac37175767b485e4**](AdministracinRepresentantesApi.md#_0035c4e1ba50d6fdac37175767b485e4) | **GET** /api/admin/representatives/{user} | Ver ficha de un representante y sus representados |
| [**_4fa2d0ee6891740d98d1b69148d5891b**](AdministracinRepresentantesApi.md#_4fa2d0ee6891740d98d1b69148d5891b) | **GET** /api/admin/representatives | Listar todos los representantes |
| [**b433dae97eede7cb2189397d9e23ae08**](AdministracinRepresentantesApi.md#b433dae97eede7cb2189397d9e23ae08) | **PATCH** /api/admin/representatives/{user}/deactivate | Desactivar un representante y sus alumnos |



## _0035c4e1ba50d6fdac37175767b485e4

> _0035c4e1ba50d6fdac37175767b485e4(user)

Ver ficha de un representante y sus representados

Detalle completo del representante con la lista de sus alumnos asociados (Solo Admin).

### Example

```ts
import {
  Configuration,
  AdministracinRepresentantesApi,
} from '';
import type { 0035c4e1ba50d6fdac37175767b485e4Request } from '';

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
  } satisfies 0035c4e1ba50d6fdac37175767b485e4Request;

  try {
    const data = await api._0035c4e1ba50d6fdac37175767b485e4(body);
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


## _4fa2d0ee6891740d98d1b69148d5891b

> _4fa2d0ee6891740d98d1b69148d5891b()

Listar todos los representantes

Obtiene una lista de todos los usuarios registrados como representantes o adultos (Solo Admin).

### Example

```ts
import {
  Configuration,
  AdministracinRepresentantesApi,
} from '';
import type { 4fa2d0ee6891740d98d1b69148d5891bRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdministracinRepresentantesApi(config);

  try {
    const data = await api._4fa2d0ee6891740d98d1b69148d5891b();
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


## b433dae97eede7cb2189397d9e23ae08

> b433dae97eede7cb2189397d9e23ae08(user)

Desactivar un representante y sus alumnos

Suspende la cuenta de un representante y desactiva a todos sus alumnos asociados en cascada (Solo Admin).

### Example

```ts
import {
  Configuration,
  AdministracinRepresentantesApi,
} from '';
import type { B433dae97eede7cb2189397d9e23ae08Request } from '';

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
  } satisfies B433dae97eede7cb2189397d9e23ae08Request;

  try {
    const data = await api.b433dae97eede7cb2189397d9e23ae08(body);
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

