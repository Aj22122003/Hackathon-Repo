import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Input, Button, Textarea, Card } from '@nextui-org/react';

const Host = () => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [venue, setVenue] = useState('');
  const [capacity, setCapacity] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      eventName,
      eventDescription,
      eventDate,
      eventTime,
      venue,
      capacity: parseInt(capacity),
      price: parseFloat(price),
    };

    try {
      setIsLoading(true);
      await axios.post('http://localhost:5000/host', newEvent);
      setIsLoading(false);

      // Clear form fields after submission
      navigate('/events');
      setEventName('');
      setEventDescription('');
      setEventDate('');
      setEventTime('');
      setVenue('');
      setCapacity('');
      setPrice('');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    }
  };

  return (
    <div className="h-full bg-[#232323] text-text flex flex-col justify-center items-center">
      <Card className="bg-background p-10 flex flex-col gap-3 items-center  ">
        <h2 className="text-2xl font-extrabold text-primary">
          Create New Event
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full grid grid-cols-2 grid-rows-auto gap-6 "
        >
          <div className="col-span-2">
            <label>Event Name:</label>
            <Input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col col-span-2">
            <label>Event Description:</label>
            <Textarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
            ></Textarea>
          </div>
          <div>
            <label>Event Date:</label>
            <Input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Event Time:</label>
            <Input
              type="time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              required
            />
          </div>
          <div className="col-span-2">
            <label>Venue:</label>
            <Input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Capacity:</label>
            <Input
              type="number"
              min={0}
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Price:</label>
            <Input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <Button
            className="col-span-2"
            variant="ghost"
            type="submit"
            color="primary"
            isLoading={isLoading}
          >
            Create Event
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Host;
