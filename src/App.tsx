import Button from './components/Button';
import { IoCard } from 'react-icons/io5';

const App = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black py-8">
      <Button color="red" icon={<IoCard size={24} />}>
        1-Click Buy
      </Button>
    </div>
  );
};

export default App;
