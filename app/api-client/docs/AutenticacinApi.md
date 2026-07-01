# AutenticacinApi

All URIs are relative to *http://localhost:8000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**_03afb12b342c2ea43bdc1de4f39e91a8**](AutenticacinApi.md#_03afb12b342c2ea43bdc1de4f39e91a8) | **POST** /logout | Cerrar sesión |
| [**_42f77e072dec84b0e1094cca1228298e**](AutenticacinApi.md#_42f77e072dec84b0e1094cca1228298e) | **POST** /login | Iniciar sesión |
| [**_573de1fed352c1205a32c4d1b9877375**](AutenticacinApi.md#_573de1fed352c1205a32c4d1b9877375) | **POST** /register | Registrar un nuevo usuario |



## _03afb12b342c2ea43bdc1de4f39e91a8

> Model03afb12b342c2ea43bdc1de4f39e91a8200Response _03afb12b342c2ea43bdc1de4f39e91a8()

Cerrar sesión

Invalida el token JWT del usuario autenticado.

### Example

```ts
import {
  Configuration,
  AutenticacinApi,
} from '';
import type { 03afb12b342c2ea43bdc1de4f39e91a8Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AutenticacinApi(config);

  try {
    const data = await api._03afb12b342c2ea43bdc1de4f39e91a8();
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

[**Model03afb12b342c2ea43bdc1de4f39e91a8200Response**](Model03afb12b342c2ea43bdc1de4f39e91a8200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Sesión cerrada con éxito |  -  |
| **401** | No autorizado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## _42f77e072dec84b0e1094cca1228298e

> Model42f77e072dec84b0e1094cca1228298e200Response _42f77e072dec84b0e1094cca1228298e(loginRequest)

Iniciar sesión

Autentica al usuario en el sistema usando credenciales de email y contraseña, retornando un token JWT.

### Example

```ts
import {
  Configuration,
  AutenticacinApi,
} from '';
import type { 42f77e072dec84b0e1094cca1228298eRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AutenticacinApi();

  const body = {
    // LoginRequest
    loginRequest: ...,
  } satisfies 42f77e072dec84b0e1094cca1228298eRequest;

  try {
    const data = await api._42f77e072dec84b0e1094cca1228298e(body);
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
| **loginRequest** | [LoginRequest](LoginRequest.md) |  | |

### Return type

[**Model42f77e072dec84b0e1094cca1228298e200Response**](Model42f77e072dec84b0e1094cca1228298e200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Inicio de sesión exitoso |  -  |
| **422** | Error de validación o credenciales incorrectas |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## _573de1fed352c1205a32c4d1b9877375

> Model573de1fed352c1205a32c4d1b9877375201Response _573de1fed352c1205a32c4d1b9877375(registerRequest)

Registrar un nuevo usuario

Permite registrar un nuevo usuario con el rol por defecto USER.

### Example

```ts
import {
  Configuration,
  AutenticacinApi,
} from '';
import type { 573de1fed352c1205a32c4d1b9877375Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AutenticacinApi();

  const body = {
    // RegisterRequest
    registerRequest: ...,
  } satisfies 573de1fed352c1205a32c4d1b9877375Request;

  try {
    const data = await api._573de1fed352c1205a32c4d1b9877375(body);
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
| **registerRequest** | [RegisterRequest](RegisterRequest.md) |  | |

### Return type

[**Model573de1fed352c1205a32c4d1b9877375201Response**](Model573de1fed352c1205a32c4d1b9877375201Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Usuario registrado exitosamente |  -  |
| **422** | Error de validación (ej. el email ya está en uso, contraseñas no coinciden) |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

