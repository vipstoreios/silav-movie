# Silav Movie

A Kurdish movie and drama website built with Next.js, React, Tailwind CSS and Supabase.

## Live site

https://vipstoreios.github.io/silav-movie/

## Stack

- Next.js 15 Maintenance LTS
- React 19
- Supabase Database and Row Level Security
- Tailwind CSS
- GitHub Actions CI
- GitHub Pages static deployment

## Data model

The public site reads `movies` and `categories` from Supabase in the browser. Public access is read-only through RLS policies. Movie records support title, year, description, poster, video, trailer, subtitle and category fields.

## Production roadmap

Silav Movie is being upgraded into a complete streaming platform with:

- Full user authentication
- User profiles and preferences
- Watch history and watchlist
- Advanced movie and series management
- Admin dashboard with secure permissions
- Video player improvements
- Search and filtering
- Kurdish RTL optimized experience
- Better mobile and desktop UI

## Local development

1. Copy `.env.example` to `.env.local`.
2. Add the Supabase publishable key.
3. Run `npm install`.
4. Run `npm run dev`.

Validation commands:

```bash
npm run typecheck
npm run build
```

## Deployment

Pushes to `main` run CI and export the Next.js app to `out/`. The Pages workflow deploys that artifact to GitHub Pages. Supabase content is loaded live by the browser, so publishing a new movie does not require a site rebuild.

## Admin status

The current admin dashboard is intentionally read-only. Write access should only be enabled after a real Supabase Auth admin account and admin-only RLS policies are configured.
