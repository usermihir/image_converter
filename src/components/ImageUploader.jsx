import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Button, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ImageUploader = ({ onImageUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Only accept image files
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/webp': []
    },
    maxFiles: 1,
    multiple: false
  });

  const isFileRejected = fileRejections.length > 0;

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Upload Image
      </Typography>
      
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.400',
          borderRadius: 2,
          p: 3,
          mb: 2,
          cursor: 'pointer',
          bgcolor: isDragActive ? 'rgba(63, 81, 181, 0.08)' : 'background.paper',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'rgba(63, 81, 181, 0.04)'
          }
        }}
        role="button"
        aria-label="Upload image area"
      >
        <input {...getInputProps()} aria-label="Upload image input" />
        <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="body1" gutterBottom>
          {isDragActive
            ? 'Drop the image here...'
            : 'Drag & drop an image here, or click to select'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Supported formats: JPG, WebP
        </Typography>
      </Box>
      
      <Button 
        variant="contained" 
        component="label" 
        sx={{ mt: 1 }}
        aria-label="Browse files"
      >
        Browse Files
        <input
          type="file"
          hidden
          accept="image/jpeg,image/webp"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) onImageUpload(file);
          }}
        />
      </Button>
      
      {isFileRejected && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Please upload only JPG or WebP image files.
        </Alert>
      )}
    </Box>
  );
};

export default ImageUploader;