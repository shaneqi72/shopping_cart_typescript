import Button from "@material-ui/core/Button";
import { CartItemType } from "../App";
import { makeStyles } from "@material-ui/styles";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  const { image, title, description, price } = item;

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img src={image} alt={title} className={classes.img} />
      <div className={classes.productInfo}>
        <h3>{title}</h3>
        <p>{description.slice(0, 150)}...</p>
        <h3 className={classes.price}>${price}</h3>
      </div>
      <Button onClick={() => handleAddToCart(item)} className={classes.button}>
        Add to cart
      </Button>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    border: "1px solid lightblue",
    borderRadius: "20px",
    height: "100%",
  },
  productInfo: {
    fontFamily: "Arial, Helvetica, san-serif",
    padding: "1rem",
    maxHeight: "100%",
    maxWidth: "100%",
    textAlign: "center",
  },
  button: {
    borderRadius: "0 0 20px 20px",
    width: "100%",
    fontWeight: "bold",
  },
  img: {
    maxHeight: "150px",
    padding: "5px",
    objectFit: "cover",
    borderRadius: "20px 20px 0 0",
  },
  price: {
    textAlign: "center",
  },
});

export default Item;
