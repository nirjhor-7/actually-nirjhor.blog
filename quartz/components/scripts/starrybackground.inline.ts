const STARRY_OPACITY_DARK = "0.4";

const onThemeChange = (e: CustomEventMap["themechange"]) => {
  const container = document.getElementById("starry-background");
  if (container) {
    container.style.opacity = e.detail.theme === "dark" ? STARRY_OPACITY_DARK : "0";
  }
};

document.addEventListener("nav", () => {
  const container = document.getElementById("starry-background");
  if (!container) return;

  // Only generate the stars if they haven't been generated yet
  if (container.children.length === 0) {
    const numberOfStars = 100;
    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement("div");
      star.classList.add("star");

      const size = Math.random() * 3 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDuration = `${Math.random() * 2 + 1}s`;

      container.appendChild(star);
    }
  }

  // Sync visibility with current theme
  const isDark = document.documentElement.getAttribute("saved-theme") === "dark";
  container.style.opacity = isDark ? STARRY_OPACITY_DARK : "0";

  // Register theme toggle listener after addCleanup is available (same pattern as comments.inline.ts)
  document.addEventListener("themechange", onThemeChange);
  window.addCleanup(() => document.removeEventListener("themechange", onThemeChange));
});