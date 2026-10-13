# Conversor USD a HNL

**Nombre del estudiante:** Juan Carlos Gavarrete

## Descripción

Aplicación web desarrollada con React, Vite y Material UI que convierte dólares estadounidenses (USD) a lempiras hondureños (HNL). Consulta la tasa de cambio desde la API pública de ExchangeRate-API y actualiza el resultado mientras el usuario escribe.

## Tecnologías utilizadas

- React
- Vite
- Material UI
- `useState` para almacenar la cantidad, la tasa de cambio, la carga y los errores
- `useEffect` y `fetch` para consultar la API al cargar la página

## API utilizada

`https://open.er-api.com/v6/latest/USD`

La tasa para lempiras se obtiene desde `rates.HNL`.

## Cómo ejecutar el proyecto

1. Instala [Node.js](https://nodejs.org/) si todavía no está instalado.
2. Descarga o clona este repositorio.
3. Abre una terminal en la carpeta del proyecto.
4. Instala las dependencias:

   ```bash
   npm install
   ```

5. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

6. Abre en el navegador la dirección local que muestra Vite, normalmente `http://localhost:5173`.

## Crear la versión de producción

```bash
npm run build
```

Vite genera los archivos listos para publicar dentro de la carpeta `dist`.

## Atribución

Rates By Exchange Rate API: https://www.exchangerate-api.com
