import React, { useState } from 'react';
import { Box, Container, Typography, Paper, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ImageUploader from './components/ImageUploader';
import ConversionControls from './components/ConversionControls';
import ImagePreview from './components/ImagePreview';
import DownloadButton from './components/DownloadButton';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  const [image, setImage] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const [targetFormat, setTargetFormat] = useState('png');
  const [quality, setQuality] = useState(90);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (file) => {
    setImage(file);
    setConvertedImage(null);
    setError(null);
  };

  const handleConvert = async () => {
    if (!image) return;

    setIsProcessing(true);
    setError(null);
    
    try {
      // Create a canvas element to process the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Create an image object to draw on canvas
      const img = new Image();
      img.onload = () => {
        // Set canvas dimensions to match image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image on canvas
        ctx.drawImage(img, 0, 0);
        
        // Convert canvas to blob with specified format and quality
        canvas.toBlob((blob) => {
          if (blob) {
            // Create a URL for the blob
            const url = URL.createObjectURL(blob);
            setConvertedImage({
              url,
              blob,
              format: targetFormat,
              name: `converted.${targetFormat}`
            });
            setIsProcessing(false);
          } else {
            throw new Error('Failed to convert image');
          }
        }, `image/${targetFormat}`, quality / 100);
      };
      
      img.onerror = () => {
        throw new Error('Failed to load image');
      };
      
      // Set the source of the image to the uploaded file
      img.src = URL.createObjectURL(image);
      
    } catch (err) {
      setError(err.message || 'An error occurred during conversion');
      setIsProcessing(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Image Format Converter
          </Typography>
          
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <ImageUploader onImageUpload={handleImageUpload} />
          </Paper>
          
          {image && (
            <>
              <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <ImagePreview 
                  image={image} 
                  convertedImage={convertedImage}
                />
              </Paper>
              
              <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <ConversionControls 
                  targetFormat={targetFormat}
                  setTargetFormat={setTargetFormat}
                  quality={quality}
                  setQuality={setQuality}
                  onConvert={handleConvert}
                  isProcessing={isProcessing}
                />
              </Paper>
              
              {convertedImage && (
                <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                  <DownloadButton convertedImage={convertedImage} />
                </Paper>
              )}
            </>
          )}
          
          {error && (
            <Paper elevation={3} sx={{ p: 2, mb: 3, bgcolor: 'error.light' }}>
              <Typography color="error">{error}</Typography>
            </Paper>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;