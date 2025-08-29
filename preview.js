<script>
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".preview-img");
  const defaultContent = document.querySelector(".default-content");
  const links = document.querySelectorAll(".menu a");
  let currentTimeout;

  const showPreview = (url) => {
    if (!container) return;
    clearTimeout(currentTimeout);
    
    // Hide default content
    if (defaultContent) {
      defaultContent.classList.add('hidden');
    }
    
    // Show preview image
    container.style.backgroundImage = `url('${url}')`;
    container.style.opacity = 1;
    container.style.transform = 'scale(1)';
    container.classList.add('active');
  };
  
  const hidePreview = () => {
    if (!container) return;
    currentTimeout = setTimeout(() => {
      // Hide preview image
      container.style.opacity = 0;
      container.style.transform = 'scale(0.95)';
      container.classList.remove('active');
      
      // Show default content
      if (defaultContent) {
        defaultContent.classList.remove('hidden');
      }
    }, 100);
  };

  links.forEach(link => {
    const url = link.getAttribute("data-preview");
    link.addEventListener("mouseenter", () => url && showPreview(url));
    link.addEventListener("focus",     () => url && showPreview(url));
    link.addEventListener("mouseleave", hidePreview);
    link.addEventListener("blur",       hidePreview);
  });

  // Default content is visible by default, no need to show first image
});
</script>
