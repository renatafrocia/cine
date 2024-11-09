## TwitchView - Aplicación de Streaming

Una aplicación de escritorio para ver streams de Twitch con una interfaz moderna y personalizable.

### Características

- 🎮 Visualización de streams de Twitch
- 💬 Chat integrado
- 👥 Contador de espectadores en tiempo real
- 🌙 Tema oscuro
- 📱 Diseño responsive
- 🖥️ Aplicación de escritorio multiplataforma

### Requisitos Previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [Rust](https://www.rust-lang.org/tools/install)
- [pnpm](https://pnpm.io/installation) (opcional, pero recomendado)

### Configuración del Proyecto

1. Cloná el repositorio:
```bash
git clone https://github.com/tuusuario/twitchview.git
cd twitchview
```

2. Instalá las dependencias:
```bash
pnpm install
```

3. Configurá las variables de entorno:
- Copiá el archivo `.env.example` a `.env`
- Completá las variables con tus credenciales de Twitch

### Desarrollo

Para ejecutar en modo desarrollo:

```bash
# Desarrollo web
pnpm dev

# Desarrollo de la app de escritorio
pnpm tauri dev
```

### Compilación

Para compilar la aplicación:

```bash
# Compilar versión web
pnpm build

# Compilar aplicación de escritorio
pnpm tauri build
```

Los archivos compilados se encontrarán en:
- Web: `dist/`
- Escritorio: `src-tauri/target/release/`

### Tecnologías

- [Tauri](https://tauri.app/) - Framework de aplicaciones de escritorio
- [Astro](https://astro.build/) - Framework web
- [React](https://reactjs.org/) - Biblioteca UI
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS
- [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript

### Licencia

MIT