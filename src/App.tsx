import Button from './components/Button';

const App = () => {
  return (
    <div className="h-screen w-screen bg-black py-8 text-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <Button color="silver">Buy now</Button>
        <Button color="gold">Buy now</Button>
        <Button color="green">Buy now</Button>
        <Button color="magenta">Buy now</Button>
        <Button color="red">Buy now</Button>
      </div>
    </div>
  );
};

export default App;
