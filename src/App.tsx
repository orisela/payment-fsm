import { usePayment } from './payment-fsm';

function App() {
  const { state, setNextState, setPrevState } = usePayment();

  return (
    <div>
      <h1>Current State: {state} </h1>
      {setPrevState && <button onClick={setPrevState}>Prev</button>}
      {setNextState && <button onClick={setNextState}>Next</button>}
    </div>
  );
}

export default App;
