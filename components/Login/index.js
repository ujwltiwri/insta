import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Alert, Link, TextField, Typography } from "@mui/material";
import { AuthContext } from "../../context/auth";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      console.log(email);
      console.log(password);
      setLoading(true);
      setError("");
      await login(email, password);
      console.log("logged in");
      // Router.push("/");
    } catch (err) {
      let errObj = err.code.slice(5).split("-");
      setError(`${errObj[0]} ${errObj[1]}`);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        mt: 10,
      }}
    >
      <Card sx={{ mb: 4, width: 400 }}>
        <CardContent>
          <div className="instaLogo" />

          <TextField
            id="outlined-basic"
            label="Phone number, username, or email"
            variant="outlined"
            fullWidth
            placeholder="abc@gmail.com"
            sx={{
              mt: 2,
            }}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            fullWidth
            placeholder="Enter Password"
            sx={{
              mt: 2,
            }}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3, background: "#0095F6" }}
            onClick={handleLogin}
          >
            Login
          </Button>

          {/* Show Error if Error exists */}
          {error != "" && (
            <Alert severity="error" variant="filled" sx={{ mt: ".5rem" }}>
              {error}
            </Alert>
          )}

          <hr />
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ textAlign: "center", mt: 4 }}
          >
            Forget Password ?
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          width: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent>
          <p>
            Don't have an account?{" "}
            <Link href="/signup">
              <a style={{ fontWeight: "bold", color: "#0095F6" }}>Sign Up</a>
            </Link>
          </p>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Index;
