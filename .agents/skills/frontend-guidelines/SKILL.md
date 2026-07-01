---
name: frontend-guidelines
description: Directrices del frontend para el proyecto Minarai. Define patrones sobre React, PWA, Atomic Design, Responsividad y React Router v7.
---

# Directrices del Frontend - Proyecto Minarai

Este documento establece los estándares de desarrollo, arquitectura y diseño responsivo para el frontend de Minarai. Al realizar cualquier cambio o crear nuevos módulos, debes seguir rigurosamente estas reglas.

---

## 1. Stack Tecnológico Principal

- **Core**: React 19 (enfoque funcional con Hooks).
- **Framework & Enrutado**: React Router v7 (SSR habilitado por defecto, rutas estructuradas en `app/routes.ts` y ficheros correspondientes en `app/routes/`).
- **Estilos**: Tailwind CSS v4 (usando sus directivas de tema nativas `@theme` para variables y tokens).
- **Gestión de Estado**: Zustand para estados globales compartidos mínimos y estado local de React para lógica encapsulada.
- **PWA (Progressive Web App)**: Configurado mediante `site.webmanifest` y metas móviles en el `Layout` de `app/root.tsx`.

---

## 2. Arquitectura de Directorios (Atomic Design + React Router)

Se implementa una separación limpia de responsabilidades:

1. **`app/components/atoms/`**: Componentes unitarios puros sin dependencias externas (botones, inputs, textareas, selectors, checkbox). No deben manejar llamadas directas a APIs ni estados globales complejos.
2. **`app/components/molecules/`**: Combinaciones de dos o más átomos (e.g. `FieldGroup` conteniendo un input y un label, un modal genérico, cards informativas).
3. **`app/components/organisms/`**: Bloques funcionales más complejos formados por moléculas y átomos. Suelen gestionar interacciones específicas y layouts parciales (e.g. la barra lateral `Sidebar.tsx`, el header, formularios dinámicos).
4. **`app/components/templates/`**: Plantillas estructurales del layout general. Definen la disposición y distribución en el viewport sin estar atadas a datos específicos de negocio (e.g., `AdminLayoutTemplate`, `MobileSplitTemplate`).
5. **`app/routes/`**: Controladores de vista de React Router v7. Actúan como el "pegamento" cargando datos a través de loaders/actions, conectando componentes de Atomic Design y gestionando la lógica de negocio.

---

## 3. Principios de Adaptabilidad y Responsividad

Para lograr una aplicación fluida tanto en dispositivos móviles como en pantallas de escritorio, sigue las siguientes directrices:

- **Estrategia Mobile-First**: Diseña siempre primero la interfaz para móvil y escala hacia pantallas grandes usando los modificadores de breakpoints de Tailwind (`md:`, `lg:`, `xl:`).
- **Diseño Flex/Grid Adaptativo**: Evita anchos fijos en píxeles (`width: 400px`). Utiliza unidades relativas (`w-full`, `max-w-md`, `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
- **Navegación Adaptativa**:
  - En móviles, los menús y paneles laterales extensos deben transformarse en cajones colapsables (drawers) o menús flotantes accesibles mediante un botón tipo hamburguesa.
  - En pantallas de escritorio, el sidebar o menú de navegación principal debe permanecer estático o colapsable de forma lateral.

---

## 4. Estado de la Aplicación y Lógica General

- **Centralización**: Los hooks genéricos deben guardarse en `app/hooks/` (e.g. `useUrlModal`, `useMediaQuery`).
- **Zustand Stores**: Mantén las tiendas globales en `app/store/` (e.g. `useAuthStore`). Solo almacena datos que realmente necesiten ser compartidos transversalmente (sesiones, temas, preferencias globales).
- **Consumo de APIs**: Toda interacción con el backend debe realizarse a través del cliente autogenerado en `app/api-client/` para mantener consistencia de tipos con la OpenAPI del backend.

---

## 5. Directrices de PWA

- **Manifiesto**: Ubicado en `public/site.webmanifest`. Define el nombre de la app, colores de tema y los iconos maskables necesarios para dispositivos móviles.
- **Configuración de Viewport**: El viewport debe ser siempre responsivo e impedir zooms no deseados en inputs de dispositivos iOS/Android:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ```
- **SEO & Accesibilidad**: Cada componente y página debe usar etiquetas semánticas de HTML5 (`<main>`, `<section>`, `<header>`, `<footer>`, `<aside>`) y asegurar un contraste adecuado para cumplir con las directrices de accesibilidad (W3C/WCAG).
