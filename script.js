// script.js

// Ouvre la pop-up de contact
function openPopup(event) {
  event.preventDefault();
  document.getElementById('contactPopup').style.display = 'flex';
}

// Ferme la pop-up de contact
function closePopup() {
  document.getElementById('contactPopup').style.display = 'none';
  document.querySelector('.contact-form').reset();
}

// Affiche le message de succès global avec overlay
function showGlobalSuccessMessage() {
  const overlay = document.getElementById('globalSuccessOverlay');
  if (overlay) {
    overlay.style.display = 'flex';
    // Cache l'overlay après 3 secondes
    setTimeout(() => {
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.display = 'none';
        overlay.style.opacity = '1';
      }, 300);
    }, 3000);
  }
}

// Écouteurs d'événements
document.addEventListener('DOMContentLoaded', function() {
  // Ouvre la pop-up au clic sur le bouton Email
  const emailButton = document.querySelector('a[aria-label="Envoyer un email"]');
  if (emailButton) {
    emailButton.addEventListener('click', openPopup);
  }

  // Ferme la pop-up en cliquant sur la croix
  const closeButton = document.querySelector('.close-popup');
  if (closeButton) {
    closeButton.addEventListener('click', closePopup);
  }

  // Ferme la pop-up en cliquant en dehors du contenu
  const popup = document.getElementById('contactPopup');
  if (popup) {
    popup.addEventListener('click', function(event) {
      if (event.target === popup) {
        closePopup();
      }
    });
  }

  // Gère la soumission du formulaire
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Ferme immédiatement la pop-up
      closePopup();

      // Affiche le message de succès global
      showGlobalSuccessMessage();

      // Envoie le formulaire
      const formData = new FormData(contactForm);
      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        }
      })
      .catch(error => {
        console.error('Erreur:', error);
      });
    });
  }
});

