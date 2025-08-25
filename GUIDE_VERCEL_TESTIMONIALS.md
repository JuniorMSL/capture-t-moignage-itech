# Guide d'intégration des témoignages avec Vercel + Supabase ✅

Ce guide explique comment configurer votre site hébergé sur Vercel pour recevoir les témoignages depuis votre page de capture en utilisant Supabase comme base de données.

## ✅ IMPLÉMENTATION COMPLÈTE RÉALISÉE

**Votre système de témoignages est maintenant configuré avec Supabase + Vercel !**

### 📁 Fichiers créés :
- `api/testimonials.js` - Endpoint pour sauvegarder les témoignages
- `api/upload-media.js` - Endpoint pour uploader les fichiers média
- `supabase-schema.sql` - Schéma de base de données
- `package.json` - Dépendances nécessaires
- `.env.example` - Variables d'environnement à configurer
- `testimonials.js` - Modifié pour utiliser Supabase

## 🚀 ÉTAPES DE DÉPLOIEMENT

### 1. Créer un compte Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte gratuit
3. Créez un nouveau projet
4. Notez l'URL et les clés API de votre projet

### 2. Configurer la base de données

1. Dans Supabase, allez dans **SQL Editor**
2. Copiez-collez le contenu du fichier `supabase-schema.sql`
3. Exécutez le script pour créer la table `testimonials`

### 3. Configurer le Storage

1. Dans Supabase, allez dans **Storage**
2. Créez un nouveau bucket nommé `media-files`
3. Rendez-le public
4. Configurez les policies :
   - Upload: Autoriser pour tous
   - Select: Public

### 4. Installer les dépendances

```bash
npm install @supabase/supabase-js
```

### 5. Configurer les variables d'environnement

1. Créez un fichier `.env.local` à la racine de votre projet
2. Copiez le contenu de `.env.example`
3. Remplissez avec vos vraies valeurs Supabase :
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=votre-service-role-key
   ```

### 6. Configurer Vercel

1. Dans votre dashboard Vercel
2. Allez dans Settings > Environment Variables
3. Ajoutez les deux variables d'environnement
4. Redéployez votre site

## 📊 Structure de la base de données

La table `testimonials` contient :
- **id** : Identifiant unique
- **client_name** : Nom du client (obligatoire)
- **client_email** : Email du client (obligatoire)
- **client_company** : Entreprise (optionnel)
- **client_phone** : Téléphone (optionnel)
- **testimonial_type** : Type (text/audio/video)
- **content** : Contenu textuel
- **media_url** : URL du fichier média
- **rating** : Note de 1 à 5
- **allow_website_publication** : Autorisation de publication
- **status** : Statut de modération (pending/approved/rejected)
- **created_at** / **updated_at** : Dates

## 🎯 FONCTIONNEMENT DU SYSTÈME

### Flux de données :
1. **Utilisateur** remplit le formulaire de témoignage
2. **Frontend** (testimonials.js) traite les données :
   - Upload les fichiers média vers Supabase Storage
   - Envoie les données vers `/api/testimonials`
3. **API Vercel** (`api/testimonials.js`) :
   - Reçoit les données
   - Les sauvegarde dans Supabase
   - Retourne une confirmation

### Types de témoignages supportés :
- **Texte** : Témoignage écrit avec note
- **Audio** : Enregistrement ou fichier uploadé
- **Vidéo** : Enregistrement webcam ou fichier uploadé

### Gestion des fichiers :
- Upload automatique vers Supabase Storage
- URLs publiques générées automatiquement
- Support des formats : MP3, WAV, M4A, MP4, MOV, AVI, WEBM

## 📈 Gestion des témoignages

### Interface d'administration (à développer) :
Vous pouvez créer une interface simple pour :
- Consulter tous les témoignages
- Modérer (approuver/rejeter)
- Exporter les données
- Gérer les fichiers média

### Requêtes SQL utiles :
```sql
-- Voir tous les témoignages en attente
SELECT * FROM testimonials WHERE status = 'pending';

-- Approuver un témoignage
UPDATE testimonials SET status = 'approved' WHERE id = 'uuid-du-témoignage';

-- Statistiques par type
SELECT testimonial_type, COUNT(*) as total 
FROM testimonials 
GROUP BY testimonial_type;
```

## 🚀 DÉPLOIEMENT

1. **Commit et push** vos changements vers GitHub
2. **Vercel** déploiera automatiquement
3. **Testez** sur `https://votre-site.vercel.app/testimonials.html`

## ✅ VÉRIFICATIONS

Après déploiement, vérifiez :
- [ ] Les variables d'environnement sont configurées dans Vercel
- [ ] La base de données Supabase est créée
- [ ] Le bucket Storage `media-files` existe et est public
- [ ] Les dépendances sont installées (`@supabase/supabase-js`)
- [ ] Le formulaire fonctionne sur la page de témoignages

## 🔧 DEBUG

### Logs Vercel :
- Dashboard Vercel > Votre projet > Functions
- Consultez les logs en temps réel

### Logs Supabase :
- Dashboard Supabase > Logs
- Vérifiez les insertions dans la table

### Erreurs communes :
- Variables d'environnement manquantes
- Policies Supabase mal configurées
- Bucket Storage non public

## 🎉 FÉLICITATIONS !

Votre système de témoignages est maintenant opérationnel avec :
- ✅ Sauvegarde en base de données Supabase
- ✅ Upload automatique des fichiers média
- ✅ Système de modération intégré
- ✅ Interface utilisateur complète
- ✅ Hébergement sur Vercel

**Prêt à collecter vos premiers témoignages !** 🚀