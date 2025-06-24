import React, {useEffect, useMemo, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    TextField,
    Tooltip,
} from "@mui/material";
import {useLanguage} from "../../hooks/useLanguage.ts";
import {isValidPhoneNumber} from "libphonenumber-js";
import {countries_ar, countries_en, type Country} from "../../types/countries.ts";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {toast} from "react-hot-toast";
import {useAuth} from "../../hooks/useAuth.ts";
import type {UpdateProfileInput} from "../../types/auth.ts";

interface ProfileCardProps {
    name: string;
    email: string;
    phone: string;
    countryCode: string;
    onSave: (data: UpdateProfileInput) => Promise<void>;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
                                                     name,
                                                     email,
                                                     phone,
                                                     countryCode = "DE",
                                                     onSave,
                                                 }) => {
    const {t, language} = useLanguage();
    const {sendResetLinkFor} = useAuth();

    const [form, setForm] = useState({name, phone});
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const countries = useMemo(() => {
        return language === "en" ? countries_en : countries_ar;
    }, [language]);

    const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);

    useEffect(() => {
        setForm({name, phone});
        const found = countries.find((c) => c.code === countryCode);
        if (found) setSelectedCountry(found);
    }, [name, phone, countryCode, countries]);

    const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({...prev, [field]: e.target.value}));
    };

    const isFormChanged = () =>
        form.name !== name ||
        form.phone !== phone ||
        selectedCountry.code !== countryCode;

    const handleSave = async () => {
        const fullPhone = `${selectedCountry.dialCode}${form.phone}`;
        setPhoneError(false);
        if (!isValidPhoneNumber(fullPhone)) {
            setPhoneError(true);
            return;
        }

        if (!isFormChanged()) {
            setIsEditing(false);
            return;
        }

        setLoading(true);
        try {
            await onSave({
                ...form,
                dialCode: selectedCountry.dialCode,
                countryCode: selectedCountry.code,
            });
            toast.success(t.auth.updatedSuccessfully);
            setIsEditing(false);
        } catch (error) {
            toast.error(t.common.errorOccurred);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        setLoading(true);
        try {
            const status = await sendResetLinkFor(email);
            if (status === 200) {
                toast.success(t.auth.checkEmailDescription);
            } else {
                toast.error(t.auth.errorOccurredSendingRequest);
            }
        } catch {
            toast.error(t.auth.errorOccurredSendingRequest);
        } finally {
            setLoading(false);
        }
    };

    const avatarLetter = form.name?.charAt(0)?.toUpperCase() || "?";

    return (
        <Card
            sx={{
                sm: 12, md: 6, lg: 4,
                p: 3,
                borderRadius: 3,
                boxShadow: 3,
                direction: language === "ar" ? "rtl" : "ltr",
            }}
        >
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <Avatar sx={{width: 80, height: 80, bgcolor: "primary.main", fontSize: 32}}>
                    {avatarLetter}
                </Avatar>

                <CardContent sx={{width: "100%"}}>
                    <TextField
                        label={t.auth.name}
                        value={form.name}
                        onChange={handleChange("name")}
                        fullWidth
                        margin="normal"
                        disabled={!isEditing}
                    />
                    <TextField
                        label={t.auth.email}
                        value={email}
                        fullWidth
                        margin="normal"
                        disabled
                    />

                    <Box display="flex" alignItems="center" gap={1}>
                        <TextField
                            label={t.auth.password}
                            value="********"
                            fullWidth
                            margin="normal"
                            disabled
                        />
                        <Tooltip title={t.auth.resetPassword}>
                            <IconButton
                                onClick={handleResetPassword}
                                aria-label="reset password"
                            >
                                <RestartAltIcon/>
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Box display="flex" gap={1} mt={2}>
                        <Select
                            value={selectedCountry.code}
                            onChange={(e) => {
                                const newCountry = countries.find((c) => c.code === e.target.value);
                                if (newCountry) setSelectedCountry(newCountry);
                            }}
                            disabled={!isEditing}
                            sx={{minWidth: 120}}
                        >
                            {countries.map((country) => (
                                <MenuItem key={country.code} value={country.code}>
                                    {country.name} ({country.dialCode})
                                </MenuItem>
                            ))}
                        </Select>

                        <TextField
                            label={t.auth.phone}
                            value={form.phone}
                            onChange={handleChange("phone")}
                            fullWidth
                            disabled={!isEditing}
                            error={phoneError}
                            helperText={phoneError ? t.auth.phoneInvalid : ""}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {selectedCountry.dialCode}
                                        </InputAdornment>
                                    ),
                                }
                            }}
                        />
                    </Box>
                </CardContent>

                {isEditing ? (
                    <Button variant="contained" onClick={handleSave} disabled={loading}>
                        {loading ? t.common.loading : t.common.save}
                    </Button>
                ) : (
                    <Button variant="outlined" onClick={() => setIsEditing(true)}>
                        {t.common.edit}
                    </Button>
                )}
            </Box>
        </Card>
    );
};

export default ProfileCard;
