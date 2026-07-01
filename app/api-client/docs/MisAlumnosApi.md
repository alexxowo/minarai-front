# MisAlumnosApi

All URIs are relative to *http://localhost:8000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**enrollMyStudent**](MisAlumnosApi.md#enrollmystudent) | **POST** /api/my-students | Auto-inscribirse o inscribir un representado |
| [**getMyStudentsList**](MisAlumnosApi.md#getmystudentslist) | **GET** /api/my-students-list | Listar mis alumnos representados |
| [**showMyStudent**](MisAlumnosApi.md#showmystudent) | **GET** /api/my-students/{student} | Ver detalle de un alumno representado |



## enrollMyStudent

> enrollMyStudent()

Auto-inscribirse o inscribir un representado

Permite al representante registrar a sus representados o auto-inscribirse como alumno.

### Example

```ts
import {
  Configuration,
  MisAlumnosApi,
} from '';
import type { EnrollMyStudentRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MisAlumnosApi(config);

  try {
    const data = await api.enrollMyStudent();
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


## getMyStudentsList

> getMyStudentsList()

Listar mis alumnos representados

Obtiene los alumnos asociados al representante autenticado o a sí mismo.

### Example

```ts
import {
  Configuration,
  MisAlumnosApi,
} from '';
import type { GetMyStudentsListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MisAlumnosApi(config);

  try {
    const data = await api.getMyStudentsList();
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


## showMyStudent

> showMyStudent(student)

Ver detalle de un alumno representado

Obtiene la ficha de un alumno propio o representado.

### Example

```ts
import {
  Configuration,
  MisAlumnosApi,
} from '';
import type { ShowMyStudentRequest } from '';

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
  } satisfies ShowMyStudentRequest;

  try {
    const data = await api.showMyStudent(body);
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

