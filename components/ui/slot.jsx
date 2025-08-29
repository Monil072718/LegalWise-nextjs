"use client"

import * as React from "react"

const Slot = React.forwardRef(({ children, ...props }, ref) => {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ...children.props,
      ref,
    })
  }

  if (React.Children.count(children) > 1) {
    React.Children.only(null)
  }

  return null
})

Slot.displayName = "Slot"

export { Slot }
