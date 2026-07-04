# AdministracinEstadsticasApi

All URIs are relative to *http://localhost:8000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getActiveStudents**](AdministracinEstadsticasApi.md#getactivestudents) | **GET** /api/admin/stats/active-students | Obtener alumnos activos |
| [**getInactiveStudents**](AdministracinEstadsticasApi.md#getinactivestudents) | **GET** /api/admin/stats/inactive-students | Obtener alumnos inactivos |
| [**getTotalStudents**](AdministracinEstadsticasApi.md#gettotalstudents) | **GET** /api/admin/stats/total-students | Obtener total de alumnos |



## getActiveStudents

> GetTotalStudents200Response getActiveStudents()

Obtener alumnos activos

Obtiene el total de alumnos activos y su tendencia (Solo Admin).

### Example

```ts
import {
  Configuration,
  AdministracinEstadsticasApi,
} from '';
import type { GetActiveStudentsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdministracinEstadsticasApi(config);

  try {
    const data = await api.getActiveStudents();
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

[**GetTotalStudents200Response**](GetTotalStudents200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Total de alumnos activos y tendencia |  -  |
| **403** | Acceso denegado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getInactiveStudents

> GetTotalStudents200Response getInactiveStudents()

Obtener alumnos inactivos

Obtiene el total de alumnos inactivos y su tendencia (Solo Admin).

### Example

```ts
import {
  Configuration,
  AdministracinEstadsticasApi,
} from '';
import type { GetInactiveStudentsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdministracinEstadsticasApi(config);

  try {
    const data = await api.getInactiveStudents();
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

[**GetTotalStudents200Response**](GetTotalStudents200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Total de alumnos inactivos y tendencia |  -  |
| **403** | Acceso denegado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getTotalStudents

> GetTotalStudents200Response getTotalStudents()

Obtener total de alumnos

Obtiene el total de alumnos registrados y su tendencia (Solo Admin).

### Example

```ts
import {
  Configuration,
  AdministracinEstadsticasApi,
} from '';
import type { GetTotalStudentsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdministracinEstadsticasApi(config);

  try {
    const data = await api.getTotalStudents();
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

[**GetTotalStudents200Response**](GetTotalStudents200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Total de alumnos y tendencia |  -  |
| **403** | Acceso denegado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

