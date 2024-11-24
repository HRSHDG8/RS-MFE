import React, { useState } from 'react';
import { Container, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const TestimonialSection = React.lazy(() => import('Testimonial/Section'));
const TestimonialForm = React.lazy(() => import('Testimonial/Form'));

const PageContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(8, 0),
}));

// Initial testimonials data
const initialTestimonials = [
  {
    id: 1,
    text: "The React Summit was an incredible experience! The depth of knowledge shared by the speakers was outstanding, and the networking opportunities were invaluable. I left with so many new insights and connections.",
    author: "Sarah Johnson",
    role: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5
  },
  {
    id: 2,
    text: "Best tech conference I've attended this year! The workshops were hands-on and practical, and I immediately implemented several new techniques in our production code.",
    author: "Michael Chen",
    role: "Lead Developer",
    company: "Innovation Labs",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 4.5
  }
];

const TestimonialContainer = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTestimonialSubmit = async (formData, avatar) => {
    setIsSubmitting(true);
    try {
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In a real application, you would:
      // 1. Upload the image to your storage service
      // 2. Get the image URL back
      // 3. Send all data to your backend
      // 4. Get the saved testimonial back with its ID

      // Create new testimonial object
      const newTestimonial = {
        id: Date.now(), // In real app, this would come from the backend
        text: formData.testimonial,
        author: formData.name,
        role: formData.role,
        company: formData.company,
        rating: formData.rating,
        avatar: avatar ? URL.createObjectURL(avatar) : 'https://i.pravatar.cc/150', // In real app, this would be the uploaded image URL
        date: new Date().toISOString()
      };

      // Add new testimonial to the beginning of the array
      setTestimonials(prevTestimonials => [newTestimonial, ...prevTestimonials]);

      return { success: true, message: 'Testimonial submitted successfully!' };
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      return { 
        success: false, 
        message: 'Failed to submit testimonial. Please try again.' 
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to delete a testimonial (optional, for admin purposes)
  const handleTestimonialDelete = (testimonialId) => {
    setTestimonials(prevTestimonials => 
      prevTestimonials.filter(testimonial => testimonial.id !== testimonialId)
    );
  };

  // Function to edit a testimonial (optional, for admin purposes)
  const handleTestimonialEdit = (testimonialId, updatedData) => {
    setTestimonials(prevTestimonials =>
      prevTestimonials.map(testimonial =>
        testimonial.id === testimonialId
          ? { ...testimonial, ...updatedData }
          : testimonial
      )
    );
  };

  return (
    <PageContainer maxWidth="lg">
      {/* Testimonials Display Section */}
      <TestimonialSection 
        testimonials={testimonials}
        onDelete={handleTestimonialDelete}  // Pass if you want to implement deletion
        onEdit={handleTestimonialEdit}      // Pass if you want to implement editing
      />

      <StyledDivider />

      {/* Testimonial Submission Form */}
      <TestimonialForm 
        onSubmit={handleTestimonialSubmit}
        isSubmitting={isSubmitting}
      />
    </PageContainer>
  );
};

export default TestimonialContainer;