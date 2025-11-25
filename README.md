# ✈️ Panel de Operaciones Aéreas (Flight Ops Panel)

![Version](https://img.shields.io/badge/version-1.2.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-production--ready-success.svg)
![Tech](https://img.shields.io/badge/tech-Astro%20|%20React%20|%20Tailwind-orange.svg)

Una solución moderna y profesional para la coordinación y gestión de operaciones aéreas en tiempo real. Diseñada con un enfoque **Mobile-First** y una estética **Liquid Glass** premium.

---

## ✨ Características Principales

### 🎨 Diseño & UX Premium

- **Estética Liquid Glass:** Interfaz moderna con efectos de vidrio esmerilado (Frosty Glass en modo claro, Translucent en modo oscuro).
- **Modo Oscuro/Claro:** Sistema de temas totalmente integrado y optimizado para cualquier condición de iluminación.
- **Mobile-First:** Experiencia nativa en móviles con menú inferior ergonómico y gestos táctiles.
- **Animaciones Fluidas:** Transiciones suaves y micro-interacciones para una experiencia de usuario pulida.

### 🛠️ Funcionalidades Operativas

- **Gestión de Vuelos:** Flujo completo desde "Pendiente" → "En Progreso" → "Completado".
- **Wizard de Creación:** Formulario paso a paso intuitivo para registrar nuevos vuelos.
- **Cronometraje de Operaciones:** Registro preciso de tiempos (ETA, ETD, Bloque, etc.).
- **Validación Inteligente:** Formularios con validación en tiempo real y feedback visual inmediato (Toasts).
- **Reportes Automáticos:** Generación de reportes detallados listos para imprimir o exportar.
- **Persistencia de Datos:** Almacenamiento local seguro para no perder información entre sesiones.

---

## 🚀 Tecnologías

Este proyecto está construido con un stack moderno y performante:

- **Framework:** [Astro](https://astro.build/) (Rendimiento estático + Islas dinámicas)
- **UI Library:** [React](https://reactjs.org/) (Componentes interactivos)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) (Tipado estático y seguridad)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) + CSS Modules (Diseño responsivo y custom)
- **Iconos:** Heroicons / SVGs optimizados
- **Paquetes:** `pnpm` (Gestión eficiente de dependencias)

---

## 📱 Capturas de Pantalla

|  Dashboard Móvil   |      Menú Inferior      |   Modo Oscuro    |
| :----------------: | :---------------------: | :--------------: |
| _Vista optimizada_ | _Navegación ergonómica_ | _Alto contraste_ |

---

## 🛠️ Instalación y Desarrollo

### Prerrequisitos

- Node.js (v18 o superior)
- pnpm (recomendado) o npm

### Pasos

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/flight-operations-app.git
   cd flight-operations-app
   ```

2. **Instalar dependencias**

   ```bash
   pnpm install
   ```

3. **Iniciar servidor de desarrollo**

   ```bash
   pnpm dev
   ```

   Visita `http://localhost:4321` en tu navegador.

4. **Construir para producción**
   ```bash
   pnpm build
   ```

---

## 📂 Estructura del Proyecto

```text
src/
├── components/       # Componentes React reutilizables (UI, Forms, Modals)
├── data/            # Datos estáticos y configuraciones
├── hooks/           # Custom Hooks (useFlightData, useFlightForm)
├── layouts/         # Layouts principales de Astro
├── pages/           # Rutas de la aplicación
├── styles/          # Archivos CSS globales y módulos (liquidGlass.css)
└── utils/           # Funciones de utilidad y helpers
```

---

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría realizar.

1. Haz un Fork del proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Haz Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">
  <p>Desarrollado por <b>thejasondev</b></p>
  <p>
    <a href="https://thejasondev.vercel.app">Portfolio</a> •
    <a href="https://github.com/thejasondev">GitHub</a>
  </p>
</div>
