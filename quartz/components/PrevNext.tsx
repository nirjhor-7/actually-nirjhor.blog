import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"

type BrowsableFile = {
  slug: string
  title: string
  sortKey: number
}

const EXCLUDED_SLUGS = new Set(["index", "All-Notes", "404"])

function getSortKey(file: any): number {
  const dates = file?.dates
  const candidate = dates?.modified ?? dates?.published ?? dates?.created
  if (candidate instanceof Date) return candidate.getTime()
  if (typeof candidate === "string" || typeof candidate === "number") {
    const parsed = new Date(candidate).getTime()
    return Number.isNaN(parsed) ? 0 : parsed
  }
  return 0
}

function buildBrowsableList(allFiles: any[]): BrowsableFile[] {
  return allFiles
    .filter((file) => {
      const slug = file?.slug
      const title = file?.frontmatter?.title
      if (!slug || !title) return false
      if (EXCLUDED_SLUGS.has(slug)) return false
      if (String(slug).startsWith("tags/")) return false
      return true
    })
    .map((file) => ({
      slug: file.slug as string,
      title: file.frontmatter.title as string,
      sortKey: getSortKey(file),
    }))
    .sort((a, b) => b.sortKey - a.sortKey || a.title.localeCompare(b.title))
}

const PrevNext: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  const currentSlug = fileData.slug
  if (!currentSlug || EXCLUDED_SLUGS.has(currentSlug) || currentSlug.startsWith("tags/")) {
    return null
  }

  const notes = buildBrowsableList(allFiles as any[])
  const currentIndex = notes.findIndex((note) => note.slug === currentSlug)
  if (currentIndex === -1) return null

  const newer = currentIndex > 0 ? notes[currentIndex - 1] : null
  const older = currentIndex < notes.length - 1 ? notes[currentIndex + 1] : null
  if (!newer && !older) return null

  return (
    <nav class="prev-next-nav" aria-label="Note navigation">
      {newer ? (
        <a class="internal prev-link" href={resolveRelative(currentSlug, newer.slug)}>
          ← {newer.title}
        </a>
      ) : (
        <span />
      )}
      {older ? (
        <a class="internal next-link" href={resolveRelative(currentSlug, older.slug)}>
          {older.title} →
        </a>
      ) : (
        <span />
      )}
    </nav>
  )
}

PrevNext.css = `
.prev-next-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  margin-top: 2rem;
}

.prev-next-nav > span {
  min-height: 1px;
}

.prev-next-nav > a {
  display: block;
  text-decoration: none;
  line-height: 1.4;
  color: var(--ui-link, var(--secondary));
  opacity: 0.95;
}

.prev-next-nav > a:hover {
  opacity: 1;
}

.prev-next-nav > .next-link {
  text-align: right;
}

@media all and (max-width: 800px) {
  .prev-next-nav {
    grid-template-columns: 1fr;
    gap: 0.45rem;
  }

  .prev-next-nav > .next-link {
    text-align: left;
  }
}
`

export default (() => PrevNext) satisfies QuartzComponentConstructor
