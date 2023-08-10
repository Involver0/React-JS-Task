import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { StyledCardsWrapper } from './EventListPage.styled';
import { deleteAttendee, fetchAttendees } from '../../api';
import AddAttendeeDialog from '../../components/add-attendee-dialog/AddAttendeeDialog';

const EventListPage = () => {
  const [attendeeList, setAttendeeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAttendeeList = async () => {
    try {
      setIsLoading(true);
      const { data } = await fetchAttendees();
      setAttendeeList(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendeeList();
  }, []);

  const handleDeleteAttendee = async (id) => {
    try {
      const response = await deleteAttendee(id);
      console.log(response);
      // Update the attendeeList after successful deletion
      setAttendeeList(attendeeList.filter((attendee) => attendee.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AddAttendeeDialog onSave={(body) => console.log(body)} />
      <StyledCardsWrapper>
        <Typography variant='h3' align='center'>
          {isLoading && 'isLoading'}
        </Typography>

        {attendeeList.map((attendee) => (
          <Card key={attendee.id} style={{ margin: '1rem' }}>
            <CardContent style={{ textAlign: 'center' }}>
              <Typography variant='h6'>
                {attendee.first_name} {attendee.last_name}
              </Typography>
              <Typography variant='body1'>{attendee.email}</Typography>
              <Typography variant='body1'>{attendee.age}</Typography>
              <Button
                variant='contained'
                size='small'
                onClick={() => handleDeleteAttendee(attendee.id)} // Pass attendee.id to the function
              >
                delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </StyledCardsWrapper>
    </>
  );
};

export default EventListPage;
