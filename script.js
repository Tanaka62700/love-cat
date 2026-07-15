const surpriseMessages = [
  "Today's surprise: rare cats may appear during moonlit nights.",
  "Today's surprise: hidden treasure chests appear after every rainy day.",
  "Today's surprise: a friendly festival arrives each weekend.",
  "Today's surprise: secret decorations unlock when you visit a new island."
];

const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseBox = document.getElementById('surpriseBox');

if (surpriseBtn && surpriseBox) {
  surpriseBtn.addEventListener('click', () => {
    const randomMessage = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
    surpriseBox.classList.remove('is-popping');
    void surpriseBox.offsetWidth;
    surpriseBox.textContent = randomMessage;
    surpriseBox.classList.add('is-popping');
  });
}

const sliderImageNames = [
  '01323699-35ab-4487-9b5c-441a41a59fcd.jpg',
  '067623ae-6fe7-452a-a963-4a5cae5c7369.jpg',
  '06a0a08e-bd0e-40bb-8379-9bc671d8cd3b.jpg',
  '071d94b5-dec2-4761-87e1-769cf1afec17.jpg',
  '0b32e039-7a17-4454-93e3-81ddfc8de835.jpg',
  '0bdae201-c98a-439c-b5d1-de3a8267e025.jpg',
  '0e4bab31-df8e-4b82-99fe-5d375349e9d2.jpg',
  '12f4341b-6cee-461b-9570-6e56f4f12864.jpg',
  '15b325c7-4474-4c40-bf5d-8abb464749ec.jpg',
  '15fd44df-29de-498d-8b61-6e4b0bde5849.jpg',
  '18b71da3-e70d-4ef0-9bf6-c254e6b861b5.jpg',
  '1c4d9994-8800-401b-a1b5-8aa9fd1a65d9.jpg',
  '1c69eb51-168b-4d55-8306-0e2c0c29807b.jpg',
  '1f98eed3-976e-4cff-b1ea-01648e48fa09.jpg',
  '23ed5c87-c1b0-47a9-a481-267188016fdd.jpg',
  '29308a43-bf06-450d-9331-2a22dc754d75.jpg',
  '2efc398f-6af4-4644-816b-36c0c72d0218.jpg',
  '35066cb4-c818-4b34-8c5e-23504ed10c7b.jpg',
  '36f23564-d07e-4aaf-aa40-c225425ac6f4.jpg',
  '36fb3257-073d-4eea-a69c-f8362bb4cb13.jpg',
  '38e84154-7fa7-4ac0-8548-901e8f58fb66.jpg',
  '3fe0ab5e-b507-4a9d-9205-198dd963acb6.jpg',
  '43060d2a-27c9-4764-a8d8-ce652cee8582.jpg',
  '5002ec68-a25e-44d6-8de7-da79e7a08af0.jpg',
  '50517617-d906-420b-82aa-90110957f8a0.jpg',
  '513b8f6c-af6a-4ec8-afcc-ecbdf3e80cd4.jpg',
  '5afae6a6-7c7f-4672-b4d6-ad8d3bd98fd7.jpg',
  '5cc42303-708e-4d0c-a83e-3b5bc71305e6.jpg',
  '662a43be-5f76-4359-ad1d-311848b01f69.jpg',
  '66e1f7d9-d6c3-4cc6-bb53-62cf76ef183f.jpg',
  '755c633f-bcec-446a-9640-fb5363b77bbc.jpg',
  '7be25070-e1e0-40ca-a5aa-3aa4ed34b80c.jpg',
  '7c87b323-a235-425d-aa91-9cfd7e9e9dfb.jpg',
  '82106fcb-28f6-4f1d-b3e9-93331e22b1b3.jpg',
  '829b05e8-e9f8-459d-8a36-eb9280f4adf7.jpg',
  '85f3b497-c163-4f9e-a1ff-c61307908f8e.jpg',
  '86141ff4-b693-44bf-a9ca-0a1145c94ee4.jpg',
  '864645e3-843d-40e2-afee-99fb13c1d116.jpg',
  '87dfe2b6-fd05-40ab-ab66-7cca87fa9d2f.jpg',
  '89adf499-dda4-4fc9-bd70-4f1e34259bf9.jpg',
  '8ea3b792-d3cb-4803-8b3a-4cccc1ce6cd0.jpg',
  '8f560f6d-1e5b-4f6a-b663-fc3a93449586.jpg',
  '8fd9f0f4-1f26-4c96-8068-14de49e9b865.jpg',
  '936bef9a-952e-46a2-a600-347652653f98.jpg',
  '9a6027be-4200-4810-b61a-c16013ed89d2.jpg',
  '9e4d22d8-0d32-48a3-bc02-52d32e2c8949.jpg',
  'a14758a0-d519-4155-8ec9-6424c6d705c6.jpg',
  'a3721150-ee01-4420-990e-3c29b9fe4303.jpg',
  'a4cde665-fe6f-4d4f-a91a-c2f2498f2a97.jpg',
  'a96afdaf-48bf-4c72-9daf-6a24a3b248ee.jpg'
];

const sliderTrack = document.getElementById('sliderTrack');
const sliderPrev = document.getElementById('sliderPrev');
const sliderNext = document.getElementById('sliderNext');
let currentSlideIndex = 0;
const visibleSlides = 5;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let sliderInterval;

function renderSlider() {
  if (!sliderTrack) return;
  sliderTrack.innerHTML = sliderImageNames
    .map((filename) => `
      <div class="slider-slide">
        <img src="public/image/${filename}" alt="LoveCat showcase image" />
      </div>
    `)
    .join('');
}

function updateSlider() {
  if (!sliderTrack) return;
  const maxIndex = Math.max(0, sliderImageNames.length - visibleSlides);
  currentSlideIndex = Math.min(Math.max(0, currentSlideIndex), maxIndex);
  sliderTrack.style.transform = `translateX(-${currentSlideIndex * (100 / visibleSlides)}%)`;
}

function startAutoSlider() {
  if (prefersReducedMotion || sliderInterval) return;
  sliderInterval = setInterval(() => {
    const maxIndex = Math.max(0, sliderImageNames.length - visibleSlides);
    currentSlideIndex = currentSlideIndex >= maxIndex ? 0 : currentSlideIndex + 1;
    updateSlider();
  }, 4200);
}

function stopAutoSlider() {
  clearInterval(sliderInterval);
  sliderInterval = null;
}

function setupScrollReveal() {
  const cards = document.querySelectorAll('.feature-card, .reason-card, .step-card, .panel-card, .timeline-card, .stack-item');
  cards.forEach((card, index) => {
    card.classList.add('animate-card');
    card.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
  });

  const elements = document.querySelectorAll('.animate-on-scroll, .animate-card');
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
}

setupScrollReveal();

if (sliderPrev && sliderNext && sliderTrack) {
  const sliderWrapper = sliderTrack.closest('.slider-wrapper');
  renderSlider();
  updateSlider();
  startAutoSlider();

  sliderPrev.addEventListener('click', () => {
    currentSlideIndex -= 1;
    updateSlider();
  });

  sliderNext.addEventListener('click', () => {
    currentSlideIndex += 1;
    updateSlider();
  });

  if (sliderWrapper) {
    sliderWrapper.addEventListener('mouseenter', stopAutoSlider);
    sliderWrapper.addEventListener('mouseleave', startAutoSlider);
  }
}
