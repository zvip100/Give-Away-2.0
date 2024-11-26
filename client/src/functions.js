export function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

 export function ChangePageTitle(title) {
    document.title = title;
  }