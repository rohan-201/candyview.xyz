/* eslint-disable @next/next/no-img-element */
import React from 'react';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  Modal,
  ModalHeader,
  Input,
  ModalOverlay,
  ModalContent,
  Divider,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';

import { useNetworkContext } from '@/components/networkContext'
import { getNetworkName } from '@/util/func';

export const Network = () => {
  const { selectedNetwork, updateNetwork } = useNetworkContext()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (

    <>

      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent
          minH="40vh"
          maxW="30vw"
          bg=" #4079ff2e"
          style={{ backdropFilter: 'blur(15px)' }}
          p="1rem 3rem"
          border="1px solid"
          borderColor="gray.500"
          boxShadow="0px 0px 40px #0003"
          borderRadius="1rem"
        >
          <ModalHeader fontSize="2rem" color="white">Enter Custom RPC Endpoint</ModalHeader>
          <Divider my="2rem" />
          <Input
            placeholder="RPC URL"
            ml="1rem"
            _active={{ border: "none" }}
            _focusWithin={{ border: "none" }}
            _focus={{ border: "none" }}
            _focusVisible={{ border: "none" }}
            border="none"
            bg="#837DA74F"
            color="white"
            mb="2rem"
            h="3rem"
            fontSize="1.8rem"
            onChange={(e) => updateNetwork(e.target.value)} />

          <Button colorScheme="messenger" onClick={onClose} alignSelf="center" w="50%">Done</Button>
        </ModalContent>
      </Modal>

      <Menu>
        <MenuButton
          className="networkBtn"
          as={Button}
          w="13.5rem"
          borderRadius="0.5rem"
          h='3rem'
          variant="filled"
          fontSize="1.3rem"
          color="white"
          bg="#6682f2"
          rightIcon={
            <ChevronDownIcon color="white" w="1.5rem" h="1.5rem" />
          }
        >
          {getNetworkName(selectedNetwork || "")}
        </MenuButton>

        <MenuList
          className="networkLst"
          w="10rem"
          p="0.5rem"
          borderRadius="0.5rem"
          outline="none"
          borderColor="gray.500"
          border="1px solid"
        >
          <MenuItem
            h="2.5rem"
            bg="gray.200"
            borderRadius="0.5rem"
            fontSize="1.5rem"
            color="gray.600"
            onClick={async () => {
              updateNetwork("https://solana-mainnet.g.alchemy.com/v2/DBttxukNil1Us0M605rbiUwEnG9zRW4G")
            }}
          >
            Mainnet-beta
          </MenuItem>

          <MenuItem
            h="2.5rem"
            bg="gray.200"
            borderRadius="0.5rem"
            fontSize="1.5rem"
            color="gray.600"
            onClick={async () => {
              updateNetwork("https://api.devnet.solana.com")
            }}
          >
            Devnet
          </MenuItem>

          <MenuItem
            h="2.5rem"
            bg="gray.200"
            borderRadius="0.5rem"
            fontSize="1.5rem"
            color="gray.600"
            onClick={onOpen}
          >
            Custom RPC
          </MenuItem>

        </MenuList>

      </Menu>
    </>
  );
};