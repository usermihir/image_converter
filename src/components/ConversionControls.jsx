import React from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Slider, Button, CircularProgress } from '@mui/material';
import ConvertIcon from '@mui/icons-material/Cached';

const ConversionControls = ({ 
  targetFormat, 
  setTargetFormat, 
  quality, 
  setQuality, 
  onConvert, 
  isProcessing 
}) => {
  const formats = [
    { value: 'png', label: 'PNG' },
    { value: 'jpeg', label: 'JPG' },
    { value: 'webp', label: 'WebP' }
  ];

  return (
    <Box>
      <Typography variant="h6" component="h2" gutterBottom>
        Conversion Options
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="format-select-label">Target Format</InputLabel>
          <Select
            labelId="format-select-label"
            id="format-select"
            value={targetFormat}
            label="Target Format"
            onChange={(e) => setTargetFormat(e.target.value)}
            disabled={isProcessing}
            aria-label="Select target format"
          >
            {formats.map((format) => (
              <MenuItem key={format.value} value={format.value}>
                {format.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Box sx={{ width: '100%' }}>
          <Typography id="quality-slider-label" gutterBottom>
            Quality: {quality}%
          </Typography>
          <Slider
            aria-labelledby="quality-slider-label"
            value={quality}
            onChange={(_, newValue) => setQuality(newValue)}
            disabled={isProcessing || targetFormat === 'png'}
            min={1}
            max={100}
            valueLabelDisplay="auto"
            aria-label="Adjust image quality"
          />
        </Box>
      </Box>
      
      <Button
        variant="contained"
        color="primary"
        startIcon={isProcessing ? <CircularProgress size={24} color="inherit" /> : <ConvertIcon />}
        onClick={onConvert}
        disabled={isProcessing}
        fullWidth
        aria-label="Convert image"
      >
        {isProcessing ? 'Converting...' : 'Convert Image'}
      </Button>
    </Box>
  );
};

export default ConversionControls;