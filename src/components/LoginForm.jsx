import { Box, Button, Container, Typography, Paper, TextField } from '@mui/material';
import { GitHub as GitHubIcon, Google as GoogleIcon } from '@mui/icons-material';

const LoginForm = ({ onLogin }) => {
  const handleGithubLogin = () => {
    // TODO: Implement GitHub login
    console.log('GitHub login clicked');
    onLogin();
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
    console.log('Google login clicked');
    onLogin();
  };

  const handleRoomCodeSubmit = () => {
    // TODO: Implement room code submission
    console.log('Room code submitted');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom>
            Welcome to your Agile Plan
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Sign in with your social account
          </Typography>
          <Box sx={{ width: '100%', gap: 2, display: 'flex', flexDirection: 'column' }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<GitHubIcon />}
              onClick={handleGithubLogin}
              sx={{
                backgroundColor: '#24292e',
                '&:hover': {
                  backgroundColor: '#2c3238',
                },
              }}
            >
              Continue with GitHub
            </Button>
            <Button
              fullWidth
              variant="contained"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              sx={{
                backgroundColor: '#4285f4',
                '&:hover': {
                  backgroundColor: '#357ae8',
                },
              }}
            >
              Continue with Google
            </Button>
            <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Don't want to log in and have a room code? Enter it in the field below
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <TextField
                  size="small"
                  placeholder="Enter room code"
                  fullWidth
                />
                <Button
                  variant="contained"
                  onClick={handleRoomCodeSubmit}
                  sx={{ minWidth: '100px' }}
                >
                  Enter
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginForm;