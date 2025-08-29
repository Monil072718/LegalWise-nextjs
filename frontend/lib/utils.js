// Simple utility function to replace class-variance-authority
function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

export { cn }
