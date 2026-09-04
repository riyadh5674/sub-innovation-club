// ============================================================
// MEMBERSHIP FORM — Multi-step with Formspree
// ============================================================

import { clubData } from '../data/club-data.js';

const TOTAL_STEPS = 6;
let currentStep = 1;
let formData = {};

export function initMembership() {
  renderDepartments();
  renderInterests();
  setupStepNavigation();
  setupPhotoUpload();
  setupPaymentMethods();
  setupPaymentScreenshot();
  setupFormSubmit();
  setupInterestToggles();
  renderPaymentInstructions('bkash');
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

function goToStep(step) {
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

  document.querySelector('.membership-form-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      alert('Please agree to the Terms & Conditions before submitting.');
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Submitting...';

    try {
      const form = document.getElementById('membershipForm');
      const fd = new FormData(form);

      // Add extra fields
      fd.append('paymentMethod', formData.paymentMethod);
      fd.append('txnId', formData.txnId);
      fd.append('_subject', 'New SUBIC Membership Application');
      fd.append('_template', 'table');

      const resp = await fetch('https://formspree.io/f/xwlkqvbr', {
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
      alert('Something went wrong. Please try again or contact us directly.');
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i>Submit Application';
    }
  });
}

function showSuccess() {
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
