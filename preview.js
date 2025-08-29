<script>
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".preview-img");
  const links = document.querySelectorAll(".menu a");

  const show = (url) => {
    if (!container) return;
    container.style.backgroundImage = `url('${url}')`;
    container.style.opacity = 1;
  };
  const hide = () => {
    if (!container) return;
    container.style.opacity = 0;
  };

  links.forEach(link => {
    const url = link.getAttribute("data-preview");
    link.addEventListener("mouseenter", () => url && show(url));
    link.addEventListener("focus",     () => url && show(url));
    link.addEventListener("mouseleave", hide);
    link.addEventListener("blur",       hide);
  });
});
</script>
