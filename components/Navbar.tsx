/* eslint-disable @next/next/no-img-element */

import { Box, Divider, Flex } from "@chakra-ui/react"
import React from "react"
import { Network } from "./Network"
import Link from "next/link"



export const Navbar = () => {

    return (
        <Flex w="100%" p="0 1rem" h="6rem" zIndex="5" bg="bg.200" pos="static" top="0" align="center" justify="space-around" gap="1rem">
            <Box w="4rem" h="2rem">
                <img src="/logo.png" alt="Logo" style={{ width: "100%", height: "100%" }} />
            </Box>

            <Flex gap="2rem" color="#696767">
                <a href="https://twitter.com/candyview_xyz" target="_blank">TWITTER</a>
                <a href="https://github.com/rohan-201/candyview" target="_blank">GITHUB</a>
                <a href="https://docs.metaplex.com/programs/candy-machine/" target="_blank">CANDY MACHINE</a>
            </Flex>
        </Flex>
    )
}