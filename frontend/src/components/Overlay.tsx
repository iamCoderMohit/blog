import { hexToRgba } from "../helpers/hextorgb";

interface Input {
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  showOverlay: boolean
  children: any;
}

function Overlay({ children, setShowOverlay, showOverlay }: Input) {
  return (
    showOverlay ? <div
      className="fixed top-0 left-0 w-full h-full bg-red-500"
      style={{ backgroundColor: hexToRgba("#000000", 0.5) }}
      onClick={() => setShowOverlay(false)}
    >
      {children}
    </div> : null
  );
}

export default Overlay;
