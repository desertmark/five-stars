import React, { FC } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { BaseView } from "./index";
import { LoginResponse, useLogin } from "../gql/login.api";
import { useAppState, TextInput } from '../Components';
import { useFormik } from "formik";

export interface LoginFormValues {
  username: string;
  password: string;
}

const defaultLoginValues: LoginFormValues = {
  username: '',
  password: '',
}

export const Login: FC = () => {
  const [login, { loading }] = useLogin();
  const { setUserInfo } = useAppState();
  const formik = useFormik<LoginFormValues>({
    initialValues: defaultLoginValues,
    async onSubmit(values) {
      const { data } = await login({ variables: values });
      setUserInfo(data?.login as LoginResponse)
    }
  });
  return (
    <BaseView
      styles={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          minWidth: 275,
          width: 600,
          display: "flex",
          flexDirection: "column",
          p: 3,
        }}
        data-id="login-card"
      >
        <CardContent sx={{ flexDirection: "column", display: "flex" }}>
          <Typography variant="h3" component="div">
            Welcome to Five Stars
          </Typography>
          <Typography variant="h5" component="div">
            Please log in before continuing
          </Typography>
          <TextInput name="username" label="Username or email" formik={formik} />
          <TextInput name="password" label="Password" type="password" formik={formik} />
          <LoadingButton
            loading={loading}
            loadingPosition="end"
            onClick={() => formik.submitForm()}
            fullWidth={true}
            variant="contained"
            sx={{ mt: 4 }}
          >
            Login
          </LoadingButton>

        </CardContent>
      </Card>
    </BaseView>
  );
};
