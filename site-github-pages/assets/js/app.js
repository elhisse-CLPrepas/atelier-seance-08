const toastElement = document.getElementById('copyToast');
    const toast = window.bootstrap && toastElement ? bootstrap.Toast.getOrCreateInstance(toastElement) : null;
    const contributionKey = 'seance08Contributions';
    const contributionForm = document.getElementById('contributionForm');
    const contributionPreview = document.getElementById('contributionPreview');
    const contributionList = document.getElementById('contributionList');
    const sendContribution = document.getElementById('sendContribution');
    const copyContribution = document.getElementById('copyContribution');
    const clearContributions = document.getElementById('clearContributions');
    const progressChecks = document.querySelectorAll('[data-progress-check]');
    const progressLabel = document.getElementById('progressLabel');
    const progressPercent = document.getElementById('progressPercent');
    const progressBar = document.getElementById('progressBar');

    function showToast(message = 'Prompt copié dans le presse-papiers.') {
      if (!toastElement) return;
      toastElement.querySelector('.toast-body').innerText = message;
      if (toast) {
        toast.show();
      }
    }

    function fallbackCopy(text, message) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast(message);
    }

    function copyText(text, message = 'Texte copié dans le presse-papiers.') {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => showToast(message)).catch(() => fallbackCopy(text, message));
        return;
      }

      fallbackCopy(text, message);
    }

    function copyPrompt(targetId) {
      const target = document.getElementById(targetId);
      if (!target) return;
      copyText(target.innerText.trim(), 'Prompt copié dans le presse-papiers.');
    }

    function getContributions() {
      return JSON.parse(localStorage.getItem(contributionKey) || '[]');
    }

    function saveContributions(contributions) {
      localStorage.setItem(contributionKey, JSON.stringify(contributions));
    }

    function updateProgress() {
      const total = progressChecks.length;
      const completed = Array.from(progressChecks).filter((check) => check.checked).length;
      const percent = total ? Math.round((completed / total) * 100) : 0;

      if (progressLabel) progressLabel.innerText = `${completed} / ${total} points validés`;
      if (progressPercent) progressPercent.innerText = `${percent}%`;
      if (progressBar) {
        progressBar.style.width = `${percent}%`;
        progressBar.parentElement.setAttribute('aria-valuenow', String(percent));
      }
    }

    function escapeHtml(value) {
      return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
    }

    function buildContributionSummary(data) {
      return `Contribution séance 08 — ${data.projectTitle}

Candidat : ${data.candidateName}
Email : ${data.candidateEmail}
Type de production : ${data.projectType}

Besoin traité :
${data.projectNeed}

Résumé préparé :
${data.projectSummary}

Lien ou fichier : ${data.projectLink || 'Non renseigné'}

Feedback attendu :
${data.feedbackAsk}

Prochaine action proposée : présenter cette contribution pendant l’atelier et recueillir un feedback prioritaire.`;
    }

    function updateContributionList() {
      const contributions = getContributions();
      if (!contributions.length) {
        contributionList.innerHTML = '<p class="text-secondary mb-0">Aucune contribution locale enregistrée pour le moment.</p>';
        return;
      }

      contributionList.innerHTML = contributions.map((item, index) => `
        <article class="submission-card p-3 rounded">
          <h4 class="h6 fw-bold mb-1">${index + 1}. ${escapeHtml(item.projectTitle)}</h4>
          <p class="small mb-1"><strong>Candidat :</strong> ${escapeHtml(item.candidateName)}</p>
          <p class="small mb-0"><strong>Feedback :</strong> ${escapeHtml(item.feedbackAsk)}</p>
        </article>
      `).join('');
    }

    document.querySelectorAll('[data-copy-target]').forEach((button) => {
      button.addEventListener('click', () => copyPrompt(button.dataset.copyTarget));
    });

    progressChecks.forEach((check) => {
      check.addEventListener('change', updateProgress);
    });

    contributionForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(contributionForm).entries());
      const summary = buildContributionSummary(data);
      contributionPreview.innerText = summary;

      const contributions = getContributions();
      contributions.unshift({ ...data, createdAt: new Date().toISOString() });
      saveContributions(contributions.slice(0, 6));
      updateContributionList();

      const subject = encodeURIComponent(`Contribution séance 08 — ${data.projectTitle}`);
      const body = encodeURIComponent(summary);
      sendContribution.href = `mailto:?subject=${subject}&body=${body}`;
      sendContribution.classList.remove('disabled');
      sendContribution.removeAttribute('aria-disabled');
      showToast('Résumé généré et enregistré localement.');
    });

    copyContribution.addEventListener('click', () => {
      const text = contributionPreview.innerText.trim();
      if (!text || text.startsWith('Complétez le formulaire')) return;
      copyText(text, 'Résumé de contribution copié.');
    });

    clearContributions.addEventListener('click', () => {
      localStorage.removeItem(contributionKey);
      updateContributionList();
      showToast('Contributions locales effacées.');
    });

    updateContributionList();
    updateProgress();
