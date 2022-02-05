import React, { FC, useState } from "react";
import { View } from "./index";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useLogin } from "../gql/login.api";

export const Login: FC = () => {
  const [form, setForm] = useState<{ username?: string; password?: string }>(
    {}
  );

  const [login, { data }] = useLogin();

  return (
    <View
      styles={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          minWidth: 275,
          width: "50%",
          display: "flex",
          flexDirection: "column",
          p: 3,
        }}
        data-id="login-card"
      >
        <CardContent sx={{ flexDirection: "column", display: "flex" }}>
          <Typography variant="h5" component="div">
            Login
          </Typography>
          <TextField
            id="outlined-basic"
            label="Username or email"
            variant="outlined"
            sx={{ mt: 2 }}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            sx={{ mt: 2 }}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button
            onClick={() => login({ variables: form })}
            fullWidth={true}
            variant="contained"
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </View>
  );
};
