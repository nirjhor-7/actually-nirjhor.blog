import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { Date, getDate } from "./Date"

const EXCLUDED_SLUGS = new Set(["index", "All-Notes", "404"])

const AllNotesTimeline: QuartzComponent = ({ fileData, allFiles, cfg }: QuartzComponentProps) => {
  const isAllNotes = fileData.frontmatter?.title === "All wonderings"
  if (!isAllNotes) return null

  const notes = [...allFiles]
    .filter((file) => {
      const slug = file.slug
      if (!slug || EXCLUDED_SLUGS.has(slug) || slug.startsWith("tags/")) return false
      return !!file.frontmatter?.title
    })
    .sort((a, b) => {
      const aDate = a.dates ? getDate(cfg, a)!.getTime() : 0
      const bDate = b.dates ? getDate(cfg, b)!.getTime() : 0
      if (aDate !== bDate) return bDate - aDate
      return (a.frontmatter?.title ?? "").localeCompare(b.frontmatter?.title ?? "", undefined, {
        numeric: true,
        sensitivity: "base",
      })
    })

  return (
    <section class="all-notes-timeline">
      <ul class="timeline-ul">
        {notes.map((note) => (
          <li class="timeline-li">
            <a href={resolveRelative(fileData.slug!, note.slug!)} class="internal">
              {note.frontmatter?.title}
            </a>
            {note.dates && (
              <span class="timeline-date">
                <Date date={getDate(cfg, note)!} locale={cfg.locale} />
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

AllNotesTimeline.css = `
.all-notes-timeline .timeline-ul {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
}

.all-notes-timeline .timeline-li {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.3rem 0;
}

.all-notes-timeline .timeline-li > a {
  text-decoration: none;
}

.all-notes-timeline .timeline-date {
  opacity: 0.7;
  white-space: nowrap;
  font-size: 0.92rem;
}

@media all and (max-width: 800px) {
  .all-notes-timeline .timeline-li {
    flex-direction: column;
    gap: 0.1rem;
    align-items: flex-start;
  }
}
`

export default (() => AllNotesTimeline) satisfies QuartzComponentConstructor
