# Panel de Operaciones Aéreas

Aplicación web para coordinadores de operaciones aéreas que permite gestionar vuelos y sus operaciones.

## Características

- Interfaz moderna y profesional con soporte para tema claro y oscuro
- Gestión completa de vuelos: pendientes, en progreso y completados
- Registro detallado de operaciones de vuelo con tiempos
- Generación de reportes imprimibles
- Almacenamiento local de datos para persistencia entre sesiones

## Tecnologías

- [Astro](https://astro.build/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [pnpm](https://pnpm.io/)

## Requisitos

- Node.js (v18 o superior)
- pnpm

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd flight-operations-app
   ```

2. Instalar dependencias:

   ```bash
   pnpm install
   ```

3. Iniciar el servidor de desarrollo:

   ```bash
   pnpm run dev
   ```

4. Abrir el navegador en:
   ```
   http://localhost:4321
   ```

## Uso

### Agregar un nuevo vuelo

1. Complete el formulario en la sección "Agregar Vuelo" con los datos del vuelo.
2. Haga clic en "Agregar Vuelo" para añadirlo a la lista de pendientes.

### Gestionar operaciones de un vuelo

1. Haga clic en un vuelo pendiente para iniciar sus operaciones.
2. Registre los tiempos de inicio y finalización de cada operación.
3. Añada notas adicionales si es necesario.
4. Haga clic en "Finalizar y Generar Reporte" cuando todas las operaciones estén completas.

### Imprimir reportes

1. Al completar un vuelo, se mostrará automáticamente el reporte.
2. Haga clic en "Imprimir Reporte" para abrir el diálogo de impresión del navegador.

## Construcción para producción

Para generar la versión de producción:

```bash
pnpm run build
```

Los archivos se generarán en la carpeta `dist/`.

```sh
pnpm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
