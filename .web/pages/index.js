import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, set_val, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Avatar, Box, Breadcrumb, BreadcrumbItem, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, FormControl, Heading, HStack, Image, Input, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorMode, VStack } from "@chakra-ui/react"
import { CloseIcon, DeleteIcon, HamburgerIcon } from "@chakra-ui/icons"
import NextLink from "next/link"
import { SpinningCircles } from "react-loading-icons"
import NextHead from "next/head"



export default function Component() {
  const state = useContext(StateContext)
  const router = useRouter()
  const { colorMode, toggleColorMode } = useColorMode()
  const focusRef = useRef();
  
  // Main event loop.
  const [addEvents, connectError] = useContext(EventLoopContext)

  // Set focus to the specified element.
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  })

  // Route after the initial page hydration.
  useEffect(() => {
    const change_complete = () => addEvents(initialEvents.map((e) => ({...e})))
    router.events.on('routeChangeComplete', change_complete)
    return () => {
      router.events.off('routeChangeComplete', change_complete)
    }
  }, [router])

  const ref_question = useRef(null); refs['ref_question'] = ref_question;

  return (
    <Fragment>
  <Fragment>
  {isTrue(connectError !== null) ? (
  <Fragment>
  <Modal isOpen={connectError !== null}>
  <ModalOverlay>
  <ModalContent>
  <ModalHeader>
  {`Connection Error`}
</ModalHeader>
  <ModalBody>
  <Text>
  {`Cannot connect to server: `}
  {(connectError !== null) ? connectError.message : ''}
  {`. Check if server is reachable at `}
  {`http://localhost:8000`}
</Text>
</ModalBody>
</ModalContent>
</ModalOverlay>
</Modal>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
  <VStack alignItems={`stretch`} spacing={`0`} sx={{"bg": "#111", "color": "#fff", "minH": "100vh", "alignItems": "stretch", "justifyContent": "space-between"}}>
  <Box sx={{"bg": "#111", "backdropFilter": "auto", "backdropBlur": "lg", "p": "4", "borderBottom": "1px solid #fff3", "position": "sticky", "top": "0", "zIndex": "100"}}>
  <HStack justify={`space-between`} sx={{"alignItems": "center", "justifyContent": "space-between"}}>
  <HStack sx={{"alignItems": "center", "justifyContent": "space-between"}}>
  <HamburgerIcon onClick={(_e) => addEvents([Event("state.toggle_drawer", {})], (_e))} sx={{"mr": 4, "cursor": "pointer"}}/>
  <Link as={NextLink} href={`/`}>
  <Box sx={{"p": "1", "borderRadius": "6", "bg": "#F0F0F0", "mr": "2"}}>
  <Image src={`favicon.ico`} sx={{"width": 30, "height": "auto"}}/>
</Box>
</Link>
  <Breadcrumb>
  <BreadcrumbItem>
  <Heading size={`sm`}>
  {`ReflexGPT`}
</Heading>
</BreadcrumbItem>
  <BreadcrumbItem>
  <Text sx={{"size": "sm", "fontWeight": "normal"}}>
  {state.current_chat}
</Text>
</BreadcrumbItem>
</Breadcrumb>
</HStack>
  <HStack spacing={`8`} sx={{"alignItems": "center", "justifyContent": "space-between"}}>
  <Button onClick={(_e) => addEvents([Event("state.toggle_modal", {})], (_e))} sx={{"bg": "#5535d4", "px": "4", "py": "2", "h": "auto", "shadow": "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;", "color": "#fff", "_hover": {"bg": "#4c2db3"}}}>
  {`+ New chat`}
</Button>
  <Menu sx={{"bg": "#111", "border": "red"}}>
  <MenuButton>
  <Avatar name={`User`} size={`md`} sx={{"shadow": "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;", "color": "#fff", "bg": "#fff3"}}/>
  <Box/>
</MenuButton>
  <MenuList sx={{"bg": "#111", "border": "1.5px solid #222"}}>
  <MenuItem sx={{"bg": "#111", "color": "#fff"}}>
  {`Help`}
</MenuItem>
  <MenuDivider sx={{"border": "1px solid #222"}}/>
  <MenuItem sx={{"bg": "#111", "color": "#fff"}}>
  {`Settings`}
</MenuItem>
</MenuList>
</Menu>
</HStack>
</HStack>
</Box>
  <VStack sx={{"py": "8", "flex": "1", "width": "100%", "maxW": "3xl", "paddingX": "4", "alignSelf": "center", "overflow": "hidden", "paddingBottom": "5em", "alignItems": "stretch", "justifyContent": "space-between"}}>
  <Box>
  {state.chats[state.current_chat].map((dctysvco, i) => (
  <Box key={i} sx={{"width": "100%"}}>
  <Box sx={{"textAlign": "right", "marginTop": "1em"}}>
  <Text sx={{"bg": "#fff3", "shadow": "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;", "display": "inline-block", "p": "4", "borderRadius": "xl", "maxW": "30em"}}>
  {dctysvco.question}
</Text>
</Box>
  <Box sx={{"textAlign": "left", "paddingTop": "1em"}}>
  <Text sx={{"bg": "#5535d4", "shadow": "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;", "display": "inline-block", "p": "4", "borderRadius": "xl", "maxW": "30em"}}>
  {dctysvco.answer}
</Text>
</Box>
</Box>
))}
</Box>
</VStack>
  <Box sx={{"position": "sticky", "bottom": "0", "left": "0", "py": "4", "backdropFilter": "auto", "backdropBlur": "lg", "borderTop": "1px solid #fff3", "alignItems": "stretch", "width": "100%"}}>
  <VStack sx={{"width": "100%", "maxW": "3xl", "mx": "auto", "alignItems": "stretch", "justifyContent": "space-between"}}>
  <Box as={`form`} onSubmit={(_e0) => addEvents([Event("state.process_question", {form_data:{"question": getRefValue(ref_question)}}),Event("_set_value", {ref:ref_question,value:""})], (_e0))} sx={{"width": "100%"}}>
  <FormControl isDisabled={state.processing}>
  <HStack sx={{"alignItems": "center", "justifyContent": "space-between"}}>
  <Input id={`question`} placeholder={`Type something...`} ref={ref_question} sx={{"bg": "#222", "borderColor": "#fff3", "borderWidth": "1px", "p": "4", "_placeholder": {"color": "#fffa"}, "_hover": {"borderColor": "#5535d4"}}} type={`text`}/>
  <Button sx={{"bg": "#222", "borderColor": "#fff3", "borderWidth": "1px", "p": "4", "_hover": {"bg": "#5535d4"}, "shadow": "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;", "color": "#fff"}} type={`submit`}>
  <Fragment>
  {isTrue(state.processing) ? (
  <Fragment>
  <SpinningCircles height={`1em`}/>
</Fragment>
) : (
  <Fragment>
  <Text>
  {`Send`}
</Text>
</Fragment>
)}
</Fragment>
</Button>
</HStack>
</FormControl>
</Box>
  <Text sx={{"fontSize": "xs", "color": "#fff6", "textAlign": "center"}}>
  {`ReflexGPT may return factually incorrect or misleading responses. Use discretion.`}
</Text>
</VStack>
</Box>
  <Drawer isOpen={state.drawer_open} placement={`left`}>
  <DrawerOverlay>
  <DrawerContent sx={{"bg": "#111", "color": "#fff", "opacity": "0.9"}}>
  <DrawerHeader>
  <HStack sx={{"alignItems": "center", "justifyContent": "space-between"}}>
  <Text>
  {`Chats`}
</Text>
  <CloseIcon onClick={(_e) => addEvents([Event("state.toggle_drawer", {})], (_e))} sx={{"fontSize": "md", "color": "#fff8", "_hover": {"color": "#fff"}, "cursor": "pointer", "w": "8"}}/>
</HStack>
</DrawerHeader>
  <DrawerBody>
  <VStack alignItems={`stretch`} sx={{"alignItems": "stretch", "justifyContent": "space-between"}}>
  {state.chat_titles.map((ofxmflzf, i) => (
  <HStack key={i} sx={{"color": "#fff", "cursor": "pointer"}}>
  <Box onClick={(_e) => addEvents([Event("state.set_chat", {chat_name:ofxmflzf})], (_e))} sx={{"border": "double 1px transparent;", "borderRadius": "10px;", "backgroundImage": "linear-gradient(#111, #111), radial-gradient(circle at top left, #5535d4,#4c2db3);", "backgroundOrigin": "border-box;", "backgroundClip": "padding-box, border-box;", "p": "2", "_hover": {"backgroundImage": "linear-gradient(#111, #111), radial-gradient(circle at top left, #5535d4,#6649D8);"}, "color": "#fff8", "flex": "1"}}>
  {ofxmflzf}
</Box>
  <Box sx={{"border": "double 1px transparent;", "borderRadius": "10px;", "backgroundImage": "linear-gradient(#111, #111), radial-gradient(circle at top left, #5535d4,#4c2db3);", "backgroundOrigin": "border-box;", "backgroundClip": "padding-box, border-box;", "p": "2", "_hover": {"backgroundImage": "linear-gradient(#111, #111), radial-gradient(circle at top left, #5535d4,#6649D8);"}}}>
  <DeleteIcon onClick={(_e) => addEvents([Event("state.delete_chat", {})], (_e))} sx={{"fontSize": "md", "color": "#fff8", "_hover": {"color": "#fff"}, "cursor": "pointer", "w": "8"}}/>
</Box>
</HStack>
))}
</VStack>
</DrawerBody>
</DrawerContent>
</DrawerOverlay>
</Drawer>
  <Modal isOpen={state.modal_open}>
  <ModalOverlay>
  <ModalContent sx={{"bg": "#222", "color": "#fff"}}>
  <ModalHeader>
  <HStack alignItems={`center`} justifyContent={`space-between`} sx={{"alignItems": "center", "justifyContent": "space-between"}}>
  <Text>
  {`Create new chat`}
</Text>
  <CloseIcon onClick={(_e) => addEvents([Event("state.toggle_modal", {})], (_e))} sx={{"fontSize": "sm", "color": "#fff8", "_hover": {"color": "#fff"}, "cursor": "pointer"}}/>
</HStack>
</ModalHeader>
  <ModalBody>
  <Input onBlur={(_e0) => addEvents([Event("state.set_new_chat_name", {value:_e0.target.value})], (_e0))} placeholder={`Type something...`} sx={{"bg": "#222", "borderColor": "#fff3", "_placeholder": {"color": "#fffa"}}} type={`text`}/>
</ModalBody>
  <ModalFooter>
  <Button onClick={(_e) => addEvents([Event("state.create_chat", {}),Event("state.toggle_modal", {})], (_e))} sx={{"bg": "#5535d4", "boxShadow": "md", "px": "4", "py": "2", "h": "auto", "_hover": {"bg": "#4c2db3"}, "shadow": "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;", "color": "#fff"}}>
  {`Create`}
</Button>
</ModalFooter>
</ModalContent>
</ModalOverlay>
</Modal>
</VStack>
  <NextHead>
  <title>
  {`Reflex App`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`favicon.ico`} property={`og:image`}/>
</NextHead>
</Fragment>
  )
}
