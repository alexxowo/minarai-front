# AdministracinAlumnosApi

All URIs are relative to *http://localhost:8000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**_043be570e56f8ff7a31e3ae3694c93c9**](AdministracinAlumnosApi.md#_043be570e56f8ff7a31e3ae3694c93c9) | **GET** /api/admin/students | Listar todos los alumnos |
| [**_4f55fdb476bc5d5f099e21fd78b8c84f**](AdministracinAlumnosApi.md#_4f55fdb476bc5d5f099e21fd78b8c84f) | **PATCH** /api/admin/students/{student}/status | Cambiar estado activo |
| [**_73dbbc5d6a42e6594ebcee2fa13ef6e4**](AdministracinAlumnosApi.md#_73dbbc5d6a42e6594ebcee2fa13ef6e4) | **GET** /api/admin/students/{student} | Ver ficha de un alumno |
| [**_961d499e9711c8b48daa3e2612ab2014**](AdministracinAlumnosApi.md#_961d499e9711c8b48daa3e2612ab2014) | **POST** /api/admin/students | Inscribir un nuevo alumno |
| [**e7ea3c55affeb8fce01d20ba96514815**](AdministracinAlumnosApi.md#e7ea3c55affeb8fce01d20ba96514815) | **PUT** /api/admin/students/{student} | Modificar alumno |



## _043be570e56f8ff7a31e3ae3694c93c9

> _043be570e56f8ff7a31e3ae3694c93c9()

Listar todos los alumnos

Obtiene la lista completa de alumnos inscritos (Solo Admin).

### Example

```ts
import {
  Configuration,
  AdministracinAlumnosApi,
} from '';
import type { 043be570e56f8ff7a31e3ae3694c93c9Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdministracinAlumnosApi(config);

  try {
    const data = await api._043be570e56f8ff7a31e3ae3694c93c9();
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


## _4f55fdb476bc5d5f099e21fd78b8c84f

> _4f55fdb476bc5d5f099e21fd78b8c84f(student)

Cambiar estado activo

Permite suspender o dar de alta a un alumno (Solo Admin).

### Example

```ts
import {
  Configuration,
  AdministracinAlumnosApi,
} from '';
import type { 4f55fdb476bc5d5f099e21fd78b8c84fRequest } from '';

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
  } satisfies 4f55fdb476bc5d5f099e21fd78b8c84fRequest;

  try {
    const data = await api._4f55fdb476bc5d5f099e21fd78b8c84f(body);
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


## _73dbbc5d6a42e6594ebcee2fa13ef6e4

> _73dbbc5d6a42e6594ebcee2fa13ef6e4(student)

Ver ficha de un alumno

Obtiene la información de un alumno específico (Solo Admin).

### Example

```ts
import {
  Configuration,
  AdministracinAlumnosApi,
} from '';
import type { 73dbbc5d6a42e6594ebcee2fa13ef6e4Request } from '';

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
  } satisfies 73dbbc5d6a42e6594ebcee2fa13ef6e4Request;

  try {
    const data = await api._73dbbc5d6a42e6594ebcee2fa13ef6e4(body);
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
| **404** | No encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## _961d499e9711c8b48daa3e2612ab2014

> _961d499e9711c8b48daa3e2612ab2014()

Inscribir un nuevo alumno

Registra un alumno con rango manual (Solo Admin).

### Example

```ts
import {
  Configuration,
  AdministracinAlumnosApi,
} from '';
import type { 961d499e9711c8b48daa3e2612ab2014Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdministracinAlumnosApi(config);

  try {
    const data = await api._961d499e9711c8b48daa3e2612ab2014();
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


## e7ea3c55affeb8fce01d20ba96514815

> e7ea3c55affeb8fce01d20ba96514815(student)

Modificar alumno

Actualiza los datos del alumno (Solo Admin).

### Example

```ts
import {
  Configuration,
  AdministracinAlumnosApi,
} from '';
import type { E7ea3c55affeb8fce01d20ba96514815Request } from '';

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
  } satisfies E7ea3c55affeb8fce01d20ba96514815Request;

  try {
    const data = await api.e7ea3c55affeb8fce01d20ba96514815(body);
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

