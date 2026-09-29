/* FlowTask — landing page behaviour */

document.addEventListener('DOMContentLoaded', () => {
  /* Header navigation */

  document.querySelectorAll('.nav-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = item.getAttribute('data-target') || item.getAttribute('href').substring(1);
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* Sign-up flow */

  const startSignup = () => {
    const trial = document.getElementById('trial');
    if (trial) {
      trial.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = 'index.html#trial';
    }
  };

  const headerCta = document.getElementById('header-cta');
  if (headerCta) {
    headerCta.addEventListener('click', startSignup);
  }

  const heroCta = document.getElementById('hero-cta');
  if (heroCta) {
    heroCta.addEventListener('click', startSignup);
  }

  /* Trial form */

  const trialForm = document.getElementById('trial-form');
  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = trialForm.querySelector('input[name="email"]');
      const emailError = document.getElementById('email-error');

      // Simple validation
      if (!email.value || !email.validity.valid) {
        email.classList.add('is-invalid');
        emailError.textContent = 'Please enter a valid email address.';
        email.focus();
        return;
      }

      // Clear errors
      email.classList.remove('is-invalid');
      emailError.textContent = '';

      trialForm.innerHTML = '<p>Thanks — check your inbox, the workspace is being created.</p>';
    });
  }

  /* FAQ accordion */

  document.querySelectorAll('.faq__q').forEach((question) => {
    question.addEventListener('click', () => {
      const isOpen = question.parentElement.classList.toggle('is-open');
      question.setAttribute('aria-expanded', isOpen);
    });
  });

  /* Seasonal promo bar */

  window.addEventListener('load', () => {
    setTimeout(() => {
      const promo = document.createElement('div');
      promo.className = 'promo';
      promo.innerHTML =
        '<strong>Autumn offer</strong> 3 months of Pro for the price of one. <a href="#pricing">See plans</a>';
      document.body.insertBefore(promo, document.body.firstChild);
    }, 800);
  });
});
