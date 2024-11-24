import React, { useState } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Rating,
  Avatar,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const FormCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: '2rem auto',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
}));

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const ImageUploadBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const TestimonialForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    testimonial: '',
    rating: 5,
  });
  
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (formData.testimonial.trim().length < 20) {
      newErrors.testimonial = 'Testimonial must be at least 20 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        setSnackbarMessage('File size should be less than 5MB');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setAvatar(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
    setAvatarPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSnackbarMessage('Please fill in all required fields correctly');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      const result = await onSubmit(formData, avatar);
      
      if (result.success) {
        setSnackbarMessage(result.message);
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        
        // Reset form
        setFormData({
          name: '',
          role: '',
          company: '',
          testimonial: '',
          rating: 5,
        });
        setAvatar(null);
        setAvatarPreview(null);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setSnackbarMessage(error.message || 'Failed to submit testimonial. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };
  
  return (
    <FormCard>
      <Typography variant="h4" component="h2" gutterBottom>
        Share Your Experience
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        We'd love to hear about your experience at the React Summit!
      </Typography>
      
      <StyledForm onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          error={!!errors.name}
          helperText={errors.name}
          required
          fullWidth
        />
        
        <TextField
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          error={!!errors.role}
          helperText={errors.role}
          required
          fullWidth
        />
        
        <TextField
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          error={!!errors.company}
          helperText={errors.company}
          required
          fullWidth
        />
        
        <Box>
          <Typography component="legend">Rate your experience</Typography>
          <Rating
            name="rating"
            value={formData.rating}
            onChange={(_, newValue) => {
              setFormData(prev => ({ ...prev, rating: newValue }));
            }}
            size="large"
          />
        </Box>
        
        <TextField
          label="Your Testimonial"
          name="testimonial"
          value={formData.testimonial}
          onChange={handleInputChange}
          error={!!errors.testimonial}
          helperText={errors.testimonial}
          required
          multiline
          rows={4}
          fullWidth
        />
        
        <ImageUploadBox>
          {avatarPreview ? (
            <>
              <Avatar
                src={avatarPreview}
                sx={{ width: 100, height: 100 }}
              />
              <Button
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleRemoveAvatar}
              >
                Remove
              </Button>
            </>
          ) : (
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
            >
              Upload Photo
              <VisuallyHiddenInput
                type="file"
                onChange={handleAvatarChange}
                accept="image/*"
              />
            </Button>
          )}
        </ImageUploadBox>

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Submit Testimonial'
          )}
        </Button>
      </StyledForm>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </FormCard>
  );
};

export default TestimonialForm;