import {Grid} from "@mui/material";
import CartSummary from "../components/common/CartSummary.tsx";

const CartPage = () => {
    return (
        <Grid container sx={{sx: 12, md: 6, mt: 4}} display="flex" justifyContent={'center'}>
            <CartSummary/>
        </Grid>
    );
}

export default CartPage;