import { shortenAddress } from "../utils/shortenAddress";

const Connectbtn = ({ connectWallet, CurrentAccount, setCurrentAccount }) => {
  return (
    <button
      href="/"
      onClick={connectWallet}
      className="p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
    >
      {CurrentAccount != "" ? `${shortenAddress(CurrentAccount)}` : "Connect"}
    </button>
  );
};
export default Connectbtn;
