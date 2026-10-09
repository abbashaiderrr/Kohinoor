const money = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });
const amountRange = document.querySelector('#amount-range');
const rateRange = document.querySelector('#rate-range');
const tenureRange = document.querySelector('#tenure-range');

function updateCalculator() {
  const principal = Number(amountRange.value);
  const annualRate = Number(rateRange.value);
  const months = Number(tenureRange.value);
  const monthlyRate = annualRate / 1200;
  const emi = monthlyRate === 0
    ? principal / months
    : principal * monthlyRate * (1 + monthlyRate) ** months / ((1 + monthlyRate) ** months - 1);
  const total = emi * months;
  document.querySelector('#amount-label').textContent = `₹ ${money.format(principal)}`;
  document.querySelector('#rate-label').textContent = `${Number.isInteger(annualRate) ? annualRate : annualRate.toFixed(2).replace(/0$/, '')}%`;
  document.querySelector('#tenure-label').textContent = months < 12 ? `${months} months` : `${months / 12} ${months === 12 ? 'year' : 'years'}`;
  document.querySelector('#emi-result').textContent = `₹ ${money.format(Math.round(emi))}`;
  document.querySelector('#principal-result').textContent = `₹ ${money.format(principal)}`;
  document.querySelector('#interest-result').textContent = `₹ ${money.format(Math.round(total - principal))}`;
  document.querySelector('#total-result').textContent = `₹ ${money.format(Math.round(total))}`;
  [amountRange, rateRange, tenureRange].forEach((input) => {
    const progress = ((Number(input.value) - Number(input.min)) / (Number(input.max) - Number(input.min))) * 100;
    input.style.setProperty('--progress', `${progress}%`);
  });
}
[amountRange, rateRange, tenureRange].forEach((input) => input.addEventListener('input', updateCalculator));
updateCalculator();

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  mainNav.classList.toggle('open', !isOpen);
});
mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
  mainNav.classList.remove('open');
}));

document.querySelector('#property-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const intent = document.querySelector('input[name="property-intent"]:checked').value;
  const area = document.querySelector('#area-input').value.trim() || 'Not specified';
  const budget = document.querySelector('#budget-select').value;
  const message = `Hello KOHINOOR, I am looking to ${intent.toLowerCase()} in Lucknow. Preferred area: ${area}. Approximate budget: ${budget}. Please get in touch.`;
  window.open(`https://wa.me/917355099969?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

document.querySelector('#year').textContent = new Date().getFullYear();
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
