import {CircularProgress, Box, Typography} from "@mui/material";
import {useLanguage} from "../../hooks/useLanguage.ts";

const LoadingSpinner = () => {
    const {t} = useLanguage();
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="60vh"
        >
            <CircularProgress size={60} thickness={5}/>
            <Typography variant="h6" mt={2} color="text.secondary">
                {t.loading.message || "Loading data..."}
            </Typography>
        </Box>
    );
};

export default LoadingSpinner;
