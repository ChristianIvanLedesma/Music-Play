import "./Boton.css";

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

function Boton({ onNext, onPrev }: Props) {
  return (
    <div className="botonera">
      <div  className="Botones" onClick={onPrev} aria-label="Previous">
      <svg xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" viewBox="0 0 24 24" 
      fill="none" stroke="currentColor" strokeWidth="2" 
      strokeLinecap="round" strokeLinejoin="round" 
      className="lucide lucide-circle-chevron-right"><circle cx="12" cy="12" r="10"/><path d="m10 8 4 4-4 4"/></svg>
      </div>
      <div className="Botones" onClick={onNext} aria-label="Previous">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
      strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-chevron-left">
      <circle cx="12" cy="12" r="10"/><path d="m14 16-4-4 4-4"/></svg>
      </div>
      
      
    </div>
  );
}

export default Boton;
