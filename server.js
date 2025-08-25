const express = require("express");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

const app = express();
const PORT = 3000;

// Middleware pour parser le JSON
app.use(express.json({ limit: "50mb" }));
app.use(express.static("."));

// Configuration Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Route pour les témoignages
app.post("/api/testimonials", async (req, res) => {
  try {
    const {
      clientName,
      clientCompany,
      clientEmail,
      clientPhone,
      testimonialText,
      testimonialRating,
      audioRating,
      videoRating,
      audioFileUrl,
      videoFileUrl,
      allowWebsite,
      testimonialType = "text",
    } = req.body;

    // Validation des champs obligatoires
    if (!clientName || !clientEmail) {
      return res.status(400).json({
        error: "Nom et email sont obligatoires",
      });
    }

    // Déterminer le type de témoignage et la note
    let finalType = testimonialType;
    let finalRating = testimonialRating;
    let content = testimonialText;
    let mediaUrl = null;

    if (audioFileUrl) {
      finalType = "audio";
      finalRating = audioRating || testimonialRating;
      mediaUrl = audioFileUrl;
    } else if (videoFileUrl) {
      finalType = "video";
      finalRating = videoRating || testimonialRating;
      mediaUrl = videoFileUrl;
    }

    // Insérer le témoignage dans la base de données
    const { data, error } = await supabase
      .from("testimonials")
      .insert([
        {
          client_name: clientName,
          client_company: clientCompany || null,
          client_email: clientEmail,
          client_phone: clientPhone || null,
          testimonial_type: finalType,
          content: content || null,
          media_url: mediaUrl,
          rating: parseInt(finalRating) || null,
          allow_website_publication: allowWebsite || false,
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Erreur insertion Supabase:", error);
      return res.status(500).json({
        error: "Erreur lors de la sauvegarde du témoignage",
        details: error.message,
      });
    }

    console.log("Témoignage sauvegardé:", data[0]);

    return res.status(200).json({
      success: true,
      message: "Témoignage envoyé avec succès",
      testimonial: data[0],
    });
  } catch (error) {
    console.error("Erreur lors de la sauvegarde:", error);
    return res.status(500).json({
      error: "Erreur serveur lors de la sauvegarde",
      details: error.message,
    });
  }
});

// Route pour l'upload de fichiers média
app.post("/api/upload-media", async (req, res) => {
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
});

// Route pour servir index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(
    `🚀 Serveur de développement démarré sur http://localhost:${PORT}`
  );
  console.log(`📝 API testimonials: http://localhost:${PORT}/api/testimonials`);
  console.log(`📁 API upload-media: http://localhost:${PORT}/api/upload-media`);
});
