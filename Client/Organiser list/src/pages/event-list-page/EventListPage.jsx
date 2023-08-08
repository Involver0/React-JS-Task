import { Button, Typography } from '@mui/material';
import { StyledButtonWrapper, StyledWrapperDiv } from './EventListPage.styled';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchAttendees } from '../../api';

const EventListPage = () => {
  const [attendeeList, setAttendeeList] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const fetchAttendeeList = async () => {
    try {
      setisLoading(true);
      const { data } = await fetchAttendees();
      setAttendeeList(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    fetchAttendeeList();
  }, []);

  const { pathname } = useLocation();
  const routeData = () => {
    switch (pathname) {
      case '/attendees':
        return {
          title: 'Attendees list',
          button: 'Add attendee',
        };
      default:
        break;
    }
  };
  return (
    <StyledWrapperDiv>
      <Typography variant='h3'>{routeData().title}</Typography>
      <StyledButtonWrapper>
        <Button variant='contained' size='small'>
          {routeData().button}
        </Button>
      </StyledButtonWrapper>
    </StyledWrapperDiv>
  );
};

export default EventListPage;
