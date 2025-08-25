// Configuration et variables globales
let mediaRecorder = null;
let recordedChunks = [];
let isRecording = false;
let recordingTimer = null;
let recordingStartTime = null;
let currentStream = null;

// Variables pour les éléments DOM
const elements = {};

// Fonction pour initialiser les éléments DOM
function initializeElements() {
  Object.assign(elements, {
    // Tabs
    tabButtons: document.querySelectorAll(".tab-button"),
    contentSections: document.querySelectorAll(".testimonial-content"),

    // Audio
    recordBtn: document.getElementById("recordBtn"),
    stopBtn: document.getElementById("stopBtn"),
    reRecordBtn: document.getElementById("reRecordBtn"),
    recordingStatus: document.getElementById("recordingStatus"),
    recordingTime: document.getElementById("recordingTime"),
    audioPlayer: document.getElementById("audioPlayer"),
    audioPlayback: document.getElementById("audioPlayback"),

    // Video
    videoRecordBtn: document.getElementById("videoRecordBtn"),
    videoStopBtn: document.getElementById("videoStopBtn"),
    reRecordVideoBtn: document.getElementById("reRecordVideoBtn"),
    videoRecordingStatus: document.getElementById("videoRecordingStatus"),
    videoRecordingTime: document.getElementById("videoRecordingTime"),
    videoPreview: document.getElementById("videoPreview"),
    videoPlaceholder: document.getElementById("videoPlaceholder"),
    videoPlayer: document.getElementById("videoPlayer"),
    videoPlayback: document.getElementById("videoPlayback"),

    // Form
    testimonialForm: document.getElementById("testimonialForm"),
    testimonialText: document.getElementById("testimonialText"),
    charCount: document.getElementById("charCount"),
    starRating: document.getElementById("starRating"),
    testimonialRating: document.getElementById("testimonialRating"),

    // Method cards
    methodCards: document.querySelectorAll(".method-card"),
  });
}

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  initializeElements();
  initializeSimpleAnimations();
  initializeChoiceButtons();
  initializeTabs();
  initializeMethodToggle();
  initializeAudioRecording();
  initializeVideoRecording();
  initializeFileUpload();
  initializeFormHandlers();
  initializeRatingSystem();
  initializeMethodCards();
  initializeFAQ();

  // Set current year
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// Animations simples CSS
function initializeSimpleAnimations() {
  // Animer les éléments au scroll avec Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observer les éléments à animer
  const animateElements = document.querySelectorAll(
    ".method-card, .testimonial-form-container, .action-btn"
  );
  animateElements.forEach((el) => {
    el.classList.add("animate-ready");
    observer.observe(el);
  });
}

// Gestion des boutons de choix
function initializeChoiceButtons() {
  const websiteChoice = document.getElementById("websiteChoice");

  if (websiteChoice) {
    websiteChoice.addEventListener("click", () => {
      showTestimonialForm();
    });
  }
}

function showTestimonialForm() {
  // Afficher la section d'invitation
  const invitationSection = document.getElementById("testimonial-invitation");
  if (invitationSection) {
    invitationSection.style.display = "block";

    // Animation simple d'apparition
    invitationSection.style.opacity = "0";
    invitationSection.style.transform = "translateY(30px)";
    setTimeout(() => {
      invitationSection.style.transition = "all 0.6s ease";
      invitationSection.style.opacity = "1";
      invitationSection.style.transform = "translateY(0)";
    }, 100);
  }

  // Afficher le formulaire
  const formSection = document.getElementById("testimonial-form");
  if (formSection) {
    formSection.style.display = "block";

    // Animation simple d'apparition avec délai
    setTimeout(() => {
      formSection.style.opacity = "0";
      formSection.style.transform = "translateY(30px)";
      setTimeout(() => {
        formSection.style.transition = "all 0.6s ease";
        formSection.style.opacity = "1";
        formSection.style.transform = "translateY(0)";
      }, 100);
    }, 300);
  }

  // Scroll vers la section d'invitation
  setTimeout(() => {
    if (invitationSection) {
      invitationSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, 400);
}

// Gestion des onglets
function initializeTabs() {
  elements.tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabType = button.dataset.tab;
      switchTab(tabType);
    });
  });
}

