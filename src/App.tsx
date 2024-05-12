import { usePayment } from './payment-fsm';

function App() {
  const { state, onNextClick, onPrevClick, onSaveClick } = usePayment();

  return (
    <div>
      <h1>Current State: {state} </h1>
      {onSaveClick && (
        <button onClick={() => onSaveClick(`save ${state}`)}>Save</button>
      )}
      {onPrevClick && <button onClick={onPrevClick}>Prev</button>}
      {onNextClick && <button onClick={onNextClick}>Next</button>}
    </div>
  );
}

export default App;
