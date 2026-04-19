// @ts-ignore
import starryScript from "./scripts/starrybackground.inline"
import styles from "./styles/starrybackground.scss"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

const StarryBackground: QuartzComponent = () => {
  return <div id="starry-background" />
}

StarryBackground.beforeDOMLoaded = starryScript
StarryBackground.css = styles

export default (() => StarryBackground) satisfies QuartzComponentConstructor
