import React from 'react';
import { Card, Typography, Avatar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

// Styled components using emotion
const TestimonialCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: '2rem auto',
  padding: theme.spacing(4),
  position: 'relative',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const QuoteIcon = styled(FormatQuoteIcon)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  fontSize: '3rem',
  color: theme.palette.primary.light,
  opacity: 0.3,
}));

const TestimonialText = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  lineHeight: 1.6,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(3),
  paddingLeft: theme.spacing(6),
}));

const AuthorContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

const AuthorInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

const TestimonialCarousel = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  overflowX: 'auto',
  padding: theme.spacing(2),
  scrollSnapType: 'x mandatory',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  '-ms-overflow-style': 'none',
  'scrollbar-width': 'none',
}));

const testimonialData = [
  {
    id: 1,
    text: "The React Summit was an incredible experience! The depth of knowledge shared by the speakers was outstanding, and the networking opportunities were invaluable. I left with so many new insights and connections.",
    author: "Sarah Johnson",
    role: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    text: "Best tech conference I've attended this year! The workshops were hands-on and practical, and I immediately implemented several new techniques in our production code.",
    author: "Michael Chen",
    role: "Lead Developer",
    company: "Innovation Labs",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  // Add more testimonials as needed
];

const Testimonial = ({ text, author, role, company, avatar }) => (
  <TestimonialCard>
    <QuoteIcon />
    <TestimonialText variant="body1">
      {text}
    </TestimonialText>
    <AuthorContainer>
      <Avatar
        src={avatar}
        alt={author}
        sx={{ width: 64, height: 64 }}
      />
      <AuthorInfo>
        <Typography variant="h6" component="div">
          {author}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {role}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {company}
        </Typography>
      </AuthorInfo>
    </AuthorContainer>
  </TestimonialCard>
);

const TestimonialSection = ({ 
    testimonials, 
    onDelete, 
    onEdit 
  }) => (
    <Box sx={{ py: 8, px: 2, backgroundColor: 'background.default' }}>
      <Typography
        variant="h3"
        component="h2"
        align="center"
        sx={{ mb: 6, fontWeight: 'bold' }}
      >
        What Attendees Say
      </Typography>
      <TestimonialCarousel>
        {testimonials.map((testimonial) => (
          <Box
            key={testimonial.id}
            sx={{
              minWidth: { xs: '100%', md: '600px' },
              scrollSnapAlign: 'center',
            }}
          >
            <Testimonial 
              {...testimonial}
              onDelete={onDelete ? () => onDelete(testimonial.id) : undefined}
              onEdit={onEdit ? (updatedData) => onEdit(testimonial.id, updatedData) : undefined}
            />
          </Box>
        ))}
      </TestimonialCarousel>
    </Box>
  );
  
  export default TestimonialSection;