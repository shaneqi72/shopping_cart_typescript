import { useState } from "react";
import { useQuery } from "react-query";
import { theme } from "./theme";

import Item from "./components/Item";
import Cart from "./components/Cart";

import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core";

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {
  Drawer,
  IconButton,
  LinearProgress,
  Grid,
  Badge,
} from "@material-ui/core";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const App = () => {
  const classes = useStyles();

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const getProducts = async (): Promise<CartItemType[]> => {
    const fetchedData = await (
      await fetch("https://fakestoreapi.com/products")
    ).json();
    return fetchedData;
  };

  const getTotalItemsAmount = (items: CartItemType[]): number => {
    return items.reduce((acc: number, item) => acc + item.amount, 0);
  };

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemIncart = prev.find((item) => item.id === clickedItem.id);

      if (isItemIncart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CartItemType[])
    );
  };
  const { data, isLoading, error } = useQuery("products", getProducts);

  if (isLoading) return <LinearProgress />;
  if (error) throw new Error("Something Wrong");

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        </Drawer>
        <IconButton
          className={classes.styledButton}
          onClick={() => setCartOpen(true)}
        >
          <Badge badgeContent={getTotalItemsAmount(cartItems)} color="error">
            <AddShoppingCartIcon />
          </Badge>
        </IconButton>
        <Grid container spacing={3}>
          {data?.map((item: CartItemType) => (
            <Grid item key={item.id} xs={12} sm={4} md={3} lg={2}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      </div>
    </ThemeProvider>
  );
};

const useStyles = makeStyles({
  root: {
    margin: "40px",
  },
  styledButton: {
    position: "fixed",
    zIndex: 100,
    right: "20px",
    top: "20px",
  },
});

export default App;
