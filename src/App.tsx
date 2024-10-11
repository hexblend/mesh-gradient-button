import Button from './components/Button';
import { IoCard } from 'react-icons/io5';

const App = () => {
  return (
    <div className="h-screen w-screen bg-black py-8 text-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <Button color="silver" icon={<IoCard size={24} />}>
          1-Click Buy
        </Button>
        <Button color="gold">1-Click Buy</Button>
        <Button color="green">1-Click Buy</Button>
        <Button color="magenta">1-Click Buy</Button>
        <Button color="red">1-Click Buy</Button>
      </div>
    </div>
  );
};

export default App;
