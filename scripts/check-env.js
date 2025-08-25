#!/usr/bin/env node

/**
 * Script de vérification des variables d'environnement
 * Usage: node scripts/check-env.js
 */

// Charger les variables d'environnement depuis .env.local
const fs = require("fs");
const path = require("path");

// Fonction pour charger le fichier .env.local
function loadEnvFile() {
  const envPath = path.join(process.cwd(), ".env.local");

  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    const lines = envContent.split("\n");

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith("#")) {
        const [key, ...valueParts] = trimmedLine.split("=");
        if (key && valueParts.length > 0) {
          const value = valueParts.join("=").trim();
          // Supprimer les guillemets si présents
          const cleanValue = value.replace(/^["']|["']$/g, "");
          process.env[key.trim()] = cleanValue;
        }
      }
    });

    console.log("📁 Fichier .env.local chargé avec succès");
  } else {
    console.log("⚠️  Fichier .env.local non trouvé");
  }
}

// Charger les variables d'environnement
loadEnvFile();

const requiredEnvVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
];

const missingVars = [];

console.log("🔍 Vérification des variables d'environnement...\n");

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    missingVars.push(varName);
    console.log(`❌ ${varName} - MANQUANT`);
  } else {
    console.log(`✅ ${varName} - CONFIGURÉ`);
  }
});

console.log("");

if (missingVars.length > 0) {
  console.log("❌ Variables manquantes détectées !");
  console.log(
    "📝 Veuillez créer un fichier .env.local avec les variables suivantes :\n"
  );

  missingVars.forEach((varName) => {
    console.log(`${varName}=votre_valeur_ici`);
  });

  console.log(
    "\n🔗 Consultez le README.md pour plus d'informations sur l'obtention de ces clés."
  );
  process.exit(1);
} else {
  console.log("🎉 Toutes les variables d'environnement sont configurées !");
  process.exit(0);
}
