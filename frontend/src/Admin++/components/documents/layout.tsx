import { AppBar, Toolbar, Typography, Container, CssBaseline } from '@mui/material'
import { Description } from '@mui/icons-material'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CssBaseline />
      <AppBar 
        position="static" 
        elevation={0} 
        sx={{ backgroundColor: 'lightgreen' }} // Set background color to light green
      >
        <Toolbar>
          <Description sx={{ mr: 2 }} />
          <Typography variant="h6" color="#inherit" noWrap>
            User Documents
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </>
  )
}
