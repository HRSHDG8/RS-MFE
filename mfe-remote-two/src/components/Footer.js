import React from 'react'
import styled from '@emotion/styled';
import {
  Button,
  Container,
  Typography,
} from '@mui/material';
import ShadowRoot from './ShadowRoot';

const StyledFooter = styled.footer`
  background-color: #f5f5f5;
  padding: 48px 0;
  margin-top: 64px;
  text-align: center;
`;

const Footer = () => {

  return (
      <ShadowRoot>
            <StyledFooter>
              <Container maxWidth="lg">
                <Typography variant="h6" gutterBottom>
                  Join us for the most exciting React conference of 2024
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Register Now
                </Button>
              </Container>
            </StyledFooter></ShadowRoot>
  )
}

export default Footer;
