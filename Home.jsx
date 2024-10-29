import { today, getLocalTimeZone } from '@internationalized/date';
import { Calendar } from '@nextui-org/react';
import EventsTable from '../component/EventsTable';
import TransactionTable from '../component/TransactionTable';
import WalletAmountCard from '../component/WalletAmountCard';
const Home = () => {
  return (
    <div className="bg-[#232323] flex flex-col lg:grid gap-6 lg:grid-cols-3 lg:grid-rows-2 lg:px-12 py-12 h-fit w-screen lg:w-fit">
      <Calendar
        className="text-text flex flex-col items-center justify-center gap-2 bg-background w-full p-3 rounded-xl "
        topContent="Overview"
        defaultValue={today(getLocalTimeZone())}
        minValue={today(getLocalTimeZone())}
      />
      <WalletAmountCard></WalletAmountCard>
      <EventsTable></EventsTable>
      <div className="text-text col-span-3">
        <TransactionTable></TransactionTable>
      </div>
    </div>
  );
};

export default Home;
