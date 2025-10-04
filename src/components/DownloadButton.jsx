import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const DownloadButton = ({ convertedImage }) => {
  const handleDownload = () => {
    if (!convertedImage || !convertedImage.url) return;
    
    // Create a download link
    const link = document.createElement('a');
    link.href = convertedImage.url;
    
    // Generate filename with original name if available
    const filename = `converted.${convertedImage.format}`;
    link.download = filename;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Download Converted Image
      </Typography>
      
      <Button
        variant="contained"
        color="success"
        startIcon={<DownloadIcon />}
        onClick={handleDownload}
        size="large"
        aria-label="Download converted image"
      >
        Download {convertedImage?.format.toUpperCase()}
      </Button>
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Click the button above to download your converted image
      </Typography>
    </Box>
  );
};

export default DownloadButton;