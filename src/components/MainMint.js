import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import roboPunksNFT from "../RoboPunksNFT.json";

const roboPunksNFTAddress = "0x75a4D7BDB25a10EC72cB1B2D2086aC8c5bEC873e";

const MainMInt = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);

  const isConnected = Boolean(accounts[0]);

  const handleMint = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        roboPunksNFTAddress,
        roboPunksNFT.abi,
        signer
      );
      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
        });
        console.log("response:", response);
      } catch (error) {
        console.log("error:", error);
      }
    }
  };

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <Flex justify="center" align="center" height="100vvh" paddingBottom="150ox">
      <Box width="520px">
        <div>
          <Text fontSize="48px" textShadow="0 5px #000000">
            RoboPunks
          </Text>
          <Text
            fontsize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 2px 2px #000000"
          >
            Welcome to the future. Trust me when I say the RoboPunks NFT can
            take you on a journey of unending possibilities. Haha, mint to start
            exploring a new Universe
          </Text>
        </div>
        {isConnected ? (
            <div>
          <Flex align="center" justify="center">
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleDecrement}
              >
                -
              </Button>
              <Input
                readOnly
                fontfamily="inherit"
                width="100px"
                height="40px"
                textAlign="center"
                marginTop="10px"
                type="number"
                value={mintAmount}
              />
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleIncrement}
              >
                +
              </Button>
              </Flex>
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleMint}
              >
                 Mint
              </Button>
            </div>
         
        ) : (
          <Text marginTop="70px" fontSize="30px" letterSpacing = "-5.5%" fontFamily ="VT323" textShadow ="0 3px #000000 "  color ="#D6527D">Connect to Mint</Text>
        )}
      </Box>
    </Flex>
  );
};

export default MainMInt;
