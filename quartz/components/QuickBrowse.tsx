import { QuartzComponent, QuartzComponentConstructor } from "./types"

const QuickBrowse: QuartzComponent = () => {
  return (
    <button type="button" class="quick-browse-top" aria-label="Back to top">
      ↑
    </button>
  )
}

QuickBrowse.css = `
.quick-browse-top {
  position: fixed;
  right: 1.1rem;
  bottom: 1.1rem;
  z-index: 1000;
  width: 2.2rem;
  height: 2.2rem;
  border: 1px solid var(--ui-search-border, rgba(134, 156, 193, 0.22));
  background: rgba(9, 14, 24, 0.72);
  color: var(--ui-link, var(--secondary));
  font-size: 1.1rem;
  line-height: 1;
  display: grid;
  place-items: center;
  cursor: pointer;
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
  transition: opacity 180ms ease, transform 180ms ease, background-color 180ms ease;
}

.quick-browse-top.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.quick-browse-top:hover {
  background: rgba(71, 99, 144, 0.2);
}

@media all and (max-width: 800px) {
  .quick-browse-top {
    right: 0.8rem;
    bottom: 0.8rem;
  }
}
`

QuickBrowse.afterDOMLoaded = `
document.addEventListener("nav", () => {
  const topButton = document.querySelector(".quick-browse-top")
  if (!(topButton instanceof HTMLButtonElement)) return

  const updateVisibility = () => {
    topButton.classList.toggle("visible", window.scrollY > 420)
  }

  const onClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const onKeyDown = (event) => {
    const target = event.target
    const inInput =
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      (target instanceof HTMLElement && target.isContentEditable)
    if (inInput) return

    if (event.key === "t" || event.key === "T") {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    if (event.key === "/") {
      const searchInput = document.querySelector(".search .search-bar")
      if (searchInput instanceof HTMLInputElement) {
        event.preventDefault()
        searchInput.focus()
      }
    }
  }

  updateVisibility()
  window.addEventListener("scroll", updateVisibility, { passive: true })
  topButton.addEventListener("click", onClick)
  document.addEventListener("keydown", onKeyDown)

  window.addCleanup(() => window.removeEventListener("scroll", updateVisibility))
  window.addCleanup(() => topButton.removeEventListener("click", onClick))
  window.addCleanup(() => document.removeEventListener("keydown", onKeyDown))
})
`

export default (() => QuickBrowse) satisfies QuartzComponentConstructor
