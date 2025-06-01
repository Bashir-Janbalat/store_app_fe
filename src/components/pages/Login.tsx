import React, {useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import toast, {Toaster} from "react-hot-toast";
import {useAuth} from "../hooks/useAuth.ts";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {login} = useAuth();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username || !password) {
            toast.error("Username and password are required");
            return;
        }

        try {
            await login(username, password);
            toast.success("Login successful!");
            // navigate("/");
        } catch (err) {
            console.error(err);
            toast.error("Invalid username or password");
        }
    };

    return (
        <Box sx={{maxWidth: 400, mx: "auto", mt: 4}}>
            <Typography variant="h5" mb={2}>
                Login
            </Typography>
            <form onSubmit={handleLogin}>
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" fullWidth sx={{mt: 2}}>
                    Login
                </Button>
            </form>
            <Toaster
                toastOptions={{
                    success: {style: {background: "green", color: "white"}},
                    error: {style: {background: "red", color: "white"}},
                }}
            />
        </Box>
    );
};

export default Login;
