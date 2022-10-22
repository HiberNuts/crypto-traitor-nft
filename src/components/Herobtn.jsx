const Herobtn = ({ askContractToMintNft }) => {
  return (
    <button
      onClick={askContractToMintNft}
      href="/"
      class="p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
    >
      Mint Nfts
    </button>
  );
};
export default Herobtn;
