export const slideUp = {
  initial: {
    y: '100%'
  },
  open: i => ({
    y: '0%',
    transition: { duration: 1, delay: 0.1 * i }
  }),
  closed: {
    y: '100%',
    transition: { duration: 0.5 }
  }
}

export const slideRight = {
  initial: {
    x: '-100%'
  },
  open: i => ({
    x: '0%',
    transition: { duration: 1, delay: 0.1 * i }
  }),
  closed: {
    x: '-100%',
    transition: { duration: 0.5 }
  }
}

export const slideLeft = {
  initial: {
    x: '100%'
  },
  open: i => ({
    x: '0%',
    transition: { duration: 1, delay: 0.1 * i }
  }),
  closed: {
    x: '100%',
    transition: { duration: 0.5 }
  }
}

export const opacity = {
  initial: {
    opacity: 0
  },
  open: {
    opacity: 1,
    transition: { duration: 0.5 }
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.5 }
  }
}
