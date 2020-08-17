import React, { useEffect, useState } from "react";
import axios from "axios";
import classnames from "classnames";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    backgroundColor:"#A9A9F5",
    color:"#FFF",

  },
  content: {
    alignItems: "center",
    display: "flex",
    
  },
  title: {
    fontWeight: 700,

  },
  avatar: {
    backgroundColor: green[500],
    height: 56,
    width: 56,
    
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    // marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  differenceIcon: {
    color: "rgb(26, 26, 26)",
    
  },
  differenceValue: {
    color: green[700],
    
    // marginRight: theme.spacing(1),
  },
}));

function TotalReservation() {
  const classes = useStyles();
  const [ReservationCount, setReservationCount] = useState(0);
  const [ProductCount, setProductCount] = useState(0);


  

  useEffect(() => {
    axios
      .get("/api/sales/getReservationSales")
      .then(response => {
        if (response.data.success) {                    
          let reservationlist = [];          
          response.data.result.forEach(obj => {      
            reservationlist.push(obj.price);                      
          });
          const reducer = (accumulator, currentValue) => accumulator + currentValue; //배열내에서 수계산
          const flatlist = reservationlist.flat(); //평탄화 함수!!!          
          setReservationCount(flatlist.reduce(reducer));
        } else {
          console.log("실패");
        }
      })
      .catch(err => {
        console.log(err);
      });

      axios
      .get("/api/sales/getProductSales")
      .then(response => {
        if (response.data.success) {                    
          const reducer = (accumulator, currentValue) => accumulator + currentValue; //배열내에서 수계산        
          setProductCount(response.data.arr.reduce(reducer));
        } else {
          console.log("실패");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);  
  
  return (
    <Card className={classnames(classes.root)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              TOTAL SALES
            </Typography>
            <Typography variant="h3">
                    {ReservationCount+ProductCount}원
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
                {/* 아이콘 */}
              <AttachMoneyOutlinedIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default TotalReservation;