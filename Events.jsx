import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../component/EventCard';
import { Card } from '@nextui-org/react';
function DataDisplay() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the Node.js backend
    axios
      .get('http://localhost:5000/getevents')
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="p-10 h-full bg-[#232323] text-text flex flex-col gap-4">
      <h1 className="text-text text-2xl ">Upcoming events</h1>
      <div className="grid grid-cols-3 grid-rows-auto h-full w-full gap-10">
        {data.map((event) => (
          <EventCard
            key={event._id}
            id={event._id}
            name={event.eventName}
            date={new Date(event.eventDate).toLocaleDateString()}
            price={event.price}
            loc={event.venue}
            maxAttendes={event.capacity}
          ></EventCard>
        ))}
        {/* <h1>All Events</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Event Location</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>
                <a href={`event/${item._id}`}>{item.eventName}</a>
              </td>
              <td>{item.eventDate}</td>
              <td>{item.eventvenue}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      </div>
    </div>
  );
}

export default DataDisplay;
