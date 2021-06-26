import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { CartItemType } from "../App";

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => {
  const { price, amount, title, id, image } = item;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <h3>{title}</h3>
        <div className={classes.information}>
          <p>Price: ${price}</p>
          <p>Total: ${(amount * price).toFixed(2)}</p>
        </div>

        <div className={classes.buttons}>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(id)}
          >
            -
          </Button>

          <p>{amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
        </div>
      </div>

      <img src={image} alt={title} className={classes.image} />
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Arial, Helvetica, sans-serif",
    borderBottom: "1px solid lightblue",
    paddingBottom: "20px",
  },
  wrapper: {
    flex: 1,
  },
  information: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    height: "50px",
  },
  image: {
    maxWidth: "80px",
    maxHeight: "100px",
    paddingTop: "20px",
    objectFit: "cover",
    marginLeft: "40px",
  },
});

export default CartItem;