function switchTab(tabType) {
  // Mise à jour des boutons d'onglets
  elements.tabButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.tab === tabType) {
      btn.classList.add("active");
    }
  });

  // Mise à jour du contenu
  elements.contentSections.forEach((section) => {
    section.classList.remove("active");
    if (section.id === `${tabType}-content`) {
      section.classList.add("active");
    }
  });

  // Animation simple lors du changement d'onglet
  const activeContent = document.getElementById(`${tabType}-content`);
  if (activeContent) {
    activeContent.style.opacity = "0";
    activeContent.style.transform = "translateX(20px)";
    setTimeout(() => {
      activeContent.style.transition = "all 0.3s ease";
      activeContent.style.opacity = "1";
      activeContent.style.transform = "translateX(0)";
    }, 10);
  }

  // Nettoyage des enregistrements précédents si on change d'onglet
  cleanupRecordings();
}

// Gestion des cartes de méthodes
function initializeMethodCards() {
  elements.methodCards.forEach((card) => {
    card.addEventListener("click", () => {
      const method = card.dataset.method;
      switchTab(method);

      // Scroll vers le formulaire
      document.getElementById("testimonial-form").scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

// Gestion des toggles méthodes (enregistrer/importer)
function initializeMethodToggle() {
  // Toggle pour audio
  const audioToggles = document.querySelectorAll(".audio-methods .toggle-btn");
  audioToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const method = btn.dataset.method;
      switchAudioMethod(method);
    });
  });

  // Toggle pour vidéo
  const videoToggles = document.querySelectorAll(".video-methods .toggle-btn");
  videoToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const method = btn.dataset.method;
      switchVideoMethod(method);
    });
  });
}

function switchAudioMethod(method) {
  // Mise à jour des boutons
  const audioToggles = document.querySelectorAll(".audio-methods .toggle-btn");
  audioToggles.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.method === method) {
      btn.classList.add("active");
    }
  });

  // Mise à jour du contenu
  const audioContents = document.querySelectorAll(
    ".audio-methods .method-content"
  );
  audioContents.forEach((content) => {
    content.classList.remove("active");
    if (content.id === `audio-${method}`) {
      content.classList.add("active");
    }
  });
}

function switchVideoMethod(method) {
  // Mise à jour des boutons
  const videoToggles = document.querySelectorAll(".video-methods .toggle-btn");
  videoToggles.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.method === method) {
      btn.classList.add("active");
    }
  });

  // Mise à jour du contenu
  const videoContents = document.querySelectorAll(
    ".video-methods .method-content"
  );
  videoContents.forEach((content) => {
    content.classList.remove("active");
    if (content.id === `video-${method}`) {
      content.classList.add("active");
    }
  });
}

// Gestion des uploads de fichiers
function initializeFileUpload() {
  // Upload audio
  initializeAudioUpload();
  // Upload vidéo
  initializeVideoUpload();
}

function initializeAudioUpload() {
  const fileInput = document.getElementById("audioFileInput");
  const uploadZone = document.getElementById("audioUploadZone");
  const uploadedAudio = document.getElementById("uploadedAudio");
  const audioPlayer = document.getElementById("uploadedAudioPlayer");
  const fileName = document.getElementById("audioFileName");
  const removeBtn = document.getElementById("removeAudioBtn");

  if (!fileInput || !uploadZone) return;

  // Gestion du drag & drop
  uploadZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadZone.classList.add("drag-over");
  });

  uploadZone.addEventListener("dragleave", () => {
    uploadZone.classList.remove("drag-over");
  });

  uploadZone.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadZone.classList.remove("drag-over");
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleAudioFile(files[0]);
    }
  });

  // Gestion du clic sur la zone
  uploadZone.addEventListener("click", () => {
    fileInput.click();
  });

  // Gestion de la sélection de fichier
  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      handleAudioFile(e.target.files[0]);
    }
  });

  // Bouton supprimer
  if (removeBtn) {
    removeBtn.addEventListener("click", () => {
      removeAudioFile();
    });
  }

  function handleAudioFile(file) {
    // Validation
    if (!file.type.startsWith("audio/")) {
      showError("Veuillez sélectionner un fichier audio valide.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      // 50MB
      showError("Le fichier est trop volumineux. Taille maximum : 50MB.");
      return;
    }

    // Affichage
    const url = URL.createObjectURL(file);
    audioPlayer.src = url;
    fileName.textContent = file.name;

    uploadZone.style.display = "none";
    uploadedAudio.style.display = "block";

    // Animation d'apparition
    uploadedAudio.style.opacity = "0";
    uploadedAudio.style.transform = "translateY(20px)";
    setTimeout(() => {
      uploadedAudio.style.transition = "all 0.4s ease";
      uploadedAudio.style.opacity = "1";
      uploadedAudio.style.transform = "translateY(0)";
    }, 10);
  }

  function removeAudioFile() {
    uploadZone.style.display = "block";
    uploadedAudio.style.display = "none";
    fileInput.value = "";
    audioPlayer.src = "";
  }
}

