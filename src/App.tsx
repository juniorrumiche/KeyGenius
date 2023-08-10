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
  const [hasLowerCase, setHasLowerCase] = useState(true);
  const [hasUpperCase, setHasUpperCase] = useState(true);
  const [hasPuntuation, setHasPuntuation] = useState(true);
  const [hasNumbers, setHasNumbers] = useState(true);
  const [password, setpassword] = useState<string>();
  const toast = useToast();

  const copyToClipboard = async () => {
    navigator.clipboard.writeText(password || "");
    toast({
      status: "success",
      description: "Copiado con exito",
      isClosable: true,
      position: "top-right",
    });
  };

  const generateRandomPassword = () => {
    const pwdChars = generatePasswordChars();
    if (!pwdChars.length) {
      setpassword("");
      return;
    }

    let pwd = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * pwdChars.length);
      pwd += pwdChars[randomIndex];
    }
    setpassword(pwd);
  };

  const generatePasswordChars = () => {
    let passwordChars = "";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbersChars = "1234567890";
    const puntuationChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

    passwordChars += hasLowerCase ? lowerChars : "";
    passwordChars += hasUpperCase ? upperChars : "";
    passwordChars += hasPuntuation ? puntuationChars : "";
    passwordChars += hasNumbers ? numbersChars : "";

    return passwordChars;
  };

  useEffect(() => {
    generateRandomPassword();
  }, [hasNumbers, hasPuntuation, hasUpperCase, hasLowerCase, passwordLength]);

  return (
    <Container py={10} maxWidth="5xl">
      <VStack spacing={8}>
        <Stack textAlign="center" spacing={5}>
          <Heading color="gray.600" fontWeight="bold">
            Password Generator
          </Heading>
          <Heading fontWeight="normal" color="gray">
            Cree contraseñas seguras con el generador de contraseñas
          </Heading>
        </Stack>

        <Stack
          direction="column"
          minWidth="80%"
          bg="teal"
          p={5}
          borderRadius="2xl"
        >
          <InputGroup>
            <InputLeftElement>
              <IconButton
                onClick={generateRandomPassword}
                _hover={{ background: "transparent" }}
                bg="none"
                aria-label="..."
              >
                <MdRefresh color="white" size={25} />
              </IconButton>
            </InputLeftElement>
            <InputRightElement>
              <IconButton
                onClick={copyToClipboard}
                _hover={{ background: "transparent" }}
                aria-label="..."
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
            Use el control deslizante y seleccione algunas de las opciones a
            continuación para extender su contraseña y aumentar la seguridad.
          </Text>
          <Slider
            onChange={(value) => setPasswordLength(value)}
            aria-label="slider-ex-4"
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
            onChange={({ target }) => setHasLowerCase(target.checked)}
            colorScheme="red"
            defaultChecked
          >
            Letras
          </Checkbox>
          <Checkbox
            onChange={({ target }) => setHasUpperCase(target.checked)}
            colorScheme="teal"
            defaultChecked
          >
            Letras Mayusculas
          </Checkbox>
          <Checkbox
            onChange={({ target }) => setHasPuntuation(target.checked)}
            colorScheme="teal"
            defaultChecked
          >
            Puntuación
          </Checkbox>
          <Checkbox
            onChange={({ target }) => setHasNumbers(target.checked)}
            colorScheme="teal"
            defaultChecked
          >
            Números
          </Checkbox>
        </Stack>
      </VStack>
    </Container>
  );
}

export default App;
