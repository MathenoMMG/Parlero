# Working Logbook - Parleró

## Esquema Completo Actual
- Aplicación web responsive / mobile-first creada con **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **Framer Motion**, **Zustand** (con persistencia local) y **Supabase**.
- Diseñada específicamente para preparar el examen de acreditación de italiano **A2 del CLA (Centro Linguistico di Ateneo) - Politecnico di Torino**.
- Exportación estática (`output: 'export'`) desplegada en **Netlify**.

### Estructura de Directorios
- `logo-*.png`: Activos de marca e imagotipo.
- `netlify.toml`: Configuración de build estático en Netlify.
- `README.md`: Documentación principal del repositorio, adaptada con badges, branding, arquitectura y guías.
- `app/`:
  - `src/app/`: Rutas Next.js (`/`, `/study`, `/study/[id]`, `/exam`, `/exam/session`, `/exam/results`).
  - `src/components/`: Componentes UI y módulos de estudio y examen.
  - `src/data/`: 10 Milestones temáticas estructuradas (`milestones.ts`), banco de preguntas oficial (`questions.json`), esquema y datos SQL (`seed.sql`).
  - `src/stores/`: Zustand store con persistencia y sincronización silenciosa con Supabase (`useProgressStore.ts`).

## Qué hay
- [x] Arquitectura Next.js estática funcional y adaptada para despliegue en Netlify.
- [x] Percorso di Studio interactivo con mapa de 10 hitos (gramática, vocabulario y ejercicios por hito).
- [x] Simulatore d'Esame CLA con configuración personalizada, temporizador, banco de preguntas y desglose de resultados con explicaciones.
- [x] Soporte para modo claro/oscuro y efectos de sonido configurables.
- [x] Sincronización transparente de progreso con Supabase por identificador de dispositivo.
- [x] README.md principal y sincronizado en `app/` con diseño profesional, badges oficiales, logotipos adaptativos dark/light mode y guía detallada.

## Qué hace falta
- [x] Completado README.md para GitHub.
- [ ] Próximos pasos que el usuario requiera para nuevas funciones o contenido.

## Qué está fallando
- Ningún bug activo ni error de compilación.
