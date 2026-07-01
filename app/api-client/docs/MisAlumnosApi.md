# MisAlumnosApi

All URIs are relative to *http://localhost:8000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**_0d507af438d337a3bf3a92bf89515f5f**](MisAlumnosApi.md#_0d507af438d337a3bf3a92bf89515f5f) | **POST** /api/my-students | Auto-inscribirse o inscribir un representado |
| [**_512fc0834b47f246a9c70a793486bed6**](MisAlumnosApi.md#_512fc0834b47f246a9c70a793486bed6) | **GET** /api/my-students/{student} | Ver detalle de un alumno representado |
| [**c6342066736a9dd30cdec73bf284a791**](MisAlumnosApi.md#c6342066736a9dd30cdec73bf284a791) | **GET** /api/my-students-list | Listar mis alumnos representados |



## _0d507af438d337a3bf3a92bf89515f5f

> _0d507af438d337a3bf3a92bf89515f5f()

Auto-inscribirse o inscribir un representado

Permite al representante registrar a sus representados o auto-inscribirse como alumno.

### Example

```ts
import {
  Configuration,
  MisAlumnosApi,
} from '';
import type { 0d507af438d337a3bf3a92bf89515f5fRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MisAlumnosApi(config);

  try {
    const data = await api._0d507af438d337a3bf3a92bf89515f5f();
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
| **201** | Alumno registrado exitosamente |  -  |
| **422** | Error de validación |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## _512fc0834b47f246a9c70a793486bed6

> _512fc0834b47f246a9c70a793486bed6(student)

Ver detalle de un alumno representado

Obtiene la ficha de un alumno propio o representado.

### Example

```ts
import {
  Configuration,
  MisAlumnosApi,
} from '';
import type { 512fc0834b47f246a9c70a793486bed6Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MisAlumnosApi(config);

  const body = {
    // number | ID del alumno
    student: 56,
  } satisfies 512fc0834b47f246a9c70a793486bed6Request;

  try {
    const data = await api._512fc0834b47f246a9c70a793486bed6(body);
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
| **student** | `number` | ID del alumno | [Defaults to `undefined`] |

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
| **200** | Detalle del alumno |  -  |
| **403** | No autorizado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## c6342066736a9dd30cdec73bf284a791

> c6342066736a9dd30cdec73bf284a791()

Listar mis alumnos representados

Obtiene los alumnos asociados al representante autenticado o a sí mismo.

### Example

```ts
import {
  Configuration,
  MisAlumnosApi,
} from '';
import type { C6342066736a9dd30cdec73bf284a791Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MisAlumnosApi(config);

  try {
    const data = await api.c6342066736a9dd30cdec73bf284a791();
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
| **200** | Lista de alumnos asociados |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

