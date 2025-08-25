import { createClient } from "@supabase/supabase-js";

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
          status: "pending", // pending, approved, rejected
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

    // Log pour debug
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
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};
