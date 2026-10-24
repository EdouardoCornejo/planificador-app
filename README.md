# Planificador de Gastos

Aplicación móvil de **control de presupuesto personal** hecha con **React Native** y **TypeScript**. Defines un presupuesto, registras gastos por categoría, los editas, eliminas o filtras, y una **gráfica circular** muestra el porcentaje gastado. Todo se guarda en el dispositivo con **AsyncStorage**, así que los datos persisten al cerrar la app.

![Tech](https://img.shields.io/badge/React_Native-0.71.2-61DAFB)
![Tech](https://img.shields.io/badge/React-18.2.0-61DAFB)
![Tech](https://img.shields.io/badge/TypeScript-4.8.4-3178C6)
![Tech](https://img.shields.io/badge/AsyncStorage-1.17-blue)
![Tech](https://img.shields.io/badge/Reanimated-2.14-purple)

---

## Tabla de contenidos

- [Planificador de Gastos](#planificador-de-gastos)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Qué hace el proyecto](#qué-hace-el-proyecto)
  - [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
    - [Requisitos previos](#requisitos-previos)
    - [Instalación](#instalación)
    - [Ejecutar en Android](#ejecutar-en-android)
    - [Ejecutar en iOS](#ejecutar-en-ios)
    - [Scripts disponibles](#scripts-disponibles)
  - [Uso](#uso)
  - [Cómo funciona](#cómo-funciona)
    - [1. `App.tsx`](#1-apptsx)
    - [2. Componentes](#2-componentes)
    - [3. Helpers](#3-helpers)
    - [4. Persistencia](#4-persistencia)
    - [Flujo de la app](#flujo-de-la-app)
  - [Tecnologías](#tecnologías)
  - [Estructura del proyecto](#estructura-del-proyecto)
  - [Personalización](#personalización)
  - [Licencia](#licencia)

---

## Qué hace el proyecto

- **Definir presupuesto**: campo numérico que solo acepta dígitos; rechaza valores `0` o menores con una alerta.
- **Panel de control** con una gráfica circular animada (`react-native-circular-progress-indicator`) del **porcentaje gastado** y los montos de presupuesto, disponible y gastado en formato moneda USD.
- **Agregar gastos** desde un botón flotante que abre un `Modal` con nombre, cantidad y categoría.
- **7 categorías** con icono propio: Ahorro, Comida, Casa, Gastos Varios, Ocio, Salud y Suscripciones.
- **Editar y eliminar** gastos: mantén presionado un gasto para abrirlo en el formulario; "Eliminar" pide confirmación.
- **Filtrar** el listado por categoría.
- **Fecha de registro** de cada gasto formateada en español (`es-ES`).
- **Reiniciar la app** (mantener presionado "Reiniciar App"): borra presupuesto y gastos tras confirmar.
- **Persistencia local** del presupuesto y los gastos con AsyncStorage.

---

## Cómo ejecutar el proyecto

### Requisitos previos

- **Node.js 18** (indicado en `.node-version`) y **Yarn** (el repo incluye `yarn.lock`).
- Entorno de React Native CLI configurado ([guía oficial](https://reactnative.dev/docs/environment-setup)): Android Studio + SDK para Android; Xcode, Ruby `2.7.6` y CocoaPods para iOS (macOS).

### Instalación

```bash
git clone <url-del-repositorio>
cd planificador-app
yarn install
```

No necesita variables de entorno ni backend.

### Ejecutar en Android

```bash
yarn start          # arranca Metro
yarn android        # en otra terminal: compila e instala en el emulador/dispositivo
```

### Ejecutar en iOS

```bash
cd ios && bundle install && bundle exec pod install && cd ..
yarn start
yarn ios
```

> `babel.config.js` incluye el plugin `react-native-reanimated/plugin` (requerido por la gráfica). Si cambias la configuración de Babel, reinicia Metro con `yarn start --reset-cache`.

### Scripts disponibles

| Script            | Comando                    | Descripción                            |
| ----------------- | -------------------------- | -------------------------------------- |
| `yarn start`      | `react-native start`       | Inicia el bundler Metro                |
| `yarn android`    | `react-native run-android` | Compila y ejecuta la app en Android    |
| `yarn ios`        | `react-native run-ios`     | Compila y ejecuta la app en iOS        |
| `yarn lint`       | `eslint .`                 | Revisa el código con ESLint            |
| `yarn test`       | `jest`                     | Ejecuta el test de render de `App.tsx` |
| `yarn test:watch` | `jest --watch`             | Ejecuta Jest en modo observación       |

---

## Uso

| Acción                        | Cómo                                                                 |
| ----------------------------- | -------------------------------------------------------------------- |
| Definir presupuesto           | Escribe la cantidad y pulsa **"Agregar Presupuesto"**                |
| Nuevo gasto                   | Pulsa el botón flotante (abajo a la derecha) → **"Agregar Gasto"**   |
| Editar un gasto               | **Mantén presionado** el gasto → cambia datos → **"Actualizar Registro"** |
| Eliminar un gasto             | Abre el gasto → **mantén presionado "Eliminar"** → "Confirmar"       |
| Cerrar el formulario          | **Mantén presionado "Cancelar"**                                     |
| Filtrar                       | Elige una categoría en **"Filtrar Gastos"**                          |
| Reiniciar todo                | **Mantén presionado "Reiniciar App"** → "Aceptar"                    |

---

## Cómo funciona

### 1. `App.tsx`

Componente raíz que concentra el estado y la lógica:

- Estado: `presupuesto`, `isValid` (si ya hay presupuesto válido), `gastos`, `gasto` (el que se está editando), `modal`, `filtro` y `gastosFiltrados`.
- `handleNuevoPresupuesto` valida que el presupuesto sea mayor que `0`.
- `handleGasto` valida que nombre, categoría y cantidad no estén vacíos; si el gasto tiene `id` lo reemplaza en el arreglo, si no le asigna `generarID()` y `Date.now()` y lo agrega.
- `eliminarGasto` y `resetearApp` piden confirmación con `Alert.alert` antes de borrar.
- Muestra `NuevoPresupuesto` o `ControlPresupuesto` según `isValid`, y `Filtro` + `ListadoGastos` + el botón flotante solo cuando hay presupuesto.

### 2. Componentes

- `presupuesto/NuevoPresupuesto.tsx` — formulario inicial; limpia la entrada con `soloNumeros`.
- `controlPresupuesto/ControlPresupuesto.tsx` — calcula `totalGastado` con `reduce`, el disponible y el porcentaje (actualizado tras 1 s para animar `CircularProgress`).
- `formularioGasto/formularioGasto.tsx` — formulario del `Modal`; precarga los datos cuando recibe un `gasto` existente y cambia el título a "Editar Gasto".
- `filtro/Filtro.tsx` — `Picker` de categorías; un `useEffect` calcula `gastosFiltrados` al cambiar `filtro`.
- `listadoGastos/ListadoGastos.tsx` y `Gasto.tsx` — listado (completo o filtrado) con icono, categoría, nombre, fecha y cantidad; muestra "No hay gastos" si está vacío.
- `header/Header.tsx` — título "Planificador de Gastos".

### 3. Helpers

`src/helpers/` exporta funciones puras:

- `formatearCantidad` — `toLocaleString('en-US', { style: 'currency', currency: 'USD' })`.
- `formatearFecha` — fecha y hora larga en `es-ES` con formato de 12 h.
- `generarID` — id aleatorio en base 36 + `Date.now()`.
- `soloNumeros` — filtra cualquier carácter que no sea dígito.
- `diccionarioIconos` — mapa categoría → imagen de `src/img/`.
- `picker` — opciones de categoría para los `Picker`.

### 4. Persistencia

Cuatro `useEffect` en `App.tsx` sincronizan el estado con AsyncStorage:

| Clave                       | Contenido                       |
| --------------------------- | ------------------------------- |
| `planificador_presupuesto`  | Presupuesto (string)            |
| `planificador_gastos`       | Arreglo de gastos en JSON       |

`resetearApp` llama a `AsyncStorage.clear()`.

### Flujo de la app

```
App (montaje)
  ├─ AsyncStorage.getItem('planificador_presupuesto') → si > 0: isValid = true
  └─ AsyncStorage.getItem('planificador_gastos')      → gastos
        ↓
   isValid ?
     ├─ no → <NuevoPresupuesto> → handleNuevoPresupuesto() → isValid = true
     └─ sí → <ControlPresupuesto> (gráfica + montos)
             <Filtro>        → gastosFiltrados
             <ListadoGastos> → long press en <Gasto> → setGasto + abrir Modal
             botón flotante  → Modal <FormularioGasto>
                                 ├─ onGasto     → handleGasto()  (crear / actualizar)
                                 └─ onEliminar  → eliminarGasto() (confirmar)
        ↓
   useEffect([gastos]) / useEffect([presupuesto]) → AsyncStorage.setItem(...)
```

---

## Tecnologías

- **React Native 0.71.2** + **React 18.2.0** — UI nativa para Android e iOS.
- **TypeScript 4.8.4** — tipado de props y modelos (`gastoProp`, `categorias`, `pickerTypes`).
- **@react-native-async-storage/async-storage** — persistencia local.
- **@react-native-picker/picker** — selectores de categoría y filtro.
- **react-native-circular-progress-indicator** (+ `react-native-reanimated` y `react-native-svg`) — gráfica circular animada.
- **ESLint**, **Prettier** y **Jest** (`react-test-renderer`) — calidad y test básico.

---

## Estructura del proyecto

```
planificador-app/
├── App.tsx                              # Estado, validaciones y persistencia
├── index.js                             # Registro de la app (AppRegistry)
├── app.json
├── babel.config.js                      # Incluye el plugin de Reanimated
├── src/
│   ├── components/
│   │   ├── index.ts                     # Barrel de componentes
│   │   ├── controlPresupuesto/          # Gráfica y montos
│   │   ├── filtro/                      # Filtro por categoría
│   │   ├── formularioGasto/             # Formulario del Modal
│   │   ├── header/                      # Título
│   │   ├── listadoGastos/               # ListadoGastos.tsx + Gasto.tsx
│   │   └── presupuesto/                 # NuevoPresupuesto.tsx
│   │   (cada carpeta incluye su archivo *.styles.ts e index.ts)
│   ├── helpers/
│   │   ├── diccionarioIconos.ts
│   │   ├── formatearCantidad.ts
│   │   ├── formatearFecha.ts
│   │   ├── generarId.ts
│   │   ├── pickerValues.ts
│   │   ├── soloNumeros.ts
│   │   └── index.ts
│   ├── img/                             # Iconos de categorías y botón "nuevo gasto"
│   ├── styles/
│   │   ├── app.styles.ts                # Estilos de App
│   │   └── index.ts                     # Estilo global de contenedor
│   └── Types/
│       └── AppTypes.ts                  # gastoProp, categorias, pickerTypes
├── __tests__/
│   └── App-test.tsx                     # Test de render
├── android/                             # Proyecto nativo Android
├── ios/                                 # Proyecto nativo iOS
├── metro.config.js
├── tsconfig.json
└── package.json
```

---

## Personalización

| Dónde                                       | Qué                                     | Valor actual                         |
| ------------------------------------------- | --------------------------------------- | ------------------------------------ |
| `src/helpers/pickerValues.ts` → `picker`    | Categorías disponibles                  | 7 categorías + "-- Seleccione"       |
| `src/helpers/diccionarioIconos.ts`          | Icono de cada categoría                 | `src/img/icono_*.png`                |
| `src/helpers/formatearCantidad.ts`          | Locale y moneda                         | `en-US`, `USD`                       |
| `src/helpers/formatearFecha.ts`             | Locale de las fechas                    | `es-ES`                              |
| `App.tsx`                                   | Claves de AsyncStorage                  | `planificador_presupuesto`, `planificador_gastos` |
| `ControlPresupuesto.tsx` → `CircularProgress` | Radio y colores de la gráfica         | `radius={150}`, `#3B82F6` / `#F5F5F5` |
| `src/styles/app.styles.ts`                  | Color del encabezado                    | `#3B82F6`                            |

> Si agregas una categoría, añádela tanto en `picker` como en `diccionarioIconos` y en la interfaz `categorias` de `src/Types/AppTypes.ts`.

---

## Licencia

Proyecto de uso libre con fines educativos y de práctica.
