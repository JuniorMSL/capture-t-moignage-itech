import { createClient } from "@supabase/supabase-js";

// Vérification des variables d'environnement
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not defined");
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY is not defined");
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { file, fileName, fileType } = req.body;

    if (!file || !fileName) {
      return res
        .status(400)
        .json({ error: "Fichier ou nom de fichier manquant" });
    }

    // Décoder le fichier base64
    const buffer = Buffer.from(file, "base64");

    // Générer un nom unique pour le fichier
    const timestamp = Date.now();
    const uniqueFileName = `${timestamp}-${fileName}`;

    // Déterminer le dossier selon le type de fichier
    const folder = fileType.startsWith("audio/") ? "audio" : "video";
    const filePath = `testimonials/${folder}/${uniqueFileName}`;

    // Upload vers Supabase Storage
    const { data, error } = await supabase.storage
      .from("media-files")
      .upload(filePath, buffer, {
        contentType: fileType,
        upsert: false,
      });

    if (error) {
      console.error("Erreur upload Supabase:", error);
      return res
        .status(500)
        .json({ error: "Erreur lors de l'upload du fichier" });
    }

    // Obtenir l'URL publique du fichier
    const { data: publicUrlData } = supabase.storage
      .from("media-files")
      .getPublicUrl(filePath);

    return res.status(200).json({
      success: true,
      fileUrl: publicUrlData.publicUrl,
      fileName: uniqueFileName,
      filePath: filePath,
    });
  } catch (error) {
    console.error("Erreur lors de l'upload:", error);
    return res.status(500).json({
      error: "Erreur serveur lors de l'upload",
      details: error.message,
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};
