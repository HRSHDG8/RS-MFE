import React from 'react';
import styled from '@emotion/styled';
import {  
  Button,
  Card,
  CardContent,
  Container,
  Grid2 as Grid,
  Typography,
  Box,
  Avatar,
} from '@mui/material';
import {
  CalendarToday,
  LocationOn,
  AccessTime,
  Person,
  Star,
} from '@mui/icons-material';
import TestimonialContainer from './Testimonials';


const Footer = React.lazy(() => import('Misc/Footer'));
// Emotion styled components
const HeroSection = styled.div`
  background: linear-gradient(45deg, #1a237e 30%, #283593 90%);
  padding: 100px 0;
  color: white;
`;

const SpeakerCard = styled(Card)`
  margin: 40px 0;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const HighlightTypography = styled(Typography)`
  color: #1a237e;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledAvatar = styled(Avatar)`
  width: 150px;
  height: 150px;
  margin-right: 24px;
`;

const SessionCard = styled(Card)`
  height: 100%;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
`;


const HomePage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Box textAlign="center">
            <Typography variant="h2" component="h1" gutterBottom>
              React Summit 2024
            </Typography>
            <Typography variant="h5" gutterBottom>
              The Biggest React Conference of the Year
            </Typography>
            <Box mt={4}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ mr: 2 }}
              >
                Get Tickets
              </Button>
              <Button variant="outlined" color="inherit" size="large">
                Learn More
              </Button>
            </Box>
          </Box>
        </Container>
      </HeroSection>

      {/* Featured Speaker Section */}
      <Container maxWidth="lg">
        <SpeakerCard elevation={3}>
          <CardContent>
            <Grid container alignItems="center">
              <Grid>
                <StyledAvatar>
                  <Person sx={{ fontSize: 64 }} />
                </StyledAvatar>
              </Grid>
              <Grid>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Star sx={{ color: '#ffc107' }} />
                  <Typography variant="subtitle1" color="primary">
                    Workshop by
                  </Typography>
                </Box>
                <Typography variant="h4" gutterBottom>
                  Harsh M
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Join our Harsh M as he shares insights on mcrofrontends with practical examples and how to do it right the React way
                </Typography>
                <Grid container spacing={3}>
                  <Grid>
                    <HighlightTypography>
                      <CalendarToday />
                      Nov 26, 2024
                    </HighlightTypography>
                  </Grid>
                  <Grid>
                    <HighlightTypography>
                      <AccessTime />
                      12:30 EST
                    </HighlightTypography>
                  </Grid>
                  <Grid>
                    <HighlightTypography>
                      <LocationOn />
                      Zoom
                    </HighlightTypography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </SpeakerCard>

        {/* Schedule Preview */}
        <Typography variant="h3" gutterBottom sx={{ mt: 8 }}>
          Conference Highlights
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "Advanced React Patterns",
              time: "11:30 AM",
              speaker: "Sarah Johnson"
            },
            {
              title: "State Management in 2024",
              time: "2:00 PM",
              speaker: "Michael Chen"
            },
            {
              title: "React Performance Workshop",
              time: "3:30 PM",
              speaker: "Emma Davis"
            }
          ].map((session, index) => (
            <Grid xs={12} md={4} key={index}>
              <SessionCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {session.title}
                  </Typography>
                  <HighlightTypography variant="body2" gutterBottom>
                    <AccessTime fontSize="small" />
                    {session.time}
                  </HighlightTypography>
                  <HighlightTypography variant="body2">
                    <Person fontSize="small" />
                    {session.speaker}
                  </HighlightTypography>
                  <Button
                    variant="text"
                    color="primary"
                    sx={{ mt: 2 }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </SessionCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <TestimonialContainer/>
      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default HomePage;