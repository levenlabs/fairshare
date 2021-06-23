import React from "react";
import {
  Text, Stack,
  Button,
  Input, FormControl
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "./App";

export function Signin() {
  const { authorize } = useContext(AuthContext);
  const [email, setEmail] = React.useState("");

  async function signin(e: React.FormEvent) {
    e.preventDefault();
    const userResponse = await fetch("/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const user = await userResponse.json();
    authorize(user);
  }

  return (
    <Stack as="form" spacing="4" onSubmit={signin}>
      <Text color="teal.400" textAlign="center">
        Sign In
      </Text>
      <FormControl>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email" />
      </FormControl>
      <Button colorScheme="teal" type="submit">
        Send Magic Link
      </Button>
    </Stack>
  );
}
