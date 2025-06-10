import {Grid} from "@mui/material";
import WishlistSummary from "../components/common/WishlistSummary";

const WishlistPage = () => {

    return (
        <Grid container sx={{sx: 12, md: 6, mt: 4}} display="flex" justifyContent={'center'}>
            <WishlistSummary/>
        </Grid>
    );
};

export default WishlistPage;