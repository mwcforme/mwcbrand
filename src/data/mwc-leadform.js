/* =========================================================
   MWC Lead Form Pattern v2026.06
   Client-side validation + descriptive error handling +
   submit lifecycle (loading -> success | error).
   Hook real submission inside submitForm() below.
   ========================================================= */
(function () {
  'use strict';
  const form = document.getElementById('mwc-leadform');
  if (!form) return;

  const banner = form.querySelector('#mwc-form-banner');
  const submitBtn = form.querySelector('.mwc-submit');

  // ---- Validators ---------------------------------------------------------
  const VALIDATORS = {
    name: (value) => {
      const v = value.trim();
      if (!v) return 'Please enter your name so we can address you correctly.';
      if (v.length < 2) return 'Name must be at least 2 characters.';
      if (v.length > 80) return 'Name is too long. Please shorten to 80 characters.';
      if (!/^[\p{L} '\-\.]+$/u.test(v)) return 'Please use only letters, spaces, hyphens, and apostrophes.';
      return null;
    },
    phone: (value) => {
      const digits = value.replace(/\D/g, '');
      if (!digits) return 'Please enter your phone number. We will call you within one business hour.';
      if (digits.length < 10) return 'Phone number is too short. Please include the area code.';
      if (digits.length > 11) return 'Phone number is too long. US numbers are 10 digits.';
      if (digits.length === 11 && digits[0] !== '1') return 'Phone number must be a valid US number.';
      // Basic invalid-number guards
      if (/^(\d)\1{9,}$/.test(digits.replace(/^1/, ''))) return 'Please enter a real phone number.';
      return null;
    },
    email: (value) => {
      const v = value.trim();
      if (!v) return 'Please enter a valid email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'That email does not look right. Please check and try again.';
      if (v.length > 254) return 'Email is too long.';
      return null;
    },
    location: () => {
      const checked = form.querySelector('input[name="location"]:checked');
      if (!checked) return 'Please select the center closest to you.';
      return null;
    },
    consent: () => {
      const c = form.querySelector('input[name="consent"]');
      if (c && !c.checked) return 'Please agree to receive messages so we can confirm your appointment.';
      return null;
    }
  };

  // ---- Phone auto-format --------------------------------------------------
  const phoneInput = form.querySelector('input[name="phone"]');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let d = e.target.value.replace(/\D/g, '').slice(0, 10);
      if (d.length > 6) e.target.value = `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
      else if (d.length > 3) e.target.value = `(${d.slice(0,3)}) ${d.slice(3)}`;
      else if (d.length > 0) e.target.value = `(${d}`;
      else e.target.value = '';
    });
  }

  // ---- Field state helpers ------------------------------------------------
  function setError(field, message) {
    const wrap = field.closest('.mwc-field, .mwc-locations');
    if (!wrap) return;
    wrap.classList.remove('is-valid');
    wrap.classList.add('is-error');
    const err = wrap.querySelector('.mwc-field__error');
    if (err) err.textContent = message;
  }
  function setValid(field) {
    const wrap = field.closest('.mwc-field, .mwc-locations');
    if (!wrap) return;
    wrap.classList.remove('is-error');
    wrap.classList.add('is-valid');
    const err = wrap.querySelector('.mwc-field__error');
    if (err) err.textContent = '';
  }
  function clearState(field) {
    const wrap = field.closest('.mwc-field, .mwc-locations');
    if (!wrap) return;
    wrap.classList.remove('is-error', 'is-valid');
    const err = wrap.querySelector('.mwc-field__error');
    if (err) err.textContent = '';
  }

  // ---- Field-level validation on blur + on input clear -------------------
  form.querySelectorAll('input[name], select[name]').forEach((input) => {
    const fn = VALIDATORS[input.name];
    if (!fn) return;

    input.addEventListener('blur', () => {
      const msg = fn(input.value || '');
      if (msg) setError(input, msg);
      else setValid(input);
    });

    input.addEventListener('input', () => {
      // Clear error as soon as the user types so they aren't yelled at
      const wrap = input.closest('.mwc-field, .mwc-locations');
      if (wrap && wrap.classList.contains('is-error')) clearState(input);
    });

    input.addEventListener('change', () => {
      if (input.type === 'radio' || input.type === 'checkbox') {
        const msg = fn(input.value || '');
        if (msg) setError(input, msg);
        else setValid(input);
      }
    });
  });

  // ---- Full validation ----------------------------------------------------
  function validateAll() {
    let firstErrorField = null;
    Object.keys(VALIDATORS).forEach((key) => {
      const field = form.querySelector(`[name="${key}"]`);
      if (!field) return;
      const msg = VALIDATORS[key](field.value || '');
      if (msg) {
        setError(field, msg);
        if (!firstErrorField) firstErrorField = field;
      } else {
        setValid(field);
      }
    });
    return firstErrorField;
  }

  // ---- Submission ---------------------------------------------------------
  async function submitForm(payload) {
    // REPLACE this stub with your real POST to GHL, Zapier, or your endpoint.
    // Example for GHL inbound webhook:
    //
    //   const res = await fetch('https://services.leadconnectorhq.com/hooks/.../webhook-trigger/...', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(payload)
    //   });
    //   if (!res.ok) throw new Error('Network response was not ok');
    //   return res.json();
    //
    // For demo: simulate 800ms latency + success
    return new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 800));
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    form.classList.remove('has-error');
    const firstError = validateAll();
    if (firstError) {
      form.classList.add('has-error');
      banner.textContent = 'Please correct the highlighted fields and try again.';
      firstError.focus({ preventScroll: false });
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Collect data
    const data = Object.fromEntries(new FormData(form).entries());
    data.source_url = window.location.href;
    data.submitted_at = new Date().toISOString();

    // Submit
    form.classList.add('is-submitting');
    submitBtn.setAttribute('aria-busy', 'true');
    try {
      await submitForm(data);
      form.classList.remove('is-submitting');
      form.classList.add('is-success');
      // Optional: send GA / Meta / Google Ads conversion event here
      // window.dataLayer && window.dataLayer.push({ event: 'lead_submit' });
    } catch (err) {
      form.classList.remove('is-submitting');
      form.classList.add('has-error');
      banner.textContent = 'We could not submit your request. Please check your connection and try again, or call us directly at (804) 346-4636.';
      submitBtn.removeAttribute('aria-busy');
      console.error('[mwc-leadform] submit failed:', err);
    }
  });
})();
