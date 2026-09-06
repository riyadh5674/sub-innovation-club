// ============================================================
// MEMBERSHIP FORM — Multi-step with Formspree
// ============================================================

import { clubData } from '../data/club-data.js';
import { showToast } from './toast.js';

const TOTAL_STEPS = 6;
const DRAFT_KEY = 'subic_membership_draft';
let currentStep = 1;
let formData = {};

export function initMembership() {
  renderDepartments();
  renderInterests();
  setupStepNavigation();
  setupPhotoUpload();
  setupPaymentMethods();
  setupPaymentScreenshot();
  setupAutoSave();
  restoreDraft();
  setupFormSubmit();
  setupInterestToggles();
  renderPaymentInstructions('bkash');
  updateProgressBar();
}

function updateProgressBar() {
  const bar = document.getElementById('stepProgressBar');
  if (!bar) return;
  bar.style.width = `${((currentStep - 1) / (TOTAL_STEPS - 1)) * 100}%`;
  const label = document.getElementById('stepProgressLabel');
  if (label) label.textContent = `Step ${currentStep} of ${TOTAL_STEPS}`;
}

function renderDepartments() {
  const select = document.getElementById('memberDept');
  if (!select || !clubData.departments) return;
  clubData.departments.forEach((dept) => {
    const opt = document.createElement('option');
    opt.value = dept;
    opt.textContent = dept;
    select.appendChild(opt);
  });
}

function renderInterests() {
  const grid = document.getElementById('interestsGrid');
  if (!grid || !clubData.interests) return;
  clubData.interests.forEach((interest) => {
    const label = document.createElement('label');
    label.className = 'interest-check';
    label.innerHTML = `<input type="checkbox" name="interests" value="${interest}"> ${interest}`;
    grid.appendChild(label);
  });
}

function setupInterestToggles() {
  document.addEventListener('change', (e) => {
    if (e.target.matches('.interest-check input')) {
      e.target.closest('.interest-check').classList.toggle('checked', e.target.checked);
    }
  });
}

function setupStepNavigation() {
  document.querySelectorAll('[data-next-step]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        goToStep(currentStep + 1);
      }
    });
  });

  document.querySelectorAll('[data-prev-step]').forEach((btn) => {
    btn.addEventListener('click', () => {
      goToStep(currentStep - 1);
    });
  });
}

function goToStep(step, options = {}) {
  const { animate = true } = options;
  if (step < 1 || step > TOTAL_STEPS) return;

  document.querySelectorAll('.form-step').forEach((el) => el.classList.remove('active'));
  document.querySelectorAll('.step-indicator .step').forEach((el, i) => {
    el.classList.remove('active');
    if (i + 1 < step) el.classList.add('completed');
    if (i + 1 === step) el.classList.add('active');
  });

  const stepEl = document.getElementById(`step${step}`);
  if (stepEl) stepEl.classList.add('active');

  if (step === TOTAL_STEPS) {
    renderReview();
  }

  currentStep = step;
  updateProgressBar();

  if (animate) {
    document.querySelector('.membership-form-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function validateStep(step) {
  const stepEl = document.getElementById(`step${step}`);
  if (!stepEl) return true;

  let valid = true;
  stepEl.querySelectorAll('[required]').forEach((input) => {
    removeError(input);
    if (!input.value.trim()) {
      showError(input, 'This field is required');
      valid = false;
    }
  });

  // Email validation
  stepEl.querySelectorAll('input[type="email"]').forEach((input) => {
    if (input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      showError(input, 'Please enter a valid email');
      valid = false;
    }
  });

  // Student ID pattern (flexible: accepts UG02-66-25-007, PG-00-00-00-000, etc.)
  const sidInput = stepEl.querySelector('#memberStudentId');
  if (sidInput && sidInput.value && !/^(UG\d*|PG)(-\d+){2,4}$/.test(sidInput.value.trim())) {
    showError(sidInput, 'Format: UG02-66-25-007 or PG-00-00-00-000');
    valid = false;
  }

  // Phone validation
  stepEl.querySelectorAll('input[type="tel"]').forEach((input) => {
    if (input.value && !/^[\d+\-\s()]{10,15}$/.test(input.value)) {
      showError(input, 'Please enter a valid phone number');
      valid = false;
    }
  });

  // Step 5: payment
  if (step === 5) {
    const method = document.querySelector('.payment-method-card.selected');
    const txnId = document.getElementById('txnId');
    if (!method) {
      valid = false;
    }
    if (txnId && !txnId.value.trim()) {
      showError(txnId, 'Transaction ID is required');
      valid = false;
    }
  }

  // Step 4: at least one interest
  if (step === 4) {
    const grid = document.getElementById('interestsGrid');
    const anyChecked = grid && grid.querySelector('input[name="interests"]:checked');
    const errorEl = document.getElementById('interestsError');
    if (!anyChecked) {
      valid = false;
      if (errorEl) errorEl.style.display = 'block';
    } else if (errorEl) {
      errorEl.style.display = 'none';
    }
  }

  return valid;
}

function showError(input, msg) {
  input.classList.add('is-invalid');
  let fb = input.nextElementSibling;
  if (!fb || !fb.classList.contains('invalid-feedback')) {
    fb = document.createElement('div');
    fb.className = 'invalid-feedback';
    input.after(fb);
  }
  fb.textContent = msg;
}

function removeError(input) {
  input.classList.remove('is-invalid');
}

function setupPhotoUpload() {
  const input = document.getElementById('memberPhoto');
  const preview = document.getElementById('photoPreviewImg');
  if (!input || !preview) return;

  input.addEventListener('change', () => {
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => { preview.src = e.target.result; };
      reader.readAsDataURL(file);
    }
  });
}

function setupPaymentMethods() {
  document.querySelectorAll('.payment-method-card').forEach((card) => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.payment-method-card').forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      const method = card.dataset.method;
      renderPaymentInstructions(method);
    });
  });
}

