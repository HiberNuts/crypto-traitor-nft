import { useState } from "react";
function IncDecCounter({ noOfMint, setnoOfMint }) {
  let [num, setNum] = useState(0);
  let incNum = () => {
    if (noOfMint < 10000) {
      setnoOfMint(Number(noOfMint) + 1);
      // setNum(Number(num) + 1);
    }
  };
  let decNum = () => {
    if (noOfMint > 0) {
      setnoOfMint(noOfMint - 1);
      // setNum(num - 1);
    }
  };
  let handleChange = (e) => {
    setnoOfMint(e.target.value);
  };
  return (
    <>
      <div class="input-group">
        <div class="input-group-prepend">
          <button
            class="p-3 px-6 pt-2 text-white bg-brightRed  baseline hover:bg-brightRedLight"
            type="button"
            onClick={decNum}
          >
            -
          </button>
        </div>
        <input type="text" class="form-control" value={noOfMint} onChange={handleChange} />
        <div class="input-group-prepend">
          <button
            class="p-3 px-6 pt-2 text-white bg-brightRed  baseline hover:bg-brightRedLight"
            type="button"
            onClick={incNum}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}
export default IncDecCounter;
