# 🚀 Guía de Despliegue en Vercel

Esta guía te ayudará a desplegar tu aplicación Flight Operations Panel en Vercel de manera óptima.

## 📋 Pre-requisitos

- Cuenta en [Vercel](https://vercel.com)
- Repositorio en GitHub/GitLab/Bitbucket
- Node.js 18+ instalado localmente
- pnpm instalado globalmente

## 🔧 Configuración Inicial

### 1. Preparar el Repositorio

```bash
# Asegúrate de que todos los cambios estén committeados
git add .
git commit -m "feat: prepare for Vercel deployment"
git push origin main
```

### 2. Verificar Configuración Local

```bash
# Instalar dependencias
pnpm install

# Verificar que el build funciona
pnpm build:production

# Probar localmente
pnpm preview
```

## 🌐 Despliegue Automático

### Opción 1: Desde el Dashboard de Vercel

1. **Conectar Repositorio**:
   - Ir a [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click en "New Project"
   - Importar desde GitHub/GitLab/Bitbucket
   - Seleccionar el repositorio `flight-operations-app`

2. **Configuración Automática**:
   - Vercel detecta Astro automáticamente
   - Framework Preset: `Astro`
   - Build Command: `pnpm build`
   - Output Directory: `dist`
   - Install Command: `pnpm install`

3. **Variables de Entorno** (Opcional):
   ```
   NODE_VERSION=18
   PNPM_VERSION=8
   SITE_URL=https://tu-dominio.vercel.app
   ```

4. **Deploy**:
   - Click en "Deploy"
   - Esperar a que termine el build (~2-3 minutos)

### Opción 2: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy desde el directorio del proyecto
cd flight-operations-app
vercel

# Para production
vercel --prod
```

## ⚙️ Configuración Avanzada

### Headers de Seguridad

El archivo `vercel.json` incluye headers de seguridad:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options", 
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Caché Optimizado

Assets estáticos se cachean por 1 año:

```json
{
  "source": "/(.*)\\.(js|css|svg|png|jpg|jpeg|webp|woff|woff2|ttf|eot)",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "public, max-age=31536000, immutable"
    }
  ]
}
```

### Dominio Personalizado

1. **Agregar Dominio**:
   - En el dashboard del proyecto
   - Settings → Domains
   - Agregar tu dominio personalizado

2. **Configurar DNS**:
   ```
   CNAME: tu-dominio.com → cname.vercel-dns.com
   ```

3. **SSL Automático**:
   - Vercel configura SSL automáticamente
   - Certificado Let's Encrypt renovado automáticamente

## 📊 Monitoreo y Analytics

### Vercel Analytics

```bash
# Instalar Vercel Analytics
pnpm add @vercel/analytics

# En tu layout principal
import { Analytics } from '@vercel/analytics/react';

// Agregar al final del body
<Analytics />
```

### Web Vitals

```bash
# Instalar Web Vitals
pnpm add web-vitals

# Monitorear Core Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 🔄 CI/CD Automático

### GitHub Actions

El archivo `.github/workflows/ci.yml` incluye:

- ✅ Type checking con TypeScript
- ✅ Linting con ESLint
- ✅ Format checking con Prettier
- ✅ Build verification
- ✅ Lighthouse CI para performance

### Despliegue Automático

Cada push a `main` despliega automáticamente:

1. **Preview Deployments**: Cada PR crea un preview
2. **Production Deployments**: Push a `main` despliega a producción
3. **Rollback**: Fácil rollback desde el dashboard

## 🐛 Troubleshooting

### Error: Build Failed

```bash
# Verificar localmente
pnpm clean
pnpm install
pnpm build

# Revisar logs en Vercel dashboard
# Functions → View Function Logs
```

### Error: Module Not Found

```bash
# Verificar que todas las dependencias estén en package.json
pnpm install --frozen-lockfile

# Verificar imports relativos
# Usar paths absolutos cuando sea posible
```

### Error: Out of Memory

```bash
# En vercel.json, agregar:
{
  "functions": {
    "app/**": {
      "memory": 1024
    }
  }
}
```

### Performance Issues

1. **Verificar Bundle Size**:
   ```bash
   pnpm analyze
   ```

2. **Optimizar Imágenes**:
   - Usar formato WebP
   - Implementar lazy loading
   - Comprimir imágenes

3. **Code Splitting**:
   - Verificar chunks en build output
   - Lazy load componentes pesados

## 📈 Optimizaciones Post-Despliegue

### 1. SEO

- ✅ Sitemap automático en `/sitemap-index.xml`
- ✅ robots.txt configurado
- ✅ Meta tags optimizados
- ✅ Open Graph para redes sociales
- ✅ Structured data (JSON-LD)

### 2. Performance

- ✅ Assets comprimidos y cacheados
- ✅ CSS y JS minificados
- ✅ Lazy loading de imágenes
- ✅ Code splitting automático

### 3. PWA

- ✅ Manifest.json configurado
- ✅ Service Worker (opcional)
- ✅ Instalable en móviles

## 🔒 Seguridad

### Headers de Seguridad

- ✅ `X-Content-Type-Options: nosniff`
- ✅ `X-Frame-Options: DENY`
- ✅ `X-XSS-Protection: 1; mode=block`
- ✅ `Referrer-Policy: strict-origin-when-cross-origin`

### HTTPS

- ✅ HTTPS forzado automáticamente
- ✅ HSTS headers
- ✅ Certificado SSL renovado automáticamente

## 📞 Soporte

### Recursos Útiles

- [Vercel Docs](https://vercel.com/docs)
- [Astro Deployment Guide](https://docs.astro.build/en/guides/deploy/vercel/)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

### Contacto

- **Issues**: [GitHub Issues](https://github.com/thejasondev/flight-operations-app/issues)
- **Email**: support@flightops.app
- **Discord**: [Astro Discord](https://astro.build/chat)

---

**¡Tu aplicación está lista para volar! ✈️**
