# Admin Panel Frontend - Sistema de gestión de roles y permisos

![Angular](https://img.shields.io/badge/Angular-20.x-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CSS_Modules-CC6699?logo=sass&logoColor=white)
![SSR](https://img.shields.io/badge/SSR-Angular_Universal-0F0F11?logo=angular&logoColor=white)
![License](https://img.shields.io/badge/License-Apache%202.0-blue)

## Descripción general

Frontend Angular 20 standalone que implementa la interfaz de administración para el sistema **Auth & RBAC API**. Proporciona una experiencia completa de gestión de usuarios, roles, permisos, módulos, funciones y estados del sistema, con autenticación JWT, control de acceso basado en permisos, diseño responsive, modo oscuro y almacenamiento de sesión configurable.

La aplicación está construida con **Angular 20 standalone components** (sin NgModules), utiliza el nuevo flujo de control `@if/@for/@defer`, señales (`signal`/`input`/`output`/`model`) para reactividad, SSR con Angular Universal y renderizado prerendered para rutas estáticas. Los estilos son 100% SCSS inline con CSS custom properties para tematización dinámica (claro/oscuro).

## Características clave

- Autenticación JWT con refresh token automático
- RBAC (Role-Based Access Control) con guardianes de ruta (`authGuard`, `publicGuard`, `permissionGuard`)
- CRUD completo de usuarios, roles, permisos, módulos, funciones, estados y estados de usuario
- Sidebar de navegación responsive + Navbar superior con breadcrumbs dinámicos
- Modo oscuro/claro con persistencia en almacenamiento y detección de preferencia del sistema
- Diseño responsive adaptable a móvil, tablet y desktop
- Almacenamiento de sesión configurable: `localStorage`, `sessionStorage` o `cookie`
- Token refresh automático programado antes de expiración
- Componentes reutilizables: Button, Table, Input, Modal, Alert, Card, Loader, Paginator, ConfirmDialog
- SSR con prerendering de rutas estáticas y renderizado en servidor para rutas parametrizadas
- Accesibilidad: roles ARIA, `aria-label`, `focus-visible`, `prefers-reduced-motion`

## Tabla de contenidos

- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Requisitos previos](#requisitos-previos)
- [Instalación y configuración](#instalación-y-configuración)
- [Ejecución en desarrollo](#ejecución-en-desarrollo)
- [Ejecución en producción](#ejecución-en-producción)
- [Ejecución en test](#ejecución-en-test)
- [Ejecución de tests](#ejecución-de-tests)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Componentes reutilizables](#componentes-reutilizables)
- [Endpoints del backend](#endpoints-del-backend)
- [Autor](#autor)
- [Licencia](#licencia)

## Tecnologías utilizadas

| Tecnología | Versión | Sitio oficial | Documentación |
|---|---|---|---|
| Angular | ^20.3.0 | [https://angular.dev](https://angular.dev) | [https://angular.dev/docs](https://angular.dev/docs) |
| TypeScript | ^5.7.0 | [https://typescriptlang.org](https://typescriptlang.org) | [https://typescriptlang.org/docs](https://typescriptlang.org/docs) |
| Angular SSR | ^20.3.0 | [https://angular.dev/guide/ssr](https://angular.dev/guide/ssr) | [https://angular.dev/guide/ssr](https://angular.dev/guide/ssr) |
| Karma + Jasmine | — | [https://karma-runner.github.io](https://karma-runner.github.io) | [https://jasmine.github.io](https://jasmine.github.io) |
| Node.js | 20.x LTS | [https://nodejs.org](https://nodejs.org) | [https://nodejs.org/docs/latest/api/](https://nodejs.org/docs/latest/api/) |

## Requisitos previos

- Node.js 20.x LTS o superior
- npm 10.x o superior
- Angular CLI 20.x (`npm install -g @angular/cli`)
- Backend **Auth & RBAC API** corriendo (ver README de NESTJS-BASE)

## Instalación y configuración

```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/admin-panel-frontend.git
cd ANGULAR_BASE

# Instalar dependencias
npm install

# Configurar variables de entorno (opcional)
# Los valores por defecto en environment.ts apuntan a http://localhost:4000
```

### Variables de entorno

Las variables de entorno se definen en archivos dentro de `src/environments/`. Cada archivo corresponde a un entorno de ejecución:

| Archivo | Entorno | Propósito |
|---|---|---|
| `environment.ts` | Desarrollo (base) | Valores por defecto para desarrollo local |
| `environment.development.ts` | Desarrollo | Sobrescribe `apiUrl` y `storageType` para dev |
| `environment.prod.ts` | Producción | **No se sube al repositorio** (ver `.gitignore`). Copiar desde `environment.prod.example.ts` |
| `environment.test.ts` | Tests | Configuración para ejecución de tests |

| Variable | Descripción | Ejemplo |
|---|---|---|
| `apiUrl` | URL base de la API REST | `http://localhost:4000` |
| `storageType` | Tipo de almacenamiento de sesión | `localStorage`, `sessionStorage`, `cookie` |
| `cookieName` | Nombre de la cookie (si `storageType = cookie`) | `auth_token` |
| `storagePrefix` | Prefijo para claves en storage | `app_` |
| `tokenExpiryBuffer` | Margen de seguridad para refresh (ms) | `300000` (5 min) |
| `refreshRetryDelay` | Tiempo entre reintentos de refresh (ms) | `1000` |
| `httpTimeout` | Tiempo de espera en peticiones HTTP (ms) | `30000` |
| `defaultPageSize` | Elementos por página en tablas | `10` |
| `paginationEnabled` | Activar paginación | `true` |

Para producción, crear el archivo a partir del ejemplo:

```bash
cp src/environments/environment.prod.example.ts src/environments/environment.prod.ts
# Editar con las URLs y claves reales
```

## Ejecución en desarrollo

```bash
ng serve
# o con configuración explícita
ng serve --configuration=development
```

La aplicación estará disponible en `http://localhost:4200`. Se recarga automáticamente al modificar archivos fuente.

### Con SSR (Server-Side Rendering)

```bash
ng serve --configuration=development
# SSR se activa automáticamente con Angular SSR habilitado
```

## Ejecución en producción

```bash
# Construir para producción (usa environment.prod.ts)
ng build --configuration=production

# Para servir con SSR (requiere Node.js en el servidor)
node dist/ANGULAR_BASE/server/server.mjs
```

Los archivos estáticos se generan en `dist/ANGULAR_BASE/browser/` y pueden servirse con cualquier servidor web (Nginx, Apache, etc.). Para SSR, se necesita el bundle de servidor en `dist/ANGULAR_BASE/server/`.

## Ejecución en test

```bash
ng build --configuration=test
```

Esta configuración carga `environment.test.ts` que utiliza `sessionStorage` con prefijo `app_test_` para no contaminar el almacenamiento de desarrollo.

## Ejecución de tests

```bash
# Tests unitarios (Jasmine + Karma)
ng test

# En modo watch (por defecto)
ng test --watch=true

# Una sola ejecución (para CI)
ng test --watch=false --browsers=ChromeHeadless

# Cobertura
ng test --code-coverage
```

## Estructura del proyecto

```
ANGULAR_BASE/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/          # Barra superior con breadcrumbs, usuario y tema
│   │   │   └── sidebar/         # Menú lateral de navegación
│   │   ├── core/
│   │   │   ├── guards/          # auth.guard, public.guard, permission.guard
│   │   │   ├── interceptors/    # auth.interceptor, error.interceptor
│   │   │   ├── interfaces/      # DTOs: AppResponse, Auth, User, Role, Permission, etc.
│   │   │   └── services/        # AuthService, TokenService, StorageService, ConfigService, ThemeService
│   │   ├── layout/
│   │   │   ├── auth-layout/     # Layout público (login, recuperación)
│   │   │   └── private-layout/  # Layout privado (sidebar + navbar + contenido)
│   │   ├── pages/
│   │   │   ├── public/          # Login, ForgotPassword, ResetPassword
│   │   │   └── private/         # Dashboard, User*, Role*, Permission*, Module*, Funcion*, Status*, StatusUser*, Profile, ChangePassword
│   │   └── shared/
│   │       └── components/      # Button, Table, Input, Modal, Alert, Card, Loader, Paginator, ConfirmDialog
│   ├── environments/            # environment.ts, .development, .prod.example, .test
│   ├── main.ts                  # Punto de entrada del navegador
│   ├── main.server.ts           # Punto de entrada SSR
│   └── styles.scss              # Estilos globales con CSS custom properties
├── angular.json                 # Configuración del proyecto Angular
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.server.json         # Configuración SSR
└── .gitignore
```

### Flujo de autenticación

1. El usuario ingresa credenciales en `/login`
2. `AuthService.login()` envía POST a `/auth/login`
3. El backend devuelve `access_token`, `refresh_token` y `expires_in`
4. `TokenService.saveAuthResponse()` almacena el token y programa el refresh automático
5. `StorageService` guarda según `storageType` configurado (localStorage/sessionStorage/cookie)
6. `authInterceptor` inyecta el token Bearer en cada petición
7. Antes de expirar, `TokenService` ejecuta refresh automático vía `timer()`
8. Si el refresh falla o hay 401/403, `errorInterceptor` invalida la sesión y redirige a `/login`

## Componentes reutilizables

| Componente | Selector | Descripción |
|---|---|---|
| Button | `app-button` | Variantes: primary, secondary, danger, success, warning, ghost. Tamaños sm/md/lg. Soporta loading. |
| Table | `app-table` | Tabla responsive con columnas configurables, ordenación y estado vacío/de carga. |
| Input | `app-input` | Input con label, hint, mensaje de error. Compatible con formularios reactivos (ControlValueAccessor). |
| Modal | `app-modal` | Diálogo modal con overlay, header, body y footer. |
| Alert | `app-alert` | Alertas success, error, warning, info. Dismissible con botón de cierre. |
| Card | `app-card` | Contenedor con header, body y footer. |
| Loader | `app-loader` | Spinner de carga con texto y slot para contenido. |
| Paginator | `app-paginator` | Paginación con info de registros y botones anterior/siguiente. |
| ConfirmDialog | `app-confirm-dialog` | Diálogo de confirmación "¿Está seguro?" con acciones personalizables. |

## Endpoints del backend

La aplicación consume los siguientes endpoints de la API REST (NESTJS-BASE):

### Autenticación

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/auth/login` | Iniciar sesión |
| POST | `/auth/logout` | Cerrar sesión |
| POST | `/auth/forgot-password` | Solicitar restablecimiento de contraseña |
| POST | `/auth/reset-password/:token` | Restablecer contraseña con token |
| POST | `/auth/change-password` | Cambiar contraseña (autenticado) |
| POST | `/auth/refresh` | Refrescar token JWT |

### CRUD (requieren autenticación)

| Recurso | Rutas | Descripción |
|---|---|---|
| `/user` | GET, POST, GET/:id, PATCH/:id, DELETE/:id | Usuarios |
| `/role` | GET, POST, GET/:id, PATCH/:id, DELETE/:id | Roles |
| `/permission` | GET, POST, GET/:id, PATCH/:id, DELETE/:id | Permisos |
| `/module` | GET, POST, GET/:id, PATCH/:id, DELETE/:id | Módulos |
| `/funcion` | GET, POST, GET/:id, PATCH/:id, DELETE/:id | Funciones |
| `/status` | GET, POST, GET/:id, PATCH/:id, DELETE/:id | Estados |
| `/status-user` | GET, POST, GET/:id, PATCH/:id, DELETE/:id | Estados de usuario |

## Autor

**Jesús Daniel Garizao Mejía**

- GitHub: [TheOfYisu](https://github.com/TheOfYisu)
- Instagram: [@theofyisu](https://www.instagram.com/theofyisu)

## Licencia

```
                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Copyright (c) 2025 Jesús Daniel Garizao Mejía

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```
