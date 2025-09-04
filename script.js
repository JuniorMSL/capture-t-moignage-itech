document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Gestion du bouton vidéo pour autoplay
  const playVideoBtn = document.getElementById("play-video-btn");
  const youtubeVideo = document.getElementById("youtube-video");

  if (playVideoBtn && youtubeVideo) {
    playVideoBtn.addEventListener("click", function () {
      // Déclencher l'autoplay en changeant l'URL de l'iframe
      const currentSrc = youtubeVideo.src;
      const autoplaySrc = currentSrc.includes("?")
        ? currentSrc + "&autoplay=1"
        : currentSrc + "?autoplay=1";

      youtubeVideo.src = autoplaySrc;
    });
  }

  const form = document.getElementById("contact");

  // Menu mobile
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Fermer le menu au clic sur un lien (mobile)
  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.addEventListener("click", () => {
      if (navLinks?.classList.contains("open")) {
        navLinks.classList.remove("open");
        menuToggle?.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Wizard Premium en 5 étapes
  if (form) {
    // Configuration des étapes (9 étapes au total)
    const stepConfig = [
      {
        title: "Qui êtes-vous ?",
        subtitle: "Commençons par apprendre à vous connaître",
        icon: "👤",
      },
      {
        title: "Secteur d'activité",
        subtitle: "Dans quel secteur votre entreprise évolue-t-elle ?",
        icon: "🏢",
      },
      {
        title: "Chiffre d'affaires",
        subtitle: "Quel est votre chiffre d'affaires annuel ?",
        icon: "📊",
      },
      {
        title: "Taille de l'équipe",
        subtitle: "Combien d'employés compte votre entreprise ?",
        icon: "👥",
      },
      {
        title: "Vos objectifs",
        subtitle: "Que souhaitez-vous améliorer avec Odoo ?",
        icon: "🎯",
      },
      {
        title: "Votre budget",
        subtitle: "Quel est votre budget approximatif pour cette solution ?",
        icon: "💰",
      },
      {
        title: "Délai de démarrage",
        subtitle: "Quand souhaitez-vous commencer ?",
        icon: "⏰",
      },
      {
        title: "Système existant",
        subtitle: "Avez-vous déjà un système de gestion ?",
        icon: "🖥️",
      },
      {
        title: "Comment vous contacter ?",
        subtitle: "Comment préférez-vous être contacté(e) ?",
        icon: "📞",
      },
    ];

    const steps = [];

    // Étape 1: Informations personnelles
    const step1 = document.createElement("div");
    step1.className = "form-step active";
    step1.innerHTML = `
      <div class="form-row" style="margin-bottom: 20px;">
        <div class="form-field">
          <label for="fullName">Nom complet <span style="color:#ffdd57;">*</span></label>
          <input id="fullName" name="fullName" type="text" placeholder="Ex: Marie Dupont" required />
        </div>
        <div class="form-field">
          <label for="email">Adresse e‑mail <span style="color:#ffdd57;">*</span></label>
          <input id="email" name="email" type="email" placeholder="vous@entreprise.com" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-field">
          <label for="phone">Téléphone <span style="color:#ffdd57;">*</span></label>
          <input id="phone" name="phone" type="tel" inputmode="tel" placeholder="06 12 34 56 78" required />
        </div>
        <div class="form-field">
          <label for="company">Nom de l'entreprise <span style="color:#ffdd57;">*</span></label>
          <input id="company" name="company" type="text" placeholder="Ex: MSL‑iTECH" required />
        </div>
      </div>
    `;

    // Étape 2: Secteur d'activité (cartes)
    const step2 = document.createElement("div");
    step2.className = "form-step";
    step2.innerHTML = `
      <div style="margin-bottom: 20px;">
        <div class="industry-options" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="option-premium" data-value="commerce">
            <div class="option-icon">🛒</div>
            <div class="option-title">Commerce / Retail</div>
            <div class="option-desc">Vente, magasins, e-commerce</div>
            <input type="radio" name="industry" value="commerce" required />
          </div>
          <div class="option-premium" data-value="services">
            <div class="option-icon">💼</div>
            <div class="option-title">Services</div>
            <div class="option-desc">Conseil, agences, prestations</div>
            <input type="radio" name="industry" value="services" required />
          </div>
          <div class="option-premium" data-value="industrie">
            <div class="option-icon">🏭</div>
            <div class="option-title">Industrie</div>
            <div class="option-desc">Production, manufacturing</div>
            <input type="radio" name="industry" value="industrie" required />
          </div>
          <div class="option-premium" data-value="restauration">
            <div class="option-icon">🍽️</div>
            <div class="option-title">Restauration</div>
            <div class="option-desc">Restaurant, hôtellerie, café</div>
            <input type="radio" name="industry" value="restauration" required />
          </div>
          <div class="option-premium" data-value="sante">
            <div class="option-icon">🏥</div>
            <div class="option-title">Santé</div>
            <div class="option-desc">Médical, cliniques, pharmacies</div>
            <input type="radio" name="industry" value="sante" required />
          </div>
          <div class="option-premium" data-value="education">
            <div class="option-icon">🎓</div>
            <div class="option-title">Éducation</div>
            <div class="option-desc">Écoles, formation, cours</div>
            <input type="radio" name="industry" value="education" required />
          </div>
          <div class="option-premium" data-value="transport">
            <div class="option-icon">🚚</div>
            <div class="option-title">Transport & Logistique</div>
            <div class="option-desc">Livraison, stockage, fret</div>
            <input type="radio" name="industry" value="transport" required />
          </div>
          <div class="option-premium" data-value="btp">
            <div class="option-icon">🏗️</div>
            <div class="option-title">BTP & Construction</div>
            <div class="option-desc">Bâtiment, travaux publics</div>
            <input type="radio" name="industry" value="btp" required />
          </div>
          <div class="option-premium" data-value="autre">
            <div class="option-icon">📋</div>
            <div class="option-title">Autre secteur</div>
            <div class="option-desc">Mon secteur n'est pas listé</div>
            <input type="radio" name="industry" value="autre" required />
          </div>
        </div>
      </div>
    `;

    // Étape 3: Chiffre d'affaires (cartes)
    const step3 = document.createElement("div");
    step3.className = "form-step";
    step3.innerHTML = `
      <div style="margin-bottom: 20px;">
        <div class="revenue-options" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="option-premium" data-value="startup">
            <div class="option-icon">🌱</div>
            <div class="option-title">Startup / Projet</div>
            <div class="option-desc">< 100 000 MAD</div>
            <input type="radio" name="revenue" value="startup" required />
          </div>
          <div class="option-premium" data-value="lt_500k">
            <div class="option-icon">📈</div>
            <div class="option-title">Petite entreprise</div>
            <div class="option-desc">100K - 500K MAD</div>
            <input type="radio" name="revenue" value="lt_500k" required />
          </div>
          <div class="option-premium" data-value="500k_2m">
            <div class="option-icon">🏪</div>
            <div class="option-title">Entreprise en croissance</div>
            <div class="option-desc">500K - 2M MAD</div>
            <input type="radio" name="revenue" value="500k_2m" required />
          </div>
          <div class="option-premium" data-value="2m_10m">
            <div class="option-icon">🏢</div>
            <div class="option-title">Moyenne entreprise</div>
            <div class="option-desc">2M - 10M MAD</div>
            <input type="radio" name="revenue" value="2m_10m" required />
          </div>
          <div class="option-premium" data-value="10m_50m">
            <div class="option-icon">🏭</div>
            <div class="option-title">Grande entreprise</div>
            <div class="option-desc">10M - 50M MAD</div>
            <input type="radio" name="revenue" value="10m_50m" required />
          </div>
          <div class="option-premium" data-value="gt_50m">
            <div class="option-icon">🌟</div>
            <div class="option-title">Groupe / Corporation</div>
            <div class="option-desc">> 50M MAD</div>
            <input type="radio" name="revenue" value="gt_50m" required />
          </div>
        </div>
      </div>
    `;

    // Étape 4: Nombre d'employés (cartes)
    const step4 = document.createElement("div");
    step4.className = "form-step";
    step4.innerHTML = `
      <div style="margin-bottom: 20px;">
        <p style="font-size: 16px; color: var(--color-text-muted); margin-bottom: 20px; text-align: center;">Combien d'employés compte votre entreprise ?</p>
        <div class="employees-options" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="option-premium" data-value="solo">
            <div class="option-icon">👤</div>
            <div class="option-title">Entrepreneur solo</div>
            <div class="option-desc">Juste moi</div>
            <input type="radio" name="employees" value="solo" />
          </div>
          <div class="option-premium" data-value="2-5">
            <div class="option-icon">👥</div>
            <div class="option-title">Très petite équipe</div>
            <div class="option-desc">2-5 employés</div>
            <input type="radio" name="employees" value="2-5" />
          </div>
          <div class="option-premium" data-value="6-20">
            <div class="option-icon">👨‍👩‍👧‍👦</div>
            <div class="option-title">Petite équipe</div>
            <div class="option-desc">6-20 employés</div>
            <input type="radio" name="employees" value="6-20" />
          </div>
          <div class="option-premium" data-value="21-50">
            <div class="option-icon">👫</div>
            <div class="option-title">Équipe moyenne</div>
            <div class="option-desc">21-50 employés</div>
            <input type="radio" name="employees" value="21-50" />
          </div>
          <div class="option-premium" data-value="51-100">
            <div class="option-icon">🏢</div>
            <div class="option-title">Grande équipe</div>
            <div class="option-desc">51-100 employés</div>
            <input type="radio" name="employees" value="51-100" />
          </div>
          <div class="option-premium" data-value="100+">
            <div class="option-icon">🏭</div>
            <div class="option-title">Très grande entreprise</div>
            <div class="option-desc">Plus de 100 employés</div>
            <input type="radio" name="employees" value="100+" />
          </div>
        </div>
      </div>
    `;

    // Étape 5: Objectifs (options premium en 2 colonnes)
    const step5 = document.createElement("div");
    step5.className = "form-step";
    step5.innerHTML = `
      <div style="margin-bottom: 20px;">
        <p style="font-size: 16px; color: var(--color-text-muted); margin-bottom: 20px; text-align: center;">Sélectionnez toutes les améliorations qui vous intéressent :</p>
        <div class="improvements-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="option-premium" data-value="time_tracking">
            <div class="option-icon">⏱️</div>
            <div class="option-title">Suivi du temps</div>
            <div class="option-desc">Suivez le temps passé sur vos projets</div>
            <input type="checkbox" name="improvements" value="time_tracking" />
          </div>
          <div class="option-premium" data-value="invoicing">
            <div class="option-icon">🧾</div>
            <div class="option-title">Facturation</div>
            <div class="option-desc">Automatisez vos factures et devis</div>
            <input type="checkbox" name="improvements" value="invoicing" />
          </div>
          <div class="option-premium" data-value="tasks_projects">
            <div class="option-icon">📋</div>
            <div class="option-title">Gestion de projets</div>
            <div class="option-desc">Organisez vos tâches et projets</div>
            <input type="checkbox" name="improvements" value="tasks_projects" />
          </div>
          <div class="option-premium" data-value="inventory">
            <div class="option-icon">📦</div>
            <div class="option-title">Gestion de stock</div>
            <div class="option-desc">Suivez votre inventaire en temps réel</div>
            <input type="checkbox" name="improvements" value="inventory" />
          </div>
          <div class="option-premium" data-value="crm">
            <div class="option-icon">👥</div>
            <div class="option-title">Relation client (CRM)</div>
            <div class="option-desc">Gérez vos prospects et clients</div>
            <input type="checkbox" name="improvements" value="crm" />
          </div>
          <div class="option-premium" data-value="accounting">
            <div class="option-icon">💼</div>
            <div class="option-title">Comptabilité</div>
            <div class="option-desc">Simplifiez votre comptabilité</div>
            <input type="checkbox" name="improvements" value="accounting" />
          </div>
        </div>
      </div>
    `;

    // Étape 6: Budget (options en 2 colonnes)
    const step6 = document.createElement("div");
    step6.className = "form-step";
    step6.innerHTML = `
      <div style="margin-bottom: 20px;">
        <p style="font-size: 16px; color: var(--color-text-muted); margin-bottom: 20px; text-align: center;">Choisissez l'option qui correspond le mieux à votre situation :</p>
        <div class="budget-options" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="option-premium" data-value="lt_5000">
            <div class="option-icon">💡</div>
            <div class="option-title">< 5 000 MAD</div>
            <div class="option-desc">Solution starter pour débuter</div>
            <input type="radio" name="budget" value="lt_5000" />
          </div>
          <div class="option-premium" data-value="5000_15000">
            <div class="option-icon">⚡</div>
            <div class="option-title">5 000 - 15 000 MAD</div>
            <div class="option-desc">Solution business recommandée</div>
            <input type="radio" name="budget" value="5000_15000" />
          </div>
          <div class="option-premium" data-value="gt_15000">
            <div class="option-icon">🚀</div>
            <div class="option-title">> 15 000 MAD</div>
            <div class="option-desc">Solution enterprise complète</div>
            <input type="radio" name="budget" value="gt_15000" />
          </div>
          <div class="option-premium" data-value="custom">
            <div class="option-icon">💬</div>
            <div class="option-title">Sur mesure</div>
            <div class="option-desc">Discutons de vos besoins spécifiques</div>
            <input type="radio" name="budget" value="custom" />
          </div>
        </div>
      </div>
    `;

    // Étape 7: Délai de démarrage (cartes)
    const step7 = document.createElement("div");
    step7.className = "form-step";
    step7.innerHTML = `
      <div style="margin-bottom: 20px;">
        <p style="font-size: 16px; color: var(--color-text-muted); margin-bottom: 20px; text-align: center;">Quand souhaitez-vous commencer votre projet ?</p>
        <div class="timeline-options" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="option-premium" data-value="asap">
            <div class="option-icon">🚀</div>
            <div class="option-title">Urgence</div>
            <div class="option-desc">Dès que possible</div>
            <input type="radio" name="timeline" value="asap" />
          </div>
          <div class="option-premium" data-value="1month">
            <div class="option-icon">⚡</div>
            <div class="option-title">Très prochainement</div>
            <div class="option-desc">Dans le mois</div>
            <input type="radio" name="timeline" value="1month" />
          </div>
          <div class="option-premium" data-value="3months">
            <div class="option-icon">📅</div>
            <div class="option-title">Court terme</div>
            <div class="option-desc">Dans les 3 mois</div>
            <input type="radio" name="timeline" value="3months" />
          </div>
          <div class="option-premium" data-value="6months">
            <div class="option-icon">🗓️</div>
            <div class="option-title">Moyen terme</div>
            <div class="option-desc">Dans les 6 mois</div>
            <input type="radio" name="timeline" value="6months" />
          </div>
          <div class="option-premium" data-value="later">
            <div class="option-icon">🎯</div>
            <div class="option-title">Long terme</div>
            <div class="option-desc">Plus tard dans l'année</div>
            <input type="radio" name="timeline" value="later" />
          </div>
          <div class="option-premium" data-value="exploring">
            <div class="option-icon">🔍</div>
            <div class="option-title">Exploration</div>
            <div class="option-desc">Je me renseigne pour l'instant</div>
            <input type="radio" name="timeline" value="exploring" />
          </div>
        </div>
      </div>
    `;

    // Étape 8: Système existant (cartes)
    const step8 = document.createElement("div");
    step8.className = "form-step";
    step8.innerHTML = `
      <div style="margin-bottom: 20px;">
        <p style="font-size: 16px; color: var(--color-text-muted); margin-bottom: 20px; text-align: center;">Quelle est votre situation actuelle ?</p>
        <div class="system-options" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="option-premium" data-value="non">
            <div class="option-icon">🆕</div>
            <div class="option-title">Nouveau départ</div>
            <div class="option-desc">C'est mon premier système</div>
            <input type="radio" name="hasSystem" value="non" />
          </div>
          <div class="option-premium" data-value="excel">
            <div class="option-icon">📊</div>
            <div class="option-title">Excel / Tableurs</div>
            <div class="option-desc">J'utilise des feuilles de calcul</div>
            <input type="radio" name="hasSystem" value="excel" />
          </div>
          <div class="option-premium" data-value="logiciel_simple">
            <div class="option-icon">💻</div>
            <div class="option-title">Logiciel simple</div>
            <div class="option-desc">J'ai un logiciel basique</div>
            <input type="radio" name="hasSystem" value="logiciel_simple" />
          </div>
          <div class="option-premium" data-value="erp_autre">
            <div class="option-icon">🔄</div>
            <div class="option-title">Autre ERP</div>
            <div class="option-desc">J'ai déjà un ERP différent</div>
            <input type="radio" name="hasSystem" value="erp_autre" />
          </div>
          <div class="option-premium" data-value="plusieurs">
            <div class="option-icon">🔗</div>
            <div class="option-title">Plusieurs outils</div>
            <div class="option-desc">J'utilise différents logiciels</div>
            <input type="radio" name="hasSystem" value="plusieurs" />
          </div>
          <div class="option-premium" data-value="papier">
            <div class="option-icon">📋</div>
            <div class="option-title">Gestion papier</div>
            <div class="option-desc">Tout est encore sur papier</div>
            <input type="radio" name="hasSystem" value="papier" />
          </div>
        </div>
      </div>
    `;

    // Étape 9: Contact
    const step9 = document.createElement("div");
    step9.className = "form-step";
    step9.innerHTML = `
      <div style="margin-bottom: 20px;">
        <p style="font-size: 16px; color: var(--color-text-muted); margin-bottom: 20px; text-align: center;">Sélectionnez vos préférences de contact :</p>
        <div class="contact-options" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div class="option-premium" data-value="telephone">
            <div class="option-icon">📞</div>
            <div class="option-title">Téléphone</div>
            <div class="option-desc">Appel direct pour discuter</div>
            <input type="checkbox" name="contactPref" value="telephone" />
          </div>
          <div class="option-premium" data-value="whatsapp">
            <div class="option-icon">💬</div>
            <div class="option-title">WhatsApp</div>
            <div class="option-desc">Messages via WhatsApp</div>
            <input type="checkbox" name="contactPref" value="whatsapp" />
          </div>
          <div class="option-premium" data-value="email">
            <div class="option-icon">📧</div>
            <div class="option-title">E‑mail</div>
            <div class="option-desc">Communication par e‑mail</div>
            <input type="checkbox" name="contactPref" value="email" />
          </div>
          <div class="option-premium" data-value="visio">
            <div class="option-icon">🖥️</div>
            <div class="option-title">Visioconférence</div>
            <div class="option-desc">Rendez-vous en ligne</div>
            <input type="checkbox" name="contactPref" value="visio" />
          </div>
        </div>
      </div>
    `;

    steps.push(step1, step2, step3, step4, step5, step6, step7, step8, step9);

    // Construire le container wizard
    const container = document.createElement("div");
    container.className = "wizard-container";

    // Progress bar
    const progress = document.createElement("div");
    progress.className = "wizard-progress";
    progress.innerHTML =
      '<div class="wizard-progress-bar" style="width: 11%;"></div>';

    // Header
    const header = document.createElement("div");
    header.className = "wizard-header";
    header.innerHTML = `
      <div class="wizard-step-counter">Étape 1 sur 9</div>
      <h3 class="wizard-step-title">${stepConfig[0].icon} ${stepConfig[0].title}</h3>
      <p class="wizard-step-subtitle">${stepConfig[0].subtitle}</p>
    `;

    // Steps container
    const stepsContainer = document.createElement("div");
    stepsContainer.className = "wizard-steps";
    steps.forEach((step) => stepsContainer.appendChild(step));

    // Navigation
    const nav = document.createElement("div");
    nav.className = "wizard-nav";
    nav.innerHTML = `
      <button type="button" class="btn btn-lg btn-prev" disabled>← Précédent</button>
      <button type="button" class="btn btn-lg btn-next">Suivant →</button>
    `;

    // Submit button
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.className = "wizard-submit";
    submitBtn.textContent = "🚀 Demander ma démonstration personnalisée";
    submitBtn.style.display = "none";

    // Remplacer le contenu du formulaire
    form.innerHTML = "";
    container.appendChild(progress);
    container.appendChild(header);
    container.appendChild(stepsContainer);
    container.appendChild(nav);
    container.appendChild(submitBtn);
    form.appendChild(container);

    // Ajouter le feedback après le formulaire
    const feedbackEl = document.createElement("p");
    feedbackEl.className = "form-feedback";
    feedbackEl.setAttribute("role", "status");
    feedbackEl.setAttribute("aria-live", "polite");
    form.appendChild(feedbackEl);

    const prevBtn = nav.querySelector(".btn-prev");
    const nextBtn = nav.querySelector(".btn-next");
    const progressBar = progress.querySelector(".wizard-progress-bar");
    const stepCounter = header.querySelector(".wizard-step-counter");
    const stepTitle = header.querySelector(".wizard-step-title");
    const stepSubtitle = header.querySelector(".wizard-step-subtitle");

    let currentStep = 0;

    // Gestion devise et budget dynamiques
    let userCurrency = "MAD"; // Valeur par défaut
    const EU_COUNTRIES = new Set([
      "FR",
      "DE",
      "ES",
      "IT",
      "PT",
      "NL",
      "BE",
      "LU",
      "IE",
      "AT",
      "FI",
      "SE",
      "DK",
      "CZ",
      "SK",
      "SI",
      "HR",
      "HU",
      "RO",
      "BG",
      "PL",
      "LT",
      "LV",
      "EE",
      "GR",
      "CY",
      "MT",
    ]);
    const MAD_PER_EUR = 10.8; // Taux approximatif

    function formatNumberFR(value) {
      return new Intl.NumberFormat("fr-FR", {
        maximumFractionDigits: 0,
      }).format(value);
    }

    function convertMadToEur(mad) {
      return Math.max(1, Math.round(mad / MAD_PER_EUR));
    }

    function updateBudgetLabels(currency) {
      try {
        const titleLt = step6.querySelector(
          '.option-premium[data-value="lt_5000"] .option-title'
        );
        const titleMid = step6.querySelector(
          '.option-premium[data-value="5000_15000"] .option-title'
        );
        const titleGt = step6.querySelector(
          '.option-premium[data-value="gt_15000"] .option-title'
        );
        if (!titleLt || !titleMid || !titleGt) return;

        if (currency === "EUR") {
          const v1 = convertMadToEur(5000);
          const v2a = convertMadToEur(5000);
          const v2b = convertMadToEur(15000);
          const v3 = convertMadToEur(15000);
          titleLt.textContent = `< ${formatNumberFR(v1)} €`;
          titleMid.textContent = `${formatNumberFR(v2a)} - ${formatNumberFR(
            v2b
          )} €`;
          titleGt.textContent = `> ${formatNumberFR(v3)} €`;
        } else {
          // MAD
          titleLt.textContent = `< ${formatNumberFR(5000)} MAD`;
          titleMid.textContent = `${formatNumberFR(5000)} - ${formatNumberFR(
            15000
          )} MAD`;
          titleGt.textContent = `> ${formatNumberFR(15000)} MAD`;
        }
      } catch (e) {
        console.warn("Impossible de mettre à jour les labels budget:", e);
      }
    }

    function updateRevenueLabels(currency) {
      try {
        const map = {
          startup: step3.querySelector(
            '.option-premium[data-value="startup"] .option-desc'
          ),
          lt_500k: step3.querySelector(
            '.option-premium[data-value="lt_500k"] .option-desc'
          ),
          "500k_2m": step3.querySelector(
            '.option-premium[data-value="500k_2m"] .option-desc'
          ),
          "2m_10m": step3.querySelector(
            '.option-premium[data-value="2m_10m"] .option-desc'
          ),
          "10m_50m": step3.querySelector(
            '.option-premium[data-value="10m_50m"] .option-desc'
          ),
          gt_50m: step3.querySelector(
            '.option-premium[data-value="gt_50m"] .option-desc'
          ),
        };
        if (currency === "EUR") {
          map.startup.textContent = `< ${formatNumberFR(
            convertMadToEur(100000)
          )} €`;
          map.lt_500k.textContent = `${formatNumberFR(
            convertMadToEur(100000)
          )} - ${formatNumberFR(convertMadToEur(500000))} €`;
          map["500k_2m"].textContent = `${formatNumberFR(
            convertMadToEur(500000)
          )} - ${formatNumberFR(convertMadToEur(2000000))} €`;
          map["2m_10m"].textContent = `${formatNumberFR(
            convertMadToEur(2000000)
          )} - ${formatNumberFR(convertMadToEur(10000000))} €`;
          map["10m_50m"].textContent = `${formatNumberFR(
            convertMadToEur(10000000)
          )} - ${formatNumberFR(convertMadToEur(50000000))} €`;
          map.gt_50m.textContent = `> ${formatNumberFR(
            convertMadToEur(50000000)
          )} €`;
        } else {
          map.startup.textContent = `< 100 000 MAD`;
          map.lt_500k.textContent = `100K - 500K MAD`;
          map["500k_2m"].textContent = `500K - 2M MAD`;
          map["2m_10m"].textContent = `2M - 10M MAD`;
          map["10m_50m"].textContent = `10M - 50M MAD`;
          map.gt_50m.textContent = `> 50M MAD`;
        }
      } catch (e) {
        console.warn("Impossible de mettre à jour les labels de CA:", e);
      }
    }

    function getRevenueLabel(value) {
      if (userCurrency === "EUR") {
        const map = {
          startup: `< ${formatNumberFR(convertMadToEur(100000))} €`,
          lt_500k: `${formatNumberFR(
            convertMadToEur(100000)
          )} - ${formatNumberFR(convertMadToEur(500000))} €`,
          "500k_2m": `${formatNumberFR(
            convertMadToEur(500000)
          )} - ${formatNumberFR(convertMadToEur(2000000))} €`,
          "2m_10m": `${formatNumberFR(
            convertMadToEur(2000000)
          )} - ${formatNumberFR(convertMadToEur(10000000))} €`,
          "10m_50m": `${formatNumberFR(
            convertMadToEur(10000000)
          )} - ${formatNumberFR(convertMadToEur(50000000))} €`,
          gt_50m: `> ${formatNumberFR(convertMadToEur(50000000))} €`,
        };
        return map[value] || value;
      }
      const map = {
        startup: `< 100 000 MAD`,
        lt_500k: `100K - 500K MAD`,
        "500k_2m": `500K - 2M MAD`,
        "2m_10m": `2M - 10M MAD`,
        "10m_50m": `10M - 50M MAD`,
        gt_50m: `> 50M MAD`,
      };
      return map[value] || value;
    }

    async function detectCurrencyAndApply() {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 2000);
        const res = await fetch("https://ipapi.co/country/", {
          signal: controller.signal,
        });
        clearTimeout(timeout);
        if (res.ok) {
          const countryCode = (await res.text()).trim();
          if (countryCode === "MA") {
            userCurrency = "MAD";
          } else if (EU_COUNTRIES.has(countryCode)) {
            userCurrency = "EUR";
          } else {
            userCurrency = "MAD";
          }
          updateBudgetLabels(userCurrency);
          updateRevenueLabels(userCurrency);
        } else {
          updateBudgetLabels(userCurrency);
          updateRevenueLabels(userCurrency);
        }
      } catch (err) {
        updateBudgetLabels(userCurrency);
        updateRevenueLabels(userCurrency);
      }
    }

    // Configuration de l'API Odoo
    const ODOO_CONFIG = {
      apiUrl: "https://api-connect-odoo.vercel.app/api",
      headers: {
        "Content-Type": "application/json",
        "x-signature":
          "5174f6fd0d8fe45fcaf24205701d7823864bc6aa5be8fa1d81cefe718dab784d",
        "x-client-id": "client_mslitech",
      },
    };

    // Fonction pour créer un lead dans Odoo
    async function createOdooLead(leadData) {
      try {
        const response = await fetch(`${ODOO_CONFIG.apiUrl}/leads`, {
          method: "POST",
          headers: ODOO_CONFIG.headers,
          body: JSON.stringify(leadData),
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error("Erreur lors de la création du lead:", error);
        throw error;
      }
    }

    // Fonctions utilitaires pour formater les données
    function getSecteurLabel(value) {
      const secteurs = {
        commerce: "Commerce / Retail",
        services: "Services",
        industrie: "Industrie",
        restauration: "Restauration",
        autre: "Autre secteur",
      };
      return secteurs[value] || value;
    }

    function getBudgetLabel(value) {
      if (userCurrency === "EUR") {
        const v1 = convertMadToEur(5000);
        const v2a = convertMadToEur(5000);
        const v2b = convertMadToEur(15000);
        const v3 = convertMadToEur(15000);
        const budgets = {
          lt_5000: `< ${formatNumberFR(v1)} €`,
          "5000_15000": `${formatNumberFR(v2a)} - ${formatNumberFR(v2b)} €`,
          gt_15000: `> ${formatNumberFR(v3)} €`,
          custom: "Sur mesure",
        };
        return budgets[value] || value;
      } else {
        const budgets = {
          lt_5000: "< 5 000 MAD",
          "5000_15000": "5 000 - 15 000 MAD",
          gt_15000: "> 15 000 MAD",
          custom: "Sur mesure",
        };
        return budgets[value] || value;
      }
    }

    function getTimelineLabel(value) {
      const timelines = {
        asap: "Dès que possible",
        "1month": "Dans le mois",
        "3months": "Dans les 3 mois",
        "6months": "Dans les 6 mois",
        later: "Plus tard dans l'année",
        exploring: "Je me renseigne pour l'instant",
      };
      return timelines[value] || value;
    }

    function getSystemLabel(value) {
      const systems = {
        non: "C'est mon premier système",
        excel: "Excel / Tableurs",
        logiciel_simple: "Logiciel simple",
        erp_autre: "Autre ERP",
        plusieurs: "Plusieurs outils",
        papier: "Gestion papier",
      };
      return systems[value] || value;
    }

    function getImprovementLabels(values) {
      const improvements = {
        invoicing: "Facturation automatisée",
        tasks_projects: "Gestion de projets",
        inventory: "Gestion de stock",
        crm: "Relation client (CRM)",
        accounting: "Comptabilité",
      };
      return values.map((v) => improvements[v] || v);
    }

    function getContactPrefLabels(values) {
      const prefs = {
        telephone: "Téléphone",
        whatsapp: "WhatsApp",
        email: "E-mail",
        visio: "Visioconférence",
      };
      return values.map((v) => prefs[v] || v);
    }

    // Gestion des options premium
    function setupPremiumOptions() {
      // Nettoyer les anciens listeners
      const existingOptions = document.querySelectorAll(".option-premium");
      existingOptions.forEach((option) => {
        option.replaceWith(option.cloneNode(true));
      });

      // Ajouter les nouveaux event listeners
      document.querySelectorAll(".option-premium").forEach((option) => {
        option.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();

          const input = this.querySelector("input");
          if (!input) return;

          console.log("Option cliquée:", input.name, input.value);

          if (input.type === "checkbox") {
            input.checked = !input.checked;
            this.classList.toggle("selected", input.checked);
          } else if (input.type === "radio") {
            // Déselectionner toutes les autres options du même groupe
            const group = input.name;
            document
              .querySelectorAll(`input[name="${group}"]`)
              .forEach((otherInput) => {
                const otherOption = otherInput.closest(".option-premium");
                if (otherOption) {
                  otherOption.classList.remove("selected");
                  otherInput.checked = false;
                }
              });
            input.checked = true;
            this.classList.add("selected");
            if (input.name === "industry") {
              toggleIndustryOther();
            }
          }
        });
      });
    }

    function getSelectedRadioValue(name) {
      const el = form.querySelector(`input[name="${name}"]:checked`);
      return el ? el.value : "";
    }

    function toggleIndustryOther() {
      const industryStep = steps[1];
      if (!industryStep) return;
      const group = industryStep.querySelector(".industry-options");
      if (!group) return;
      let otherBox = industryStep.querySelector(".industry-other");
      if (!otherBox) {
        otherBox = document.createElement("div");
        otherBox.className = "industry-other";
        otherBox.style.marginTop = "12px";
        otherBox.innerHTML = `
          <div class="form-field">
            <label for="industryOther">Précisez votre secteur</label>
            <input id="industryOther" name="industryOther" type="text" placeholder="Ex: Immobilier, Événementiel, ..." />
          </div>
        `;
        group.parentNode.appendChild(otherBox);
      }
      const val = getSelectedRadioValue("industry");
      const input = otherBox.querySelector("#industryOther");
      if (val === "autre") {
        otherBox.style.display = "block";
        input.required = true;
      } else {
        otherBox.style.display = "none";
        input.required = false;
        input.value = "";
      }
    }

    function updateUI() {
      // Masquer toutes les étapes
      steps.forEach((step, index) => {
        step.classList.remove("active");
      });

      // Afficher l'étape courante après un court délai
      setTimeout(() => {
        steps[currentStep].classList.add("active");
      }, 100);

      // Mise à jour du header
      const config = stepConfig[currentStep];
      stepCounter.textContent = `Étape ${currentStep + 1} sur 9`;
      stepTitle.innerHTML = `${config.icon} ${config.title}`;
      stepSubtitle.textContent = config.subtitle;

      // Progress bar
      const progressPercent = ((currentStep + 1) / 9) * 100;
      progressBar.style.width = `${progressPercent}%`;

      // Boutons
      prevBtn.disabled = currentStep === 0;
      nextBtn.style.display = currentStep === 8 ? "none" : "inline-flex";
      submitBtn.style.display = currentStep === 8 ? "inline-flex" : "none";

      // Setup options pour les nouvelles étapes
      setTimeout(() => {
        setupPremiumOptions();
        toggleIndustryOther();
        form.querySelectorAll('input[name="industry"]').forEach((r) => {
          r.addEventListener("change", toggleIndustryOther, { once: true });
        });
      }, 200);
    }

    function validateCurrentStep() {
      const activeStep = steps[currentStep];
      const inputs = Array.from(
        activeStep.querySelectorAll("input[required], select[required]")
      );

      for (const input of inputs) {
        if (!input.checkValidity()) {
          input.focus();
          input.reportValidity();
          return false;
        }
      }

      // Validation spéciale pour l'étape 5 (au moins une amélioration)
      if (currentStep === 4) {
        const improvements = activeStep.querySelectorAll(
          'input[name="improvements"]:checked'
        );
        if (improvements.length === 0) {
          alert(
            "Veuillez sélectionner au moins une amélioration que vous souhaitez apporter."
          );
          return false;
        }
      }

      return true;
    }

    // Événements navigation
    prevBtn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        updateUI();
      }
    });

    nextBtn.addEventListener("click", () => {
      if (!validateCurrentStep()) return;

      if (currentStep < 8) {
        currentStep++;
        updateUI();
      }
    });

    // Soumission
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (!validateCurrentStep()) return;

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      data.improvements = formData.getAll("improvements");
      data.contactPref = formData.getAll("contactPref");

      submitBtn.disabled = true;
      submitBtn.textContent = "⏳ Envoi en cours...";
      feedbackEl.textContent = "";

      try {
        // Assemblage de la description complète comme dans Angular
        const descriptionParts = [
          `<h3>Informations du contact - MSL-iTECH</h3>`,
          `<p><strong>Entreprise:</strong> ${
            data.company || "Non renseignée"
          }</p>`,
          `<p><strong>Secteur d'activité:</strong> ${getSecteurLabel(
            data.industry
          )}</p>`,
          data.industryOther
            ? `<p><strong>Précision secteur:</strong> ${data.industryOther}</p>`
            : "",
          data.revenue
            ? `<p><strong>Chiffre d'affaires:</strong> ${getRevenueLabel(
                data.revenue
              )}</p>`
            : "",
          data.employees
            ? `<p><strong>Nombre d'employés:</strong> ${data.employees}</p>`
            : "",
          `<p><strong>Améliorations souhaitées:</strong></p>`,
          `<ul>${getImprovementLabels(data.improvements)
            .map((s) => `<li>${s}</li>`)
            .join("")}</ul>`,
          data.budget
            ? `<p><strong>Budget approximatif:</strong> ${getBudgetLabel(
                data.budget
              )}</p>`
            : "",
          data.timeline
            ? `<p><strong>Délai souhaité:</strong> ${getTimelineLabel(
                data.timeline
              )}</p>`
            : "",
          data.hasSystem
            ? `<p><strong>Système actuel:</strong> ${getSystemLabel(
                data.hasSystem
              )}</p>`
            : "",
          data.contactPref && data.contactPref.length > 0
            ? `<p><strong>Préférences de contact:</strong> ${getContactPrefLabels(
                data.contactPref
              ).join(", ")}</p>`
            : "",
        ];

        const fullDescription = descriptionParts.filter((p) => p).join("\n");

        // Préparation des données pour Odoo
        const leadData = {
          name: data.fullName,
          phone: data.phone,
          email_from: data.email,
          description: fullDescription,
          company_name: data.company || "",
          // Ajout de champs personnalisés si nécessaire
          x_studio_secteur: data.industry,
          x_studio_budget: data.budget,
          x_studio_timeline: data.timeline,
        };

        // Envoi vers Odoo
        const response = await createOdooLead(leadData);
        console.log("Lead créé avec succès:", response);

        feedbackEl.innerHTML =
          "✅ <strong>Parfait !</strong> Votre demande a été envoyée avec succès vers Odoo. Un expert MSL-iTECH vous contactera sous 24h.";
        feedbackEl.style.color = "#27ae60";
        feedbackEl.style.background = "rgba(39, 174, 96, 0.1)";
        feedbackEl.style.padding = "16px";
        feedbackEl.style.borderRadius = "12px";

        // Reset après succès
        setTimeout(() => {
          form.reset();
          currentStep = 0;
          updateUI();
          document
            .querySelectorAll(".option-premium")
            .forEach((opt) => opt.classList.remove("selected"));
        }, 3000);
      } catch (error) {
        console.error("Erreur lors de l'envoi vers Odoo:", error);
        feedbackEl.innerHTML =
          "❌ <strong>Erreur d'envoi.</strong> Veuillez vérifier votre connexion et réessayer, ou contactez-nous directement à team@msl-itech.com";
        feedbackEl.style.color = "#ffdd57";
        feedbackEl.style.background = "rgba(231, 76, 60, 0.1)";
        feedbackEl.style.padding = "16px";
        feedbackEl.style.borderRadius = "12px";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "🚀 Demander ma démonstration personnalisée";
      }
    });

    // Initialisation
    updateUI();
    setupPremiumOptions();
    detectCurrencyAndApply(); // Appel pour détecter la devise au chargement
  }
});
