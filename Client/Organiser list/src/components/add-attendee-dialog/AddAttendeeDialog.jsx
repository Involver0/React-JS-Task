import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import PageHeader from '../../components/page-header/PageHeader';
import { createAttendees } from '../../api';

const AddAttendeeDialog = () => {
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const onDialogClose = () => {
    setisDialogOpen(false);

    setFirstname('');
    setLastname('');
    setEmail('');
    setAge('');
  };

  const handleAddAttendee = async () => {
    try {
      setIsLoading(true);
      const response = await createAttendees({
        first_name: firstname,
        last_name: lastname,
        email: email,
        age: age,
        Organizers_id: 5,
      });
      console.log('Attendee added:', response);

      onDialogClose();
    } catch (err) {
      console.error('Error adding attendee:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader title='Attendee List'>
        <Button
          variant='contained'
          size='small'
          onClick={() => setisDialogOpen(true)}
        >
          Add attendee
        </Button>
      </PageHeader>
      <Dialog
        open={isDialogOpen}
        maxWidth='sm'
        fullWidth
        onClose={!isLoading ? onDialogClose : undefined}
      >
        <DialogTitle>Add attendee</DialogTitle>
        <DialogContent>
          <Stack pt={2} spacing={2}>
            <TextField
              fullWidth
              disabled={isLoading}
              label='First name'
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <TextField
              fullWidth
              disabled={isLoading}
              label='Last name'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <TextField
              fullWidth
              disabled={isLoading}
              label='Email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              disabled={isLoading}
              label='Age'
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            disabled={isLoading}
            size='small'
            onClick={onDialogClose}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            size='small'
            disabled={isLoading}
            onClick={handleAddAttendee}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddAttendeeDialog;
