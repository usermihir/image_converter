import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const ImagePreview = ({ image, convertedImage }) => {
  const createPreviewUrl = (file) => {
    if (typeof file === 'string') return file;
    return file ? URL.createObjectURL(file) : null;
  };

  const originalUrl = createPreviewUrl(image);
  const convertedUrl = convertedImage ? convertedImage.url : null;

  return (
    <Box>
      <Typography variant="h6" component="h2" gutterBottom>
        Image Preview
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={convertedUrl ? 6 : 12}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 1, 
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant="subtitle1" gutterBottom align="center">
              Original Image
            </Typography>
            <Box 
              sx={{ 
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
              }}
            >
              {originalUrl && (
                <img 
                  src={originalUrl} 
                  alt="Original" 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '300px',
                    objectFit: 'contain'
                  }}
                />
              )}
            </Box>
            {image && (
              <Typography variant="caption" align="center" sx={{ mt: 1 }}>
                {image.name} ({(image.size / 1024).toFixed(2)} KB)
              </Typography>
            )}
          </Paper>
        </Grid>
        
        {convertedUrl && (
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 1, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="subtitle1" gutterBottom align="center">
                Converted Image ({convertedImage.format.toUpperCase()})
              </Typography>
              <Box 
                sx={{ 
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden'
                }}
              >
                <img 
                  src={convertedUrl} 
                  alt="Converted" 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '300px',
                    objectFit: 'contain'
                  }}
                />
              </Box>
              {convertedImage && convertedImage.blob && (
                <Typography variant="caption" align="center" sx={{ mt: 1 }}>
                  {convertedImage.name} ({(convertedImage.blob.size / 1024).toFixed(2)} KB)
                </Typography>
              )}
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ImagePreview;