function initializeVideoUpload() {
  const fileInput = document.getElementById("videoFileInput");
  const uploadZone = document.getElementById("videoUploadZone");
  const uploadedVideo = document.getElementById("uploadedVideo");
  const videoPlayer = document.getElementById("uploadedVideoPlayer");
  const fileName = document.getElementById("videoFileName");
  const removeBtn = document.getElementById("removeVideoBtn");

  if (!fileInput || !uploadZone) return;

  // Gestion du drag & drop
  uploadZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadZone.classList.add("drag-over");
  });

  uploadZone.addEventListener("dragleave", () => {
    uploadZone.classList.remove("drag-over");
  });

  uploadZone.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadZone.classList.remove("drag-over");
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleVideoFile(files[0]);
    }
  });

  // Gestion du clic sur la zone
  uploadZone.addEventListener("click", () => {
    fileInput.click();
  });

  // Gestion de la sélection de fichier
  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      handleVideoFile(e.target.files[0]);
    }
  });

  // Bouton supprimer
  if (removeBtn) {
    removeBtn.addEventListener("click", () => {
      removeVideoFile();
    });
  }

  function handleVideoFile(file) {
    // Validation
    if (!file.type.startsWith("video/")) {
      showError("Veuillez sélectionner un fichier vidéo valide.");
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      // 100MB
      showError("Le fichier est trop volumineux. Taille maximum : 100MB.");
      return;
    }

    // Affichage
    const url = URL.createObjectURL(file);
    videoPlayer.src = url;
    fileName.textContent = file.name;

    uploadZone.style.display = "none";
    uploadedVideo.style.display = "block";

    // Animation d'apparition
    uploadedVideo.style.opacity = "0";
    uploadedVideo.style.transform = "translateY(20px)";
    setTimeout(() => {
      uploadedVideo.style.transition = "all 0.4s ease";
      uploadedVideo.style.opacity = "1";
      uploadedVideo.style.transform = "translateY(0)";
    }, 10);
  }

  function removeVideoFile() {
    uploadZone.style.display = "block";
    uploadedVideo.style.display = "none";
    fileInput.value = "";
    videoPlayer.src = "";
  }
}

// Système de notation par étoiles
function initializeRatingSystem() {
  // Notation pour texte
  initializeStarRating("starRating", "testimonialRating");
  // Notation pour audio
  initializeStarRating("audioStarRating", "audioRating");
  // Notation pour vidéo
  initializeStarRating("videoStarRating", "videoRating");
}

function initializeStarRating(starContainerId, inputId) {
  const starContainer = document.getElementById(starContainerId);
  const ratingInput = document.getElementById(inputId);

  if (!starContainer || !ratingInput) return;

  const stars = starContainer.querySelectorAll(".star");
  const ratingText = starContainer.nextElementSibling;

  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      const rating = index + 1;
      ratingInput.value = rating;

      // Mise à jour visuelle
      stars.forEach((s, i) => {
        s.classList.toggle("selected", i < rating);
      });

      // Mise à jour du texte
      const texts = ["Très mauvais", "Mauvais", "Correct", "Bon", "Excellent"];
      if (ratingText) {
        ratingText.textContent = `${rating}/5 - ${texts[rating - 1]}`;
      }

      // Animation simple
      star.style.transform = "scale(1.3)";
      setTimeout(() => {
        star.style.transition = "transform 0.2s ease";
        star.style.transform = "scale(1)";
      }, 100);
    });

    star.addEventListener("mouseenter", () => {
      const rating = index + 1;
      stars.forEach((s, i) => {
        s.style.color = i < rating ? "#ff3c3c" : "#ddd";
      });
    });

    star.addEventListener("mouseleave", () => {
      const currentRating = parseInt(ratingInput.value) || 0;
      stars.forEach((s, i) => {
        s.style.color = i < currentRating ? "#ff3c3c" : "#ddd";
      });
    });
  });
}

// Enregistrement Audio
function initializeAudioRecording() {
  if (!elements.recordBtn) return;

  elements.recordBtn.addEventListener("click", startAudioRecording);
  elements.stopBtn.addEventListener("click", stopRecording);
  elements.reRecordBtn.addEventListener("click", resetAudioRecording);
}

