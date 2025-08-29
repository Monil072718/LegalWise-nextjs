/**
 * Simple implementation of clsx
 * Combines multiple class names into a single string
 */
export function clsx(...args) {
  return args.flat().filter(Boolean).join(" ").trim()
}
