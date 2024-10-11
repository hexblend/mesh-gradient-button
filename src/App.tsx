import Button from './components/Button';

const App = () => {
  return (
    <div className="h-screen w-screen bg-black py-8 text-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <Button color="silver">Hello</Button>
        <Button color="gold">Hello</Button>
        <Button color="green">Hello</Button>
        <Button color="magenta">Hello</Button>
        <Button color="red">Hello</Button>
      </div>
    </div>
  );
};

export default App;
