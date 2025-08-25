# Capture Témoignages MFINANCES

Application web pour collecter des témoignages clients avec support texte, audio et vidéo.

## Configuration des variables d'environnement

### 1. Variables locales (développement)

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```bash
# URL de votre projet Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Clé de service (privée, côté serveur uniquement)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Clé anonyme (publique, accessible côté client)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 2. Variables Vercel (production)

Dans votre dashboard Vercel, allez dans les paramètres de votre projet et ajoutez les variables d'environnement suivantes :

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Obtention des clés Supabase

1. Connectez-vous à votre dashboard Supabase
2. Allez dans Settings > API
3. Copiez :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Installation et développement

```bash
# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev
```

## Déploiement

Le projet est configuré pour Vercel. Poussez simplement votre code sur GitHub et connectez votre repository à Vercel.

## Sécurité

- Les variables d'environnement sont automatiquement exclues du repository grâce au `.gitignore`
- Les clés sensibles ne sont jamais exposées côté client
- Utilisez toujours `SUPABASE_SERVICE_ROLE_KEY` pour les opérations côté serveur uniquement
