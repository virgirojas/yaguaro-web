# Yaguaro Web

Aplicación web moderna para [Yaguaro](https://yaguaro.ar/) — estudio de ingeniería en energías renovables, Córdoba, Argentina.

## Stack

- **Next.js 16** (App Router, React 19)
- **Tailwind CSS 4**
- **MongoDB** + Mongoose (formulario de contacto)
- Diseño responsive con identidad visual de Yaguaro modernizada

## Requisitos

- Node.js 20+
- MongoDB (local o Atlas)

## Instalación

```bash
npm install
cp .env.example .env.local
```

Editá `.env.local`:

```
MONGODB_URI=mongodb://localhost:27017/yaguaro
ADMIN_PASSWORD=tu-contraseña-segura
```

## Desarrollo

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Estructura

```
src/
├── app/           # Páginas y API routes
├── components/    # UI, layout y secciones
├── data/site.ts   # Contenido del sitio
├── lib/mongodb.ts # Conexión a MongoDB
└── models/        # Modelos Mongoose
```

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Inicio |
| `/nosotros` | Sobre el estudio |
| `/servicios` | Servicios de ingeniería |
| `/soluciones` | Soluciones energéticas |
| `/obras` | Portfolio de proyectos |
| `/contacto` | Formulario y datos de contacto |

## Panel de administración

Accedé a [http://localhost:3000/admin](http://localhost:3000/admin) con la contraseña definida en `ADMIN_PASSWORD`.

Desde el panel podés editar:

- Información general (nombre, logo, estadísticas)
- Datos de contacto y horarios
- Contenido de Inicio, Nosotros, Servicios, Soluciones y Obras
- URLs de imágenes, proyectos, soluciones y galerías
- **Subida directa de imágenes** (JPG, PNG, WebP, GIF hasta 5 MB) — se guardan en `public/uploads/`

Los cambios se guardan en MongoDB y se reflejan en el sitio al instante.

## API

`POST /api/contact` — Guarda consultas en MongoDB.

```json
{
  "name": "Nombre",
  "phone": "+54 9 ...",
  "email": "email@ejemplo.com",
  "message": "Mensaje"
}
```

## Producción

```bash
npm run build
npm start
```

## Despliegue en Vercel + MongoDB Atlas

### 1. MongoDB Atlas

1. Creá una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Creá un cluster gratuito (M0).
3. En **Database Access**, creá un usuario con contraseña.
4. En **Network Access**, agregá `0.0.0.0/0` (permite conexiones desde Vercel).
5. En **Connect → Drivers**, copiá la connection string y reemplazá `<password>` por tu contraseña. Ejemplo:

```
mongodb+srv://usuario:TU_PASSWORD@cluster0.xxxxx.mongodb.net/yaguaro?retryWrites=true&w=majority
```

### 2. Repositorio en GitHub

El proyecto ya está versionado en Git. Subilo a GitHub y conectalo en Vercel:

```bash
git remote add origin https://github.com/TU_USUARIO/yaguaro-web.git
git push -u origin main
```

### 3. Vercel

1. Entrá a [vercel.com](https://vercel.com) e importá el repositorio `yaguaro-web`.
2. En **Settings → Environment Variables**, agregá:

| Variable | Valor |
|----------|-------|
| `MONGODB_URI` | Connection string de Atlas |
| `ADMIN_PASSWORD` | Contraseña del panel `/admin` |

3. Deploy. Vercel detecta Next.js automáticamente.

### Nota sobre imágenes subidas

En Vercel el filesystem es efímero: las imágenes subidas desde el admin **no persisten** entre deploys. Para producción con subida de archivos, conviene integrar [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) o un servicio similar. Las URLs externas (yaguaro.ar) siguen funcionando sin cambios.

