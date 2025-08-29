<script>
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".preview-img");
  const links = document.querySelectorAll(".menu a");
  let currentTimeout;

  const show = (url) => {
    if (!container) return;
    clearTimeout(currentTimeout);
    container.style.backgroundImage = `url('${url}')`;
    container.style.opacity = 1;
    container.style.transform = 'scale(1)';
    container.classList.add('active');
  };
  
  const hide = () => {
    if (!container) return;
    currentTimeout = setTimeout(() => {
      container.style.opacity = 0;
      container.style.transform = 'scale(0.95)';
      container.classList.remove('active');
    }, 100);
  };

  links.forEach(link => {
    const url = link.getAttribute("data-preview");
    link.addEventListener("mouseenter", () => url && show(url));
    link.addEventListener("focus",     () => url && show(url));
    link.addEventListener("mouseleave", hide);
    link.addEventListener("blur",       hide);
  });

  // Show first image by default
  const firstLink = links[0];
  if (firstLink) {
    const firstUrl = firstLink.getAttribute("data-preview");
    if (firstUrl) {
      setTimeout(() => show(firstUrl), 300);
    }
  }
});
</script>
