import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

interface Purchase {
  _id: string;
  productName: string;
  price: number;
  purchaseDate: string;
}

const Profile: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [purchaseHistory, setPurchaseHistory] = useState<Purchase[]>([]);
    const navigate = useNavigate();


    // Fetch purchase history
  const fetchPurchaseHistory = async () => {

    if (!startDate || !endDate) {
      alert("Both start and end dates are required.");
      return;
    }
    try {
      const response = await axios.get("http://localhost:4000/api/profile", {
        params: { startDate, endDate },
      });
      console.log("startDate:", startDate, "endDate:", endDate);
      setPurchaseHistory(response.data);
      console.log("Purchase history:", response.data);
    } catch (error) {
      console.error("Error fetching purchase history:", error);
      // Handle error (show error message, retry logic, etc.)
    }
  };

  // Add event handlers for start and end date inputs
  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  return (
    <Container sx={{ mt: 4 ,bgcolor: '#f5f5f5', p: 4}}>
      <Typography variant="h2" gutterBottom>
        Purchase History
      </Typography>
      <Box mb={2} sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={fetchPurchaseHistory}
        >
          Show History
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={()=>{navigate('/')}}
        >
          Back
        </Button>
      </Box>
      <Grid container spacing={3}>
        {purchaseHistory.map((purchase) => (
          <Grid item xs={12} key={purchase._id}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {purchase.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: ${purchase.price}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Purchase Date:{" "}
                  {new Date(purchase.purchaseDate).toLocaleDateString()}{" "}
                  {new Date(purchase.purchaseDate).toLocaleTimeString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Profile;
