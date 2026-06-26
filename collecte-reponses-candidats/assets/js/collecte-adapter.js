(function () {
  const endpoint = window.SEANCE08_COLLECTE_ENDPOINT;
  const form = document.getElementById('contributionForm');
  const preview = document.getElementById('contributionPreview');

  if (!endpoint || !form) {
    return;
  }

  function showStatus(message, type) {
    const status = document.getElementById('remoteCollectStatus') || document.createElement('div');
    status.id = 'remoteCollectStatus';
    status.className = `alert alert-${type} mt-3`;
    status.setAttribute('role', 'status');
    status.innerText = message;
    form.insertAdjacentElement('afterend', status);
  }

  function formToPayload() {
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.generatedSummary = preview ? preview.innerText.trim() : '';
    payload.website = payload.website || '';
    return payload;
  }

  form.insertAdjacentHTML('beforeend', '<input type="text" name="website" class="d-none" tabindex="-1" autocomplete="off" aria-hidden="true">');

  form.addEventListener('submit', function () {
    window.setTimeout(function () {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formToPayload()),
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error('HTTP ' + response.status);
          }
          return response.json();
        })
        .then(function () {
          showStatus('Contribution envoyée au serveur de collecte.', 'success');
        })
        .catch(function () {
          showStatus('La contribution est préparée localement, mais l’envoi serveur a échoué. Vérifiez l’URL de collecte.', 'warning');
        });
    }, 0);
  });
})();