function renderPaymentInstructions(method) {
  const el = document.getElementById('paymentInstructions');
  if (!el) return;

  const instructions = clubData.paymentInstructions[method];
  if (!instructions) {
    el.innerHTML = '';
    return;
  }

  el.innerHTML = `
    <div class="payment-instructions">
      <h6><i class="fa-solid fa-info-circle me-1"></i> ${instructions.title}</h6>
      ${instructions.steps.map((s, i) => `
        <div class="instruction-number">
          <span class="num">${i + 1}</span>
          <span>${s}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function setupPaymentScreenshot() {
  const input = document.getElementById('paymentScreenshot');
  const preview = document.getElementById('screenshotPreview');
  if (!input || !preview) return;

  input.addEventListener('change', () => {
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.innerHTML = `<img src="${e.target.result}" alt="Payment screenshot">`;
        preview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });
}

/* -- Draft autosave (localStorage, no files) ------------- */
function setupAutoSave() {
  const form = document.getElementById('membershipForm');
  if (!form) return;

  const save = () => {
    const fd = new FormData(form);
    const obj = {};
    fd.forEach((value, key) => {
      if (typeof value === 'string') obj[key] = value;
    });
    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({ data: obj, step: currentStep })
    );
  };

  form.addEventListener('input', debounce(save, 400));
  form.addEventListener('change', save);
}

function restoreDraft() {
  let draft;
  try {
    draft = JSON.parse(localStorage.getItem(DRAFT_KEY));
  } catch {
    return;
  }
  if (!draft || !draft.data) return;

  const form = document.getElementById('membershipForm');
  if (!form) return;

  Object.entries(draft.data).forEach(([key, value]) => {
    const el = form.querySelector(`[name="${key}"]`);
    if (!el) return;
    if (el.type === 'checkbox') {
      el.checked = value.includes(el.value) || false;
      const label = el.closest('.interest-check');
      if (label) label.classList.toggle('checked', el.checked);
    } else if (el.tagName === 'SELECT' || el.type !== 'file') {
      el.value = value;
    }
  });

  goToStep(Math.min(Math.max(draft.step || 1, 1), TOTAL_STEPS), { animate: false });
  updateProgressBar();

  const hasValues = Object.values(draft.data).some((v) => String(v).trim());
  if (hasValues) {
    showToast('Saved draft restored — continue where you left off.', 'info');
  }
}

function debounce(fn, wait) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

