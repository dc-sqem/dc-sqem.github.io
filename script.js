const copyButton = document.getElementById('copy-bib');

copyButton.addEventListener('click', async () => {
  const bibtex = document.getElementById('bibtex');
  let copied = false;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(bibtex.textContent);
      copied = true;
    }
  } catch { /* Try selecting the text instead. */ }

  if (!copied) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(bibtex);
    selection.removeAllRanges();
    selection.addRange(range);
    copied = document.execCommand('copy');
    if (copied) selection.removeAllRanges();
  }

  copyButton.textContent = copied ? 'Copied' : 'Select the text to copy';
  setTimeout(() => { copyButton.textContent = 'Copy BibTeX'; }, 2200);
});
