// import { useTheme, Card, Grid, Text, Link } from "@nextui-org/react";
import { Box, Card, CardContent, CardMedia, Typography, useTheme, Grid } from '@mui/material';
import { css } from "@emotion/react";

export default function LocationCard(props) {
  const { location, address1, address2, img, isSelected} = props;
  const styles = {
        root: css`
            margin: 2rem auto;
            width: 90%;
            display: flex;
          `,
        card: css`
            margin: auto 1rem;
            width: 35rem;
            height: 10rem;
        `
        ,
        imageCard: css`
            margin: auto 1rem;
            width: 8rem;
            height: 8rem;
            background-color: gray;
        `,
        
        grid: css`
            margin: auto;
        `
    }
  
  return (
    
    <Box sx={styles.root}>
    <Card sx={styles.card}> 
      <Grid container spacing={{ xs: 1, md: 2 }} direction = 'row' justifyContent="flex-start" alignItems="center">
          <Grid item>
             <Box sx={styles.imageCard}>Image placeholder</Box>
            </Grid>
          <Grid item container xs="auto" direction="column" justifyContent="center" alignItems="flex-start">
          <Grid item xs="auto">
              <h2 style={{fontSize: "20px", margin: "0" }}>{props.location}</h2>
          </Grid>    
          <Grid item xs="auto">
            <box style={{ fontSize: "20px", margin: "0" }}>{props.address1}</box>
          </Grid>  
          <Grid item xs="auto">
              <box style={{fontSize: "20px", margin: "0" }}>{props.address2}</box>
          </Grid>  
          </Grid> 
      </Grid>
    </Card>
    </Box>
    
  )
  
  
    
    
  }
