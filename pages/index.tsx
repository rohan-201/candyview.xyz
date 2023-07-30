/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import { Box, Divider, Flex, FormControl, Grid, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ArrowDownIcon, SearchIcon } from '@chakra-ui/icons';
import { useNetworkContext } from '@/components/networkContext';
import { Navbar } from '@/components/Navbar';
// @ts-ignore
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { fetchCandyMachine, mplCandyMachine } from '@metaplex-foundation/mpl-candy-machine';
import { Network } from '@/components/Network';

function addSpacesToCamelCase(string: string) {
  return string.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
}


export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const { selectedNetwork } = useNetworkContext();
  const [cmData, setCmData] = useState<any>();
  const [cmDataMore, setCmDataMore] = useState<any>();
  const [error, setError] = useState('')
  const umi = createUmi(selectedNetwork).use(mplCandyMachine());
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showMore, setShowMore] = useState<boolean>(false)


  useEffect(() => {
    onClose()
    const run = async () => {
      await searchCandy(false)

    }
    run()
  }, [selectedNetwork])

// @ts-ignore 
  const searchCandy = async (notOpen?: boolean) => {
    setShowMore(false)
    setError('')
    setCmData(undefined)

    try {
      const candyMachine = await fetchCandyMachine(umi, searchValue);
      console.log(candyMachine)
      setCmData({
        PublicKey: candyMachine.publicKey,
        NFTsLoaded: candyMachine.itemsLoaded,
        NFTsMinted: candyMachine.itemsRedeemed,
        Authority: candyMachine.authority,
        Royalty: `${Number(candyMachine.data.sellerFeeBasisPoints.basisPoints.toString()) / 100}%`,
      });

      setCmDataMore({
        CollectionMint: candyMachine.collectionMint,
        IsMutable: candyMachine.data.isMutable,
        CreatorCount: candyMachine.data.creators.length,
        TokenStandard: candyMachine.tokenStandard
      });
// @ts-ignore 
      if(!notOpen){
      
      onOpen()
    }
    } catch (e: any) {
      if (e.toString().includes("[AccountNotFoundError] The account of type [CandyMachine]")) {
        setError(`Candy machine not found on ${selectedNetwork}. Perhaps it is on other network?`)
      } else {
        setError(e.toString())
      }
      // @ts-ignore 
      if(!notOpen){
      
        onOpen()
      }
      console.log('Error getting CM: ', e.toString());
    }
  };

  return (
    <>
      <Head>
        <title>CandyView</title>
        <meta name="description" content="Get Details of any candy machine with one search" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />


      <Flex pos="relative" flexFlow="column" align="center" minH="100vh" minW="100vw">

        <Flex justify="center" align="center" maxW="80%">

          <Box zIndex={2} className="textParent">
            <Text zIndex={2} className="someText" fontWeight={700} color="#30234D" fontSize="60px">Detail Viewer For <span style={{ color: "#D577D7" }}>Candy Machine</span> Collections</Text>
            <Text color="#1E293B" className="tagline" fontSize="25px" opacity="0.7" fontWeight={500} maxW="80%" zIndex={2}>Candy View enables anyone to view details of any candy machine collection</Text>
          </Box>

          <Box w="800px" h="auto"  className="heroImage">
            <img src="/heroimage.svg" style={{ width: "100%", height: "100%" }} alt="Image" />
          </Box>

        </Flex>


        <Text mt="6rem" paddingX="3rem" fontSize="50px" className="sub" zIndex={3} fontWeight={500} mb="1rem">Paste Address And See <span style={{ color: "#D577D7" }}>Details</span></Text>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchCandy()
          }}
          className="form"
          style={{
            background: "#CCC6F040",
            width: "60%",
            display: "flex",
            alignItems: "center",
            borderRadius: "0.5rem",
            zIndex: 2,
            position: "relative",
            backdropFilter: "blur(10px)"
          }}

        >
          <img src="/shape.png" style={{ position: "absolute", left: "-15rem", zIndex: 0, bottom: "-10rem" }} alt="Image" />
          <SearchIcon
            style={{
              backdropFilter: "blur(10px)",
              height: "3.5rem",
              borderRadius: "0.8rem 0rem 0 0.8rem",
              padding: "10px",
              width: "3rem",

            }}
            bg="#CCC6F040"
            color="white"
            w="1.5rem" h="1.5rem" ml="0.5rem"
            cursor="pointer"
            onClick={searchCandy} />
            
          <Input
            zIndex={2}
            h="3.5rem"
            border="none"
            borderRadius="0rem 0.8rem 0.8rem 0rem"
            bg="#CCC6F040"
            style={{
              backdropFilter: "blur(5px)"
            }}
            className="mainInput"
            _active={{ border: "none" }}
            _focusWithin={{ border: "none" }}
            _focus={{ border: "none" }}
            _focusVisible={{ border: "none" }}
            placeholder="Search Candy machine"
            value={searchValue}
            w="100%"
            fontSize="1.5rem"
            onChange={(event) => setSearchValue(event.target.value)}
          />
          
        </form>

      </Flex>



      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          alignItems="center"
          display="flex"
          style={{ backdropFilter: 'blur(10px)' }}
          minW="70vw"
          borderRadius="2rem"
          boxShadow="19px 15px 46px 0px #00000024"
          bg="linear-gradient(111.5deg, rgba(232, 232, 255, 0.89) 0%, rgba(255, 255, 255, 0.51) 100%)">
          <ModalHeader>Details</ModalHeader>

          <Flex w="100%" align="center" justify="center" gap="1rem" mb="1rem">

            <Flex
              zIndex={2}
              bg="#837DA74F"
              className="modalinputparent"
              w="60%"
              align="center"
              justify="center"
              borderRadius="md"
              p="1rem"
              boxShadow="md"
            >
              <SearchIcon className="searchIcon" color="#6e92ff" w="2rem" h="2rem" ml="0.5rem" cursor="pointer" onClick={searchCandy} />
              <Input
                ml="1rem"
                className="modalinput"
                _active={{ border: "none" }}
                _focusWithin={{ border: "none" }}
                _focus={{ border: "none" }}
                _focusVisible={{ border: "none" }}
                border="none"
                bg="none"
                placeholder="Search Candy machine"
                value={searchValue}
                w="100%"
                fontSize="1.5rem"
                onChange={(event) => setSearchValue(event.target.value)}
              />

            </Flex>
            <Network />
          </Flex>
          <ModalCloseButton />
          <ModalBody w="80%">
            <Flex direction="column" align="center" w="100%">

              {cmData ? (
                <Table mt="2rem" w="100%" className="table">
                  <Thead>
                    <Tr bg="#1E293B" borderRadius="1rem">
                      <Th fontSize="1.5rem" color="white">Field</Th>
                      <Th fontSize="1.5rem" color="white">Value</Th>
                    </Tr>
                  </Thead>
                  <Tbody >
                    {Object.entries(cmData).map(([key, value]: any) => (
                      <Tr key={key}>
                        <Td fontSize="1.4rem" color="#1E293B" fontWeight={600}>{addSpacesToCamelCase(key.toString())}</Td>
                        <Td fontSize="1.4rem" color="gray.700">{value.toString()}</Td>
                      </Tr>
                    ))}
                    {!showMore && <Box mt="2rem" w="100%" display="flex">
                      <Text textAlign="center" cursor="pointer" color="gray.600" fontWeight={600} fontSize="1.5rem" onClick={() => setShowMore(true)}>Show More</Text>
                    </Box>}


                    {showMore && Object.entries(cmDataMore).map(([key, value]: any) => (
                      <>
                        <Tr key={key}>
                          <Td fontSize="1.4rem" color="#1E293B" fontWeight={600}>{addSpacesToCamelCase(key.toString())}</Td>
                          <Td fontSize="1.4rem" color="gray.700">{value.toString()}</Td>
                        </Tr>
                      </>
                    ))}
                    {showMore && <Box w="100%" mt="2rem" display="flex">
                      <Text textAlign="center" cursor="pointer" color="gray.600" fontWeight={600} fontSize="1.5rem" onClick={() => setShowMore(false)}>Show Less</Text>
                    </Box>}
                  </Tbody>
                </Table>
              ) : error ? <Text fontSize="1.6rem" color="#424a68" textAlign="center">{error}</Text> : null}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>


      <img src="/glow.svg" style={{ zIndex: "0", width: "100%", height: "100%", position: "fixed", left: "-40%", bottom: "-40%" }} alt="Image" />

    </>
  );
}
