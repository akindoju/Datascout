import { FC, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  Rating,
  CardActions,
  Button,
  Collapse,
  Grid,
} from "@mui/material";
import Header from "../../components/Header";
import { useGetProductsQuery } from "../../redux/api";
import { IThemeSettings } from "../../interfaces";

interface IProps {
  _id: string;
  name: string;
  description: string;
  price: string;
  rating: number;
  category: string;
  supply: string;
  stat: {
    yearlySalesTotal: string;
    yearlyTotalSoldUnits: string;
  };
}

const Product: FC<IProps> = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme: IThemeSettings = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>

        <Typography variant="h5" component="div">
          {name}
        </Typography>

        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>

        <Rating value={rating} readOnly precision={0.1} />

        <Typography variant="body2">{description}</Typography>
      </CardContent>

      <CardActions>
        <Button
          // color="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>

      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products: FC = () => {
  const { data, isLoading } = useGetProductsQuery();

  return (
    <Box m="0.8rem 1.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />

      {data || !isLoading ? (
        <Grid container spacing={2} mt={"20px"}>
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }: IProps) => (
              <Grid item md={3} xs={12}>
                <Product
                  key={_id}
                  _id={_id}
                  name={name}
                  description={description}
                  price={price}
                  rating={rating}
                  category={category}
                  supply={supply}
                  stat={stat}
                />
              </Grid>
            )
          )}
        </Grid>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;
