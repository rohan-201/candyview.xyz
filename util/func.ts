export const getNetworkName = (rpc_url: string) => {
    if (!rpc_url) return
    console.log(rpc_url)
    const lowerCaseInput = rpc_url.toLowerCase();
    if (lowerCaseInput.includes("devnet")) {
      return "Devnet";
    } else if (lowerCaseInput.includes("mainnet")) {
      return "Mainnet-Beta";
    } else if (lowerCaseInput.includes("testnet")) {
      return "Testnet";
    } else if (lowerCaseInput.includes("http://127")) {
      return "Localnet";
    } else {
      return "Custom RPC"
    }
  }
  