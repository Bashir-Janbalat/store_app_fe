import {Container} from '@mui/material';
import AddressList from "../components/Addresses/AddressList.tsx";


const AddressesPage = () => {


    return (
        <Container sx={{mt: 4}}>
            <AddressList/>
        </Container>
    );
};
export default AddressesPage;