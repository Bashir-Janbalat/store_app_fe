import {Box, Container, Typography} from "@mui/material";
import {useLanguage} from "../hooks/useLanguage";
import ProfileCard from "../components/common/ProfileCard";
import {useAuth} from "../hooks/useAuth";
import type {UpdateProfileInput} from "../types/auth";

const ProfilePage = () => {
    const {t} = useLanguage();
    const {user, updateProfile} = useAuth();

    if (!user) {
        throw new Error("User not found");
    }

    const handleSave = async (data: UpdateProfileInput) => {
        await updateProfile(data);
    };

    return (
        <Container maxWidth="md">
            <Box p={4}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {t.nav.profile}
                </Typography>
                <ProfileCard
                    name={user.name}
                    email={user.email}
                    phone={user.phone ?? ""}
                    countryCode={user.countryCode ?? "DE"}
                    onSave={handleSave}
                />
            </Box>
        </Container>
    );
};

export default ProfilePage;
