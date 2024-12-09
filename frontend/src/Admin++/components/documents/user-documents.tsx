'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Box,
} from '@mui/material'
import { Person, Description, VerifiedUser } from '@mui/icons-material'

export default function UserDocuments() {
  const { id } = useParams<{ id: string }>()
  const [userData, setUserData] = useState<{
    userType: 'TourGuide' | 'Advertiser' | 'Seller';
    user: {
      _id: string;
      username?: string;
      Name?: string;
      Username?: string;
      idProof?: string;
      taxationRegistryCard?: string;
      certificates?: string[];
    };
    message: string;
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserDocuments = async () => {
      try {
        const response = await axios.get<{
          userType: 'TourGuide' | 'Advertiser' | 'Seller';
          user: {
            _id: string;
            username?: string;
            Name?: string;
            Username?: string;
            idProof?: string;
            taxationRegistryCard?: string;
            certificates?: string[];
          };
          message: string;
        }>(`/api/Admin/uploaded-documents-by-id/${id}`)
        setUserData(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch user documents.')
        setLoading(false)
      }
    }

    fetchUserDocuments()
  }, [id])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      </Container>
    )
  }

  if (!userData) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" align="center">
          No user data found.
        </Typography>
      </Container>
    )
  }

  const { userType, user, message } = userData

  const renderDocumentCard = (title: string, documentUrl: string | undefined) => (
    <Grid item xs={12} sm={6} md={4}>
      <Card elevation={3}>
        <CardMedia
          component="img"
          height="200"
          image={documentUrl || '/placeholder.svg?height=200&width=300'}
          alt={title}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
            <Button
            variant="contained"
            fullWidth
            href={documentUrl || '#'}
            target={documentUrl ? "_blank" : undefined}
            rel={documentUrl ? "noopener noreferrer" : undefined}
            disabled={!documentUrl}
            sx={{ 
                mt: 2, 
                backgroundColor: '#95e3bb', // Set background color to #95e3bb
                '&:hover': {
                backgroundColor: '#7bcfa2', // Optional: Set hover color
                }
            }}
            >
            View Document
            </Button>
        </CardContent>
      </Card>
    </Grid>
  )

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
          {userType} Documents
        </Typography>
        <Typography variant="h5" gutterBottom>
          {user.username || user.Name || user.Username}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {message}
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {renderDocumentCard('ID Proof', user.idProof)}
        {userType !== 'TourGuide' && renderDocumentCard('Taxation Registry Card', user.taxationRegistryCard)}
        {userType === 'TourGuide' &&
          user.certificates?.map((cert, index) => renderDocumentCard(`Certificate ${index + 1}`, cert))}
      </Grid>
    </Container>
  )
}

