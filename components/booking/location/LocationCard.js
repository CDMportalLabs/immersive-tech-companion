// import { useTheme, Card, Grid, Text, Link } from "@nextui-org/react";
import { Box, Card, CardContent, CardMedia, Typography, useTheme, Grid } from '@mui/material';
import { css } from "@emotion/react";

export default function LocationCard(props) {
  const { location, address1, address2, img, isSelected} = props;
  const styles = {
        root: css`
            margin: 1rem auto;
            width: 100%;
            display: flex;
          `,
        card: css`
            margin: 0;
            width: 24rem;
            height: 10rem;
            box-shadow: 0px 7px 40px rgba(0, 0, 0, 0.1);
            border-radius: 16px;
        `,
        imageCard: css`
            margin: 1.5rem 1rem;
            width: 7rem;
            height: 7rem;
            background-color: gray;
        `,
    }
  
  return (
    <Card sx={styles.card}> 
      <Grid container spacing={{ xs: 1, md: 2 }} direction = 'row' justifyContent="flex-start" alignItems="center">
          <Grid item>
             <Box sx={styles.imageCard}>Image placeholder</Box>
            </Grid>
          <Grid item container xs="auto" direction="column" justifyContent="center" alignItems="flex-start">
          <Grid item xs="auto">
              <h2 style={{fontSize: "15px", margin: "0" }}>{location}</h2>
          </Grid>    
          <Grid item xs="auto">
            <Box style={{ fontSize: "15px", margin: "0" }}>{address1}</Box>
          </Grid>  
          <Grid item xs="auto">
              <Box style={{fontSize: "15px", margin: "0" }}>{address2}</Box>
          </Grid>  
          </Grid> 
      </Grid>
    </Card>
    
  )}
