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
import { productsStyles } from "./styles";

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
        ...productsStyles.card,
        backgroundColor: theme.palette.background.alt,
      }}
    >
      <CardContent>
        <Typography
          color={theme.palette.secondary[200]}
          gutterBottom
          fontSize={14}
        >
          {category[0].toUpperCase() + category.substring(1)}
        </Typography>

        <Typography
          variant="h5"
          component="div"
          color={theme.palette.secondary[300]}
        >
          {name}
        </Typography>

        <Typography sx={{ mb: "1.5rem" }}>
          ${Number(price).toFixed(2)}
        </Typography>

        <Rating value={rating} readOnly precision={0.1} />

        <Typography variant="body2">{description}</Typography>
      </CardContent>

      <CardActions>
        <Button
          sx={{ color: theme.palette.secondary[300] }}
          variant="outlined"
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
          <Typography variant="body2">id: {_id}</Typography>
          <Typography variant="body2">Supply Left: {supply}</Typography>
          <Typography variant="body2">
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography variant="body2">
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
    <Box>
      <Header title="PRODUCTS" subtitle="See your list of products" />

      {data || !isLoading ? (
        <Grid container spacing={2} mt={"20px"} sx={{ paddingBottom: 2 }}>
          {data?.map(
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
        <Typography sx={{ mt: "20px" }}>Loading...</Typography>
      )}
    </Box>
  );
};

export default Products;
