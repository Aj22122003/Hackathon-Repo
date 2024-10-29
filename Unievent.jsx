import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import { events_abi } from '../helpers/abi';
import { Card, Button } from '@nextui-org/react';

const EventDetails = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [connected, setConnected] = useState(false);

  const connectWallet = async (event) => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setProvider(provider);
      setSigner(signer);
      setConnected(true);
    }
  };

  const register = async () => {
    const address = eventData.contractAddress;

    const singleTicketPrice = eventData.price;

    //Now we have address and ABI of contract hence we can interact with it
    const contract = new ethers.Contract(address, events_abi, signer);
    try {
      console.log(`Starting to enroll to event ${address}...`);

      const transactionResponse = await contract.enroll(1, {
        value: rupeesToWei(parseInt(singleTicketPrice)),
      });

      const receipt = await transactionResponse.wait(1);
      console.log(`The transaction is successful with ${receipt}`);
    } catch (e) {
      console.log(e);
    }
  };

  const rupeesToWei = (rupees) => {
    const ethPerRupee = 0.0000045; // The exchange rate in number format
    // const weiValuePerRupee = BigInt(ethPerRupee * 1e18);
    const weiValuePerRupee = ethPerRupee * 1e18;
    console.log(weiValuePerRupee);

    const weiValue = weiValuePerRupee * rupees;
    console.log(weiValue);

    return weiValue;
  };

  // const getCurrentNoOfAttendees = async() => { //Run only once user connects
  //     const address = eventData.contractAddress;
  //     const contract = new ethers.Contract(address, events_abi, signer);
  //     try{
  //         const transactionResponse = await contract.getNoOfTicketsSold();
  //         const receipt = await transactionResponse.wait(1);

  //         console.log(transactionResponse);

  //     } catch(e){
  //         console.log(e);
  //     }
  // }

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/event/${id}`);
        setEventData(response.data);
      } catch (err) {
        setError(
          err.response ? err.response.data.message : 'Error fetching event data'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
    console.log(eventData);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#232323] justify-center gap-5 items-center">
      <h1 className="text-primary text-8xl font-bold">{eventData.eventName}</h1>
      <Card className="w-3/5 p-5">
        <strong className="text-text">Description</strong>{' '}
        {eventData.eventDescription}
      </Card>
      <Card className="grid grid-cols-2 grid-rows-3 w-3/5 p-6 gap-3">
        <p className="text-center">
          <strong>Date:</strong>{' '}
          {new Date(eventData.eventDate).toLocaleDateString()}
        </p>
        <p className="text-center">
          <strong>Time:</strong> {eventData.eventTime}
        </p>
        <p className="text-center">
          <strong>Venue:</strong> {eventData.venue}
        </p>
        <p className="text-center">
          <strong>Capacity:</strong> {eventData.capacity}
        </p>
        <p className="col-span-2 text-center">
          Price: ${eventData.price.toFixed(2)}
        </p>
      </Card>

      <Button onClick={connectWallet}>
        {' '}
        {connected ? 'CONNECTED' : 'CONNECT WALLET'}
      </Button>
      {/* ULTRA PRECIOUS BUTTON */}
      <Button
        type="button"
        disabled={!connected}
        onClick={register}
        className="bg-blue"
        variant="ghost"
        color="primary"
      >
        {' '}
        Enter event{' '}
      </Button>
      {/* ULTRA PRECIOUS BUTTON */}
      {/* <button onClick={getCurrentNoOfAttendees}>NO.OF ATTENDEES SO FAR</button> */}
    </div>
  );
};

export default EventDeta
