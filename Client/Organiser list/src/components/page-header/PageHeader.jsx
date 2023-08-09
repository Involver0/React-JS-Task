import { Stack, Typography, Button } from '@mui/material';

const PageHeader = ({ title, children }) => {
  return (
    <Stack my={2} direction='row' justifyContent='space-between'>
      <Typography variant='h4'>{title}</Typography>
      <Stack>{children}</Stack>
    </Stack>
  );
};
export default PageHeader;
