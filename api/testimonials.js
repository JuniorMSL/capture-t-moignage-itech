const { createClient } = require("@supabase/supabase-js");

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase env vars missing (NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY)"
    );
  }
  return createClient(url, key);
}

async function handler(req, res) {
  if (req.method === "GET") {
    return handleGet(req, res);
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const supabase = getSupabase();
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
      imageFileUrl,
      allowWebsite,
      testimonialType = "text",
    } = req.body;

    // Validation des champs obligatoires
    if (!clientName || !clientEmail) {
      return res.status(400).json({
        error: "Nom et email sont obligatoires",
      });
    }

    // Log pour debug
    console.log("Données reçues:", {
      audioFileUrl,
      videoFileUrl,
      imageFileUrl,
      testimonialType
    });

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
    
    // Log des médias détectés
    if (imageFileUrl) {
      console.log("Image détectée:", imageFileUrl);
    }
    if (mediaUrl) {
      console.log("Média principal détecté:", mediaUrl);
    }

    console.log("Media URL finale:", mediaUrl);

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
          image_url: imageFileUrl || null,
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

// GET /api/testimonials
// Query params pris en charge:
// - status: 'approved' (défaut), 'pending', 'rejected', 'all'
// - type: 'text' | 'audio' | 'video' (optionnel)
// - limit: nombre d'éléments (défaut 20, max 100)
// - offset: décalage de départ (défaut 0)
// - order: 'asc' | 'desc' sur created_at (défaut 'desc')
async function handleGet(req, res) {
  try {
    const {
      status = "approved",
      type,
      limit: rawLimit = "20",
      offset: rawOffset = "0",
      order = "desc",
    } = req.query || {};

    const limit = Math.min(Math.max(parseInt(rawLimit, 10) || 20, 1), 100);
    const offset = Math.max(parseInt(rawOffset, 10) || 0, 0);
    const end = offset + limit - 1;

    const supabase = getSupabase();
    let query = supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: order === "asc" });

    if (status !== "all") {
      query = query.eq("status", status);
    }

    if (type) {
      query = query.eq("testimonial_type", String(type));
    }

    query = query.range(offset, end);

    const { data, error } = await query;

    if (error) {
      console.error("Erreur lecture Supabase:", error);
      return res.status(500).json({
        error: "Erreur lors de la récupération des témoignages",
        details: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      items: data || [],
      meta: { limit, offset, order, status, type: type || null },
    });
  } catch (err) {
    console.error("Erreur GET testimonials:", err);
    return res.status(500).json({
      error: "Erreur serveur lors de la récupération",
      details: err.message,
    });
  }
}

module.exports = handler;

module.exports.config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};
