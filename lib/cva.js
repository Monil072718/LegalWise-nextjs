// Simple class-variance-authority alternative
export function cva(base, config = {}) {
  return (props = {}) => {
    let classes = base || ""

    if (config.variants) {
      Object.keys(config.variants).forEach((key) => {
        const variantValue = props[key]
        if (variantValue && config.variants[key][variantValue]) {
          classes += " " + config.variants[key][variantValue]
        }
      })
    }

    if (config.defaultVariants) {
      Object.keys(config.defaultVariants).forEach((key) => {
        if (props[key] === undefined) {
          const defaultValue = config.defaultVariants[key]
          if (config.variants[key] && config.variants[key][defaultValue]) {
            classes += " " + config.variants[key][defaultValue]
          }
        }
      })
    }

    if (props.className) {
      classes += " " + props.className
    }

    return classes.trim()
  }
}
