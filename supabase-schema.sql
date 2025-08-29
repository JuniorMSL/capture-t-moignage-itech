-- Création de la table testimonials dans Supabase
-- Exécutez ce script dans l'éditeur SQL de Supabase

-- Créer la table testimonials
CREATE TABLE testimonials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    client_company VARCHAR(255),
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50),
    testimonial_type VARCHAR(20) NOT NULL CHECK (testimonial_type IN ('text', 'audio', 'video')),
    content TEXT, -- Contenu textuel du témoignage (peut être null pour audio/vidéo)
    media_url TEXT, -- URL du fichier audio/vidéo stocké dans Supabase Storage
    image_url TEXT, -- URL d'une image liée au témoignage (miniature, avatar)
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    allow_website_publication BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Créer un index sur les colonnes fréquemment utilisées
CREATE INDEX idx_testimonials_status ON testimonials(status);
CREATE INDEX idx_testimonials_type ON testimonials(testimonial_type);
CREATE INDEX idx_testimonials_created_at ON testimonials(created_at);

-- Créer une fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Créer le trigger pour updated_at
CREATE TRIGGER update_testimonials_updated_at 
    BEFORE UPDATE ON testimonials 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Configurer Row Level Security (RLS)
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Policy pour permettre l'insertion depuis l'API (avec service role)
CREATE POLICY "Allow insert for service role" ON testimonials
    FOR INSERT WITH CHECK (true);

-- Policy pour permettre la lecture des témoignages approuvés publiquement
CREATE POLICY "Allow read approved testimonials" ON testimonials
    FOR SELECT USING (status = 'approved');

-- Policy pour permettre la lecture de tous les témoignages pour les admins
CREATE POLICY "Allow read all for service role" ON testimonials
    FOR SELECT USING (true);

-- Policy pour permettre la mise à jour pour les admins
CREATE POLICY "Allow update for service role" ON testimonials
    FOR UPDATE USING (true);

-- Commentaires pour documentation
COMMENT ON TABLE testimonials IS 'Table pour stocker les témoignages clients';
COMMENT ON COLUMN testimonials.testimonial_type IS 'Type de témoignage: text, audio, ou video';
COMMENT ON COLUMN testimonials.content IS 'Contenu textuel (obligatoire pour type text)';
COMMENT ON COLUMN testimonials.media_url IS 'URL du fichier média stocké dans Supabase Storage';
COMMENT ON COLUMN testimonials.image_url IS 'URL de l\'image liée au témoignage (ex: vignette)';
COMMENT ON COLUMN testimonials.status IS 'Statut de modération: pending, approved, rejected';
COMMENT ON COLUMN testimonials.allow_website_publication IS 'Autorisation de publication sur le site web';

-- Créer le bucket de stockage pour les fichiers média
-- (À exécuter dans l'interface Storage de Supabase ou via l'API)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('media-files', 'media-files', true);

-- Policies pour le storage bucket media-files
-- (À configurer dans l'interface Storage de Supabase)
-- Politique d'upload: Autoriser l'upload pour tous les utilisateurs authentifiés
-- Politique de lecture: Autoriser la lecture publique
