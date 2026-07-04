# AdministracinAlumnosApi

All URIs are relative to *http://localhost:8000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**enrollStudent**](AdministracinAlumnosApi.md#enrollstudent) | **POST** /api/admin/students | Inscribir un nuevo alumno |
| [**getStudents**](AdministracinAlumnosApi.md#getstudents) | **GET** /api/admin/students | Listar todos los alumnos |
| [**showStudent**](AdministracinAlumnosApi.md#showstudent) | **GET** /api/admin/students/{student} | Ver ficha de un alumno |
| [**toggleStudentStatus**](AdministracinAlumnosApi.md#togglestudentstatus) | **PATCH** /api/admin/students/{student}/status | Cambiar estado activo |
| [**updateStudent**](AdministracinAlumnosApi.md#updatestudent) | **PUT** /api/admin/students/{student} | Modificar alumno |



## enrollStudent

> enrollStudent()

Inscribir un nuevo alumno

Registra un alumno con rango manual (Solo Admin).

### Example

```ts
import {
  Configuration,
  AdministracinAlumnosApi,
} from '';
import type { EnrollStudentRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdministracinAlumnosApi(config);

  try {
    const data = await api.enrollStudent();
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


## getStudents

> getStudents()

Listar todos los alumnos

Obtiene la lista completa de alumnos inscritos (Solo Admin).

### Example

```ts
import {
  Configuration,
  AdministracinAlumnosApi,
} from '';
import type { GetStudentsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdministracinAlumnosApi(config);

  try {
    const data = await api.getStudents();
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
| **200** | Lista de alumnos |  -  |
| **403** | Acceso denegado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## showStudent

> ShowStudent200Response showStudent(student)

Ver ficha de un alumno

Obtiene la información de un alumno específico (Solo Admin).

### Example

```ts
import {
  Configuration,
  AdministracinAlumnosApi,
} from '';
import type { ShowStudentRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdministracinAlumnosApi(config);

  const body = {
    // number | ID del alumno
    student: 56,
  } satisfies ShowStudentRequest;

  try {
    const data = await api.showStudent(body);
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

[**ShowStudent200Response**](ShowStudent200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Detalle del alumno |  -  |
| **404** | No encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## toggleStudentStatus

> toggleStudentStatus(student)

Cambiar estado activo

Permite suspender o dar de alta a un alumno (Solo Admin).

### Example

```ts
import {
  Configuration,
  AdministracinAlumnosApi,
} from '';
import type { ToggleStudentStatusRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdministracinAlumnosApi(config);

  const body = {
    // number | ID del alumno
    student: 56,
  } satisfies ToggleStudentStatusRequest;

  try {
    const data = await api.toggleStudentStatus(body);
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
| **200** | Estado modificado exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateStudent

> updateStudent(student)

Modificar alumno

Actualiza los datos del alumno (Solo Admin).

### Example

```ts
import {
  Configuration,
  AdministracinAlumnosApi,
} from '';
import type { UpdateStudentRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdministracinAlumnosApi(config);

  const body = {
    // number | ID del alumno
    student: 56,
  } satisfies UpdateStudentRequest;

  try {
    const data = await api.updateStudent(body);
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
| **200** | Alumno actualizado exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

