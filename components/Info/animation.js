export const slideUp = {
  initial: {
    x: '100%'
  },
  open: i => ({
    x: '0%',
    transition: { duration: 3, delay: 1 }
  }),
  closed: {
    x: '100%',
    transition: { duration: 0.5 }
  }
}