function gatherFormData() {
  const form = document.getElementById('membershipForm');
  if (!form) return {};

  const interests = Array.from(form.querySelectorAll('input[name="interests"]:checked')).map((c) => c.value);

  return {
    fullName: form.querySelector('#memberName')?.value || '',
    studentId: form.querySelector('#memberStudentId')?.value || '',
    department: form.querySelector('#memberDept')?.value || '',
    batch: form.querySelector('#memberBatch')?.value || '',
    semester: form.querySelector('#memberSemester')?.value || '',
    session: form.querySelector('#memberSession')?.value || '',
    email: form.querySelector('#memberEmail')?.value || '',
    phone: form.querySelector('#memberPhone')?.value || '',
    whatsapp: form.querySelector('#memberWhatsapp')?.value || '',
    gender: form.querySelector('#memberGender')?.value || '',
    bloodGroup: form.querySelector('#memberBloodGroup')?.value || '',
    dob: form.querySelector('#memberDob')?.value || '',
    address: form.querySelector('#memberAddress')?.value || '',
    emergencyContact: form.querySelector('#memberEmergency')?.value || '',
    interests: interests.join(', '),
    motivation: form.querySelector('#memberMotivation')?.value || '',
    experience: form.querySelector('#memberExperience')?.value || '',
    linkedin: form.querySelector('#memberLinkedin')?.value || '',
    paymentMethod: document.querySelector('.payment-method-card.selected')?.dataset.method || '',
    txnId: form.querySelector('#txnId')?.value || '',
  };
}

function renderReview() {
  formData = gatherFormData();
  const el = document.getElementById('reviewContent');
  if (!el) return;

  const fields = [
    { label: 'Full Name', value: formData.fullName },
    { label: 'Student ID', value: formData.studentId },
    { label: 'Department', value: formData.department },
    { label: 'Batch', value: formData.batch },
    { label: 'Semester', value: formData.semester },
    { label: 'Session', value: formData.session },
    { label: 'Email', value: formData.email },
    { label: 'Phone', value: formData.phone },
    { label: 'WhatsApp', value: formData.whatsapp },
    { label: 'Gender', value: formData.gender },
    { label: 'Blood Group', value: formData.bloodGroup },
    { label: 'Date of Birth', value: formData.dob },
    { label: 'Address', value: formData.address },
    { label: 'Emergency Contact', value: formData.emergencyContact },
    { label: 'Interests', value: formData.interests },
    { label: 'Why Join', value: formData.motivation },
    { label: 'Experience', value: formData.experience || 'None' },
    { label: 'LinkedIn', value: formData.linkedin || 'Not provided' },
    { label: 'Payment Method', value: formData.paymentMethod.toUpperCase() },
    { label: 'Transaction ID', value: formData.txnId },
  ];

  el.innerHTML = fields
    .filter((f) => f.value)
    .map(
      (f) => `
      <div class="review-group">
        <div class="review-label">${f.label}</div>
        <div class="review-value">${escapeHtml(f.value)}</div>
      </div>`
    )
    .join('');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function setupFormSubmit() {
  const btn = document.getElementById('submitBtn');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    const terms = document.getElementById('termsCheck');
    if (!terms || !terms.checked) {
      showToast('Please agree to the Terms & Conditions before submitting.', 'error');
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Submitting...';

    try {
      const form = document.getElementById('membershipForm');
      const fd = new FormData(form);

      // Formspree (this form) does not accept attached files, so we omit the
      // file inputs (photo + payment screenshot) to guarantee submission.
      ['photo', 'paymentScreenshot'].forEach((name) => fd.delete(name));

      // Remember that screenshots exist so the club can request them
      const photoFile = document.getElementById('memberPhoto')?.files?.[0];
      const shotFile = document.getElementById('paymentScreenshot')?.files?.[0];
      fd.append('photoProvided', photoFile ? 'Yes' : 'No');
      fd.append('screenshotProvided', shotFile ? 'Yes' : 'No');

      // Add extra fields
      fd.append('paymentMethod', formData.paymentMethod);
      fd.append('txnId', formData.txnId);
      fd.append('_subject', 'New SUBIC Membership Application');
      fd.append('_template', 'table');

      const endpoint = clubData.forms?.membership || 'https://formspree.io/f/xwlkqvbr';
      const resp = await fetch(endpoint, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });

      if (resp.ok) {
        showSuccess();
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      showToast('Something went wrong. Please try again or contact us directly.', 'error');
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i>Submit Application';
    }
  });
}

function showSuccess() {
  localStorage.removeItem(DRAFT_KEY);
  const form = document.getElementById('membershipForm');
  const success = document.getElementById('membershipSuccess');
  if (form) form.style.display = 'none';
  if (success) {
    success.style.display = 'block';
    const refEl = document.getElementById('refNumber');
    if (refEl) {
      refEl.textContent = 'SUBIC-' + Date.now().toString(36).toUpperCase();
    }
  }
}
