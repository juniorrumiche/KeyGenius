import {
  Checkbox,
  Container,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdRefresh, MdCopyAll } from "react-icons/md";

function App() {
  const [passwordLength, setPasswordLength] = useState(20);
  const [options, setOptions] = useState({
    hasLowerCase: true,
    hasUpperCase: true,
    hasPunctuation: true,
    hasNumbers: true,
  });
  const [password, setPassword] = useState("");
  const toast = useToast();

  const copyToClipboard = async () => {
    navigator.clipboard.writeText(password);
    toast({
      status: "success",
      description: "Copied successfully",
      isClosable: true,
      position: "top-right",
    });
  };

  const generateRandomPassword = () => {
    const pwdChars = generatePasswordChars();
    if (!pwdChars.length) {
      setPassword("");
      return;
    }

    let pwd = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * pwdChars.length);
      pwd += pwdChars[randomIndex];
    }
    setPassword(pwd);
  };

  const generatePasswordChars = () => {
    const { hasLowerCase, hasUpperCase, hasPunctuation, hasNumbers } = options;
    let passwordChars = "";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbersChars = "1234567890";
    const punctuationChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

    if (hasLowerCase) passwordChars += lowerChars;
    if (hasUpperCase) passwordChars += upperChars;
    if (hasPunctuation) passwordChars += punctuationChars;
    if (hasNumbers) passwordChars += numbersChars;

    return passwordChars;
  };

  useEffect(() => {
    generateRandomPassword();
  }, [options, passwordLength]);

  return (
    <Container py={10} maxWidth="5xl">
      <VStack spacing={8}>
        <Stack textAlign="center" spacing={5}>
          <Heading color="gray.600" fontWeight="bold">
            Password Generator
          </Heading>
          <Heading fontWeight="normal" color="gray">
            Create secure passwords with the password generator
          </Heading>
        </Stack>

        <Stack direction="column" minWidth="80%" bg="teal" p={5} borderRadius="2xl">
          <InputGroup>
            <InputLeftElement>
              <IconButton
                onClick={generateRandomPassword}
                _hover={{ background: "transparent" }}
                bg="none"
                aria-label="Refresh"
              >
                <MdRefresh color="white" size={25} />
              </IconButton>
            </InputLeftElement>
            <InputRightElement>
              <IconButton
                onClick={copyToClipboard}
                _hover={{ background: "transparent" }}
                aria-label="Copy"
                bg="none"
              >
                <MdCopyAll color="white" size={25} />
              </IconButton>
            </InputRightElement>
            <Input
              fontWeight="semibold"
              textAlign="center"
              fontSize="xl"
              color="white"
              value={password}
              readOnly
              border="none"
            />
          </InputGroup>
        </Stack>

        <Stack spacing={5} width="80%">
          <Text color="gray">
            Use the slider and select some of the options below to customize your password and increase security.
          </Text>
          <Slider
            onChange={(value) => setPasswordLength(value)}
            aria-label="Password Length"
            min={4}
            max={50}
            defaultValue={passwordLength}
          >
            <SliderTrack bg="red.100">
              <SliderFilledTrack bg="red" />
            </SliderTrack>
            <SliderThumb boxSize={8}>
              <Text fontWeight="semibold">{passwordLength}</Text>
            </SliderThumb>
          </Slider>
        </Stack>

        <Stack flexWrap="wrap" spacing={8} direction="row">
          <Checkbox
            onChange={({ target }) => setOptions({ ...options, hasLowerCase: target.checked })}
            colorScheme="red"
            defaultChecked={options.hasLowerCase}
          >
            Lowercase
          </Checkbox>
          <Checkbox
            onChange={({ target }) => setOptions({ ...options, hasUpperCase: target.checked })}
            colorScheme="teal"
            defaultChecked={options.hasUpperCase}
          >
            Uppercase
          </Checkbox>
          <Checkbox
            onChange={({ target }) => setOptions({ ...options, hasPunctuation: target.checked })}
            colorScheme="teal"
            defaultChecked={options.hasPunctuation}
          >
            Punctuation
          </Checkbox>
          <Checkbox
            onChange={({ target }) => setOptions({ ...options, hasNumbers: target.checked })}
            colorScheme="teal"
            defaultChecked={options.hasNumbers}
          >
            Numbers
          </Checkbox>
        </Stack>
      </VStack>
    </Container>
  );
}

export default App;