async function startAudioRecording() {
  try {
    currentStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
      },
    });

    const options = {
      mimeType: "audio/webm;codecs=opus",
    };

    mediaRecorder = new MediaRecorder(currentStream, options);
    recordedChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = handleAudioStop;

    mediaRecorder.start();
    isRecording = true;
    recordingStartTime = Date.now();

    updateRecordingUI(true);
    startRecordingTimer();
  } catch (error) {
    console.error("Erreur lors de l'accès au microphone:", error);
    showError(
      "Impossible d'accéder au microphone. Vérifiez les autorisations."
    );
  }
}

function handleAudioStop() {
  const audioBlob = new Blob(recordedChunks, { type: "audio/webm" });
  const audioUrl = URL.createObjectURL(audioBlob);

  elements.audioPlayback.src = audioUrl;
  elements.audioPlayer.style.display = "block";

  // Animation simple d'apparition
  elements.audioPlayer.style.opacity = "0";
  elements.audioPlayer.style.transform = "translateY(20px)";
  setTimeout(() => {
    elements.audioPlayer.style.transition = "all 0.4s ease";
    elements.audioPlayer.style.opacity = "1";
    elements.audioPlayer.style.transform = "translateY(0)";
  }, 10);
}

// Enregistrement Vidéo
function initializeVideoRecording() {
  if (!elements.videoRecordBtn) return;

  elements.videoRecordBtn.addEventListener("click", startVideoRecording);
  elements.videoStopBtn.addEventListener("click", stopRecording);
  elements.reRecordVideoBtn.addEventListener("click", resetVideoRecording);
}

async function startVideoRecording() {
  try {
    currentStream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: "user",
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
      },
    });

    elements.videoPreview.srcObject = currentStream;
    elements.videoPreview.play();
    elements.videoPlaceholder.style.display = "none";

    const options = {
      mimeType: "video/webm;codecs=vp8,opus",
    };

    mediaRecorder = new MediaRecorder(currentStream, options);
    recordedChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = handleVideoStop;

    mediaRecorder.start();
    isRecording = true;
    recordingStartTime = Date.now();

    updateVideoRecordingUI(true);
    startRecordingTimer("video");
  } catch (error) {
    console.error("Erreur lors de l'accès à la caméra:", error);
    showError("Impossible d'accéder à la caméra. Vérifiez les autorisations.");
  }
}

function handleVideoStop() {
  const videoBlob = new Blob(recordedChunks, { type: "video/webm" });
  const videoUrl = URL.createObjectURL(videoBlob);

  elements.videoPlayback.src = videoUrl;
  elements.videoPlayer.style.display = "block";
  elements.videoPreview.style.display = "none";

  // Animation simple d'apparition
  elements.videoPlayer.style.opacity = "0";
  elements.videoPlayer.style.transform = "translateY(20px)";
  setTimeout(() => {
    elements.videoPlayer.style.transition = "all 0.4s ease";
    elements.videoPlayer.style.opacity = "1";
    elements.videoPlayer.style.transform = "translateY(0)";
  }, 10);
}

// Arrêt d'enregistrement
function stopRecording() {
  if (mediaRecorder && isRecording) {
    mediaRecorder.stop();
    isRecording = false;

    // Arrêt des pistes du stream
    if (currentStream) {
      currentStream.getTracks().forEach((track) => track.stop());
    }

    updateRecordingUI(false);
    updateVideoRecordingUI(false);
    stopRecordingTimer();
  }
}

// Minuteur d'enregistrement
function startRecordingTimer(type = "audio") {
  const timeElement =
    type === "video" ? elements.videoRecordingTime : elements.recordingTime;

  recordingTimer = setInterval(() => {
    if (!isRecording) {
      clearInterval(recordingTimer);
      return;
    }

    const elapsed = Date.now() - recordingStartTime;
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);

    timeElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, 1000);
}

function stopRecordingTimer() {
  if (recordingTimer) {
    clearInterval(recordingTimer);
    recordingTimer = null;
  }
}

