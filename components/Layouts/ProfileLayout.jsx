import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import React from 'react'

export default function ProfileLayout({
  children,
  maxWidth = 'xs',
  marginTop = undefined
}) {
  return (
    <div className="py-20">
      <Container maxWidth={maxWidth}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          className="rounded-xl bg-zinc-800 bg-opacity-95"
        >
          {children}
        </Box>
      </Container>
    </div>
  )
}
