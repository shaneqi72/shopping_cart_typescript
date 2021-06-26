import CartItem from "./CartItem";
import { CartItemType } from "../App";
import { makeStyles } from "@material-ui/core";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotalAmonunt = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount * item.price, 0);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotalAmonunt(cartItems).toFixed(2)}</h2>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    fontFamily: "Arial, Helvetica, sans-serif",
    width: "500px",
    padding: "20px",
  },
});

export default Cart;