// Mise à jour de l'interface d'enregistrement
function updateRecordingUI(recording) {
  const statusElement = elements.recordingStatus;
  const statusText = statusElement.querySelector(".status-text");
  const statusIndicator = statusElement.querySelector(".status-indicator");

  if (recording) {
    elements.recordBtn.disabled = true;
    elements.stopBtn.disabled = false;
    statusText.textContent = "Enregistrement en cours...";
    statusIndicator.classList.add("recording");

    // Animation simple du bouton d'arrêt
    elements.stopBtn.style.animation = "pulse-simple 1s infinite";
  } else {
    elements.recordBtn.disabled = false;
    elements.stopBtn.disabled = true;
    statusText.textContent = "Enregistrement terminé";
    statusIndicator.classList.remove("recording");

    elements.stopBtn.style.animation = "";
  }
}

function updateVideoRecordingUI(recording) {
  const statusElement = elements.videoRecordingStatus;
  const statusText = statusElement.querySelector(".status-text");
  const statusIndicator = statusElement.querySelector(".status-indicator");

  if (recording) {
    elements.videoRecordBtn.disabled = true;
    elements.videoStopBtn.disabled = false;
    statusText.textContent = "Enregistrement vidéo en cours...";
    statusIndicator.classList.add("recording");
  } else {
    elements.videoRecordBtn.disabled = false;
    elements.videoStopBtn.disabled = true;
    statusText.textContent = "Enregistrement terminé";
    statusIndicator.classList.remove("recording");
  }
}

// Reset des enregistrements
function resetAudioRecording() {
  elements.audioPlayer.style.display = "none";
  elements.recordingTime.textContent = "00:00";
  elements.recordingStatus.querySelector(".status-text").textContent =
    "Prêt à enregistrer";
  elements.recordingStatus
    .querySelector(".status-indicator")
    .classList.remove("recording");
  recordedChunks = [];
}

function resetVideoRecording() {
  elements.videoPlayer.style.display = "none";
  elements.videoPreview.style.display = "block";
  elements.videoPlaceholder.style.display = "block";
  elements.videoPreview.srcObject = null;
  elements.videoRecordingTime.textContent = "00:00";
  elements.videoRecordingStatus.querySelector(".status-text").textContent =
    "Prêt à enregistrer";
  elements.videoRecordingStatus
    .querySelector(".status-indicator")
    .classList.remove("recording");
  recordedChunks = [];
}

// Nettoyage des enregistrements
function cleanupRecordings() {
  if (isRecording) {
    stopRecording();
  }
  resetAudioRecording();
  resetVideoRecording();
}

// Gestion des formulaires
function initializeFormHandlers() {
  // Compteur de caractères
  if (elements.testimonialText) {
    elements.testimonialText.addEventListener("input", updateCharCounter);
  }

  // Soumission du formulaire
  if (elements.testimonialForm) {
    elements.testimonialForm.addEventListener("submit", handleFormSubmit);
  }
}

function updateCharCounter() {
  const text = elements.testimonialText.value;
  const count = text.length;
  elements.charCount.textContent = count;

  // Changement de couleur selon la limite
  if (count > 450) {
    elements.charCount.style.color = "#e74c3c";
  } else if (count > 400) {
    elements.charCount.style.color = "#f39c12";
  } else {
    elements.charCount.style.color = "#27ae60";
  }
}

// Soumission du formulaire
async function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(elements.testimonialForm);
  const submitBtn = event.target.querySelector(".testimonial-submit");
  const feedback = event.target.querySelector(".form-feedback");

  // Animation du bouton
  submitBtn.disabled = true;
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML =
    '<i class="bi bi-hourglass-split"></i> Envoi en cours...';

  try {
    // Simulation d'envoi (remplacer par votre logique d'envoi)
    await simulateFormSubmission(formData);

    // Succès
    feedback.textContent =
      "✅ Témoignage envoyé avec succès ! Merci pour votre retour.";
    feedback.style.color = "#27ae60";

    // Animation simple de succès
    feedback.style.opacity = "0";
    feedback.style.transform = "translateY(20px)";
    setTimeout(() => {
      feedback.style.transition = "all 0.4s ease";
      feedback.style.opacity = "1";
      feedback.style.transform = "translateY(0)";
    }, 10);

    // Reset du formulaire après délai
    setTimeout(() => {
      elements.testimonialForm.reset();
      resetAudioRecording();
      resetVideoRecording();
      feedback.textContent = "";
    }, 3000);
  } catch (error) {
    console.error("Erreur lors de l'envoi:", error);
    feedback.textContent = "❌ Erreur lors de l'envoi. Veuillez réessayer.";
    feedback.style.color = "#e74c3c";
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
}

