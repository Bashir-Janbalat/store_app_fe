import {Box, Skeleton, Typography} from "@mui/material";
import {useLanguage} from "../../hooks/useLanguage";

const LoadingSkeleton = () => {
    const {t} = useLanguage();
    return (
        <Box padding={2}>
            <Typography variant="h6" mb={2}>
                {t.loading.message || "Loading data..."}
            </Typography>
            {[...Array(5)].map((_, index) => (
                <Box key={index} mb={2}>
                    <Skeleton variant="text" width="60%" height={30}/>
                    <Skeleton variant="rectangular" width="100%" height={60}/>
                </Box>
            ))}
        </Box>
    );
};

export default LoadingSkeleton;
