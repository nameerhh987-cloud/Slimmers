// Slimmers Club - Interactive Script

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggleBtn && mobileMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      const isExpanded = !mobileMenu.classList.contains('hidden');
      if (isExpanded) {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      } else {
        mobileMenu.classList.remove('hidden');
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      }
    });

    // Close menu when clicking any mobile link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      });
    });
  }

  // Header Scroll Behavior
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // Dynamic Year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Keyboard accessibility for modal (Escape key)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBookingModal();
    }
  });
});

// Modal Logic
function openBookingModal(context = 'General Inquiry') {
  const modal = document.getElementById('booking-modal');
  const modalTitle = document.getElementById('modal-title');
  const interestSelect = document.getElementById('program-interest');

  if (modalTitle && context) {
    modalTitle.textContent = `Inquire: ${context}`;
  }

  // If context matches one of the options, auto-select
  if (interestSelect) {
    for (let i = 0; i < interestSelect.options.length; i++) {
      if (context.toLowerCase().includes(interestSelect.options[i].text.toLowerCase())) {
        interestSelect.selectedIndex = i;
        break;
      }
    }
  }

  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closeBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore background scrolling
    const feedback = document.getElementById('form-feedback');
    if (feedback) feedback.classList.add('hidden');
  }
}

// Form Submission Handler
function handleFormSubmit(e) {
  e.preventDefault();
  const submitBtn = document.getElementById('submit-btn');
  const feedback = document.getElementById('form-feedback');

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
  }

  setTimeout(() => {
    if (feedback) {
      feedback.classList.remove('hidden');
      feedback.textContent = 'Thank you! Your inquiry has been received. Our wellness team will contact you shortly.';
    }
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Sent Successfully';
    }

    setTimeout(() => {
      closeBookingModal();
      document.getElementById('consultation-form').reset();
      if (submitBtn) submitBtn.innerHTML = 'Confirm Request';
    }, 2200);
  }, 700);
}
