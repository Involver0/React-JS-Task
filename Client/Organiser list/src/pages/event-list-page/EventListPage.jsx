import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import {
  StyledButtonWrapper,
  StyledWrapperDiv,
  StyledCards,
} from './EventListPage.styled';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchAttendees } from '../../api';
import PageHeader from '../../components/page-header/PageHeader';

const EventListPage = () => {
  const [attendeeList, setAttendeeList] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const [isDialogOpen, setisDialogOpen] = useState(false);

  const fetchAttendeeList = async () => {
    try {
      setisLoading(true);
      const { data } = await fetchAttendees();
      setAttendeeList(data);
    } catch (err) {
      console.log(err);
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    fetchAttendeeList();
  }, []);

  const onDialogClose = () => setisDialogOpen(false);

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
      <StyledCards>
        <Typography variant='h3' align='center'>
          {isLoading && 'isLoading'}
        </Typography>
        <div>
          {attendeeList.map((attendee) => (
            <Card key={attendee.id} style={{ margin: '1rem' }}>
              <CardContent style={{ textAlign: 'center' }}>
                <Typography variant='h5'>
                  {attendee.first_name} {attendee.last_name}
                </Typography>
                <Typography variant='body1' textAlign={'center'}>
                  {attendee.email}
                </Typography>
                <Typography variant='body1' textAlign={'center'}>
                  {attendee.age}
                </Typography>
                <Button variant='contained' size='small' textAlign={'center'}>
                  delete attendee
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </StyledCards>
      <Dialog
        open={isDialogOpen}
        maxWidth='sm'
        fullWidth
        onClose={onDialogClose}
      >
        <DialogTitle>Add atendee</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button variant='outlined' size='small' onClick={onDialogClose}>
            Cancel
          </Button>
          <Button variant='contained' size='small'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EventListPage;
