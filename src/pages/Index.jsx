import { useState, useEffect } from "react";
import { Container, Text, VStack, Button, Box } from "@chakra-ui/react";
import { Html5QrcodeScanner } from "html5-qrcode";

const Index = () => {
  const [qrData, setQrData] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    if (showScanner) {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: 250 },
        false
      );

      scanner.render(
        (data) => {
          setQrData(data);
          setShowScanner(false);
          scanner.clear();
        },
        (err) => {
          console.error(err);
        }
      );

      return () => {
        scanner.clear();
      };
    }
  }, [showScanner]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">QR Code Scanner</Text>
        {qrData ? (
          <Box>
            <Text>QR Code Data:</Text>
            <Text fontWeight="bold">{qrData}</Text>
            <Button mt={4} onClick={() => setQrData(null)}>Scan Another QR Code</Button>
          </Box>
        ) : (
          <Button onClick={() => setShowScanner(true)}>Scan QR Code</Button>
        )}
        {showScanner && (
          <Box mt={4} id="qr-reader" width="100%"></Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;