// Envoi des données vers Supabase via Vercel Functions
async function simulateFormSubmission(formData) {
  try {
    // Convertir FormData en objet pour traitement
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    // Gérer les fichiers audio/vidéo
    let audioFileUrl = null;
    let videoFileUrl = null;

    // Upload du fichier audio si présent
    const audioFile = formData.get('audioFile');
    if (audioFile && audioFile instanceof Blob && audioFile.size > 0) {
      audioFileUrl = await uploadMediaFile(audioFile, 'audio');
    }

    // Upload du fichier vidéo si présent  
    const videoFile = formData.get('videoFile');
    if (videoFile && videoFile instanceof Blob && videoFile.size > 0) {
      videoFileUrl = await uploadMediaFile(videoFile, 'video');
    }

    // Déterminer le type de témoignage
    let testimonialType = 'text';
    if (audioFileUrl || recordedChunks.length > 0) {
      testimonialType = 'audio';
      // Si on a un enregistrement mais pas de fichier uploadé
      if (!audioFileUrl && recordedChunks.length > 0) {
        const audioBlob = new Blob(recordedChunks, { type: 'audio/webm' });
        audioFileUrl = await uploadMediaFile(audioBlob, 'audio');
      }
    } else if (videoFileUrl) {
      testimonialType = 'video';
    }

    // Préparer les données pour l'API
    const testimonialData = {
      clientName: data.clientName,
      clientCompany: data.clientCompany,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone,
      testimonialText: data.testimonialText,
      testimonialRating: data.testimonialRating,
      audioRating: data.audioRating,
      videoRating: data.videoRating,
      allowWebsite: data.allowWebsite === 'on',
      testimonialType: testimonialType,
      audioFileUrl: audioFileUrl,
      videoFileUrl: videoFileUrl
    };

    // Envoyer vers l'API Vercel
    const response = await fetch('/api/testimonials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testimonialData)
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const result = await response.json();
    console.log("Témoignage envoyé avec succès:", result);
    return result;
      
  } catch (error) {
    console.error("Erreur lors de l'envoi:", error);
    throw error;
  }
}

// Fonction pour uploader les fichiers média vers Supabase
async function uploadMediaFile(file, type) {
  try {
    // Convertir le fichier en base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    
    // Générer un nom de fichier
    const fileName = `${type}-${Date.now()}.${getFileExtension(file.type)}`;
    
    const response = await fetch('/api/upload-media', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: base64,
        fileName: fileName,
        fileType: file.type
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur upload: ${response.status}`);
    }

    const result = await response.json();
    return result.fileUrl;
    
  } catch (error) {
    console.error('Erreur upload fichier:', error);
    throw error;
  }
}

// Fonction utilitaire pour obtenir l'extension de fichier
function getFileExtension(mimeType) {
  const extensions = {
    'audio/webm': 'webm',
    'audio/mp3': 'mp3',
    'audio/wav': 'wav',
    'audio/m4a': 'm4a',
    'video/webm': 'webm',
    'video/mp4': 'mp4',
    'video/mov': 'mov',
    'video/avi': 'avi'
  };
  return extensions[mimeType] || 'bin';
}

// Affichage d'erreurs
function showError(message) {
  const feedback = document.querySelector(".form-feedback");
  if (feedback) {
    feedback.textContent = `❌ ${message}`;
    feedback.style.color = "#ff3c3c";

    feedback.style.opacity = "0";
    feedback.style.transform = "translateY(20px)";
    setTimeout(() => {
      feedback.style.transition = "all 0.4s ease";
      feedback.style.opacity = "1";
      feedback.style.transform = "translateY(0)";
    }, 10);
  }
}

// Effets visuels supplémentaires avec CSS simple
function initializeHoverEffects() {
  // Les effets hover sont maintenant gérés en CSS uniquement
  // pour éviter les conflits avec GSAP
}

// Gestion de la FAQ
function initializeFAQ() {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const faqItem = question.parentElement;
      const faqAnswer = faqItem.querySelector(".faq-answer");
      const isActive = question.classList.contains("active");

      // Fermer toutes les autres FAQ
      faqQuestions.forEach((q) => {
        q.classList.remove("active");
        q.parentElement.querySelector(".faq-answer").classList.remove("active");
      });

      // Toggle la FAQ courante
      if (!isActive) {
        question.classList.add("active");
        faqAnswer.classList.add("active");

        // Scroll vers la FAQ ouverte après animation
        setTimeout(() => {
          faqItem.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 150);
      }
    });
  });
}
