import React, { FC, useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { View } from "./index";
import { LoginResponse, useLogin } from "../gql/login.api";
import { useAppState } from '../Components/App/AppContext';


export const Login: FC = () => {
  const [form, setForm] = useState<{ username?: string; password?: string }>(
    {}
  );

  const [login, { data, loading }] = useLogin();
  const { setUserInfo } = useAppState();
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
          <LoadingButton
            loading={loading}
            loadingPosition="end"
            onClick={async () => {
              const { data } = await login({ variables: form });
              setUserInfo(data?.login as LoginResponse)
            }}
            fullWidth={true}
            variant="contained"
            sx={{ mt: 3 }}
          >
            Login
          </LoadingButton>

        </CardContent>
      </Card>
    </View>
  );
};
