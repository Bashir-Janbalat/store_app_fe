import React, {useState} from "react";
import {Box, Button, Divider, Drawer, IconButton, Slider, Typography,} from "@mui/material";
import {Close, FilterAlt} from "@mui/icons-material";
import {useIsMobile} from "../../hooks/useIsMobile.ts";
import {useLanguage} from "../../hooks/useLanguage.ts";

interface FilterSidebarProps {
    onApply: (filters: { minPrice: number; maxPrice: number }) => void;
    onReset: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({onApply, onReset}) => {
    const isMobile = useIsMobile();
    const {t} = useLanguage();
    const [open, setOpen] = useState(false);
    const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);

    const toggleDrawer = () => setOpen(!open);

    const content = (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">{t.filter.title}</Typography>
                {isMobile && (
                    <IconButton onClick={toggleDrawer}>
                        <Close/>
                    </IconButton>
                )}
            </Box>

            <Divider sx={{mb: 2}}/>

            <Typography gutterBottom>{t.filter.price}</Typography>
            <Slider
                value={priceRange}
                onChange={(_, value) => setPriceRange(value as number[])}
                valueLabelDisplay="auto"
                min={0}
                max={1500}
                step={10}
            />

            <Box mt={3} display="flex" flexDirection="column" gap={1}>
                <Button variant="contained" onClick={() => {
                    onApply({minPrice: priceRange[0], maxPrice: priceRange[1]});
                    toggleDrawer();
                }}>
                    {t.filter.applyFilters}
                </Button>
                <Button variant="text" onClick={() => {
                    setPriceRange([0, 1000]);
                    onReset();
                }}>
                    {t.filter.reset}
                </Button>
            </Box>
        </>
    );

    return (
        <>
            {isMobile ? (
                <>
                    <Button
                        variant="outlined"
                        startIcon={<FilterAlt/>}
                        onClick={toggleDrawer}
                        sx={{mb: 2}}
                    >
                        {t.filter.title}
                    </Button>
                    <Drawer anchor="left" open={open} onClose={toggleDrawer}>
                        <Box
                            sx={{
                                width: '85vw',
                                p: 2,
                                boxSizing: 'border-box',
                            }}
                        >
                            {content}
                        </Box>
                    </Drawer>
                </>
            ) : (
                <Box
                    sx={{
                        width: {
                            xs: '100%',
                            sm: 200,
                            md: 175,
                            lg: 250
                        },
                        borderRight: "1px solid #ddd",
                        minHeight: "100vh",
                        position: "sticky",
                        top: 0,
                        p: 2,
                        boxSizing: 'border-box',
                        backgroundColor: "#fff",
                    }}
                >
                    {content}
                </Box>
            )}
        </>
    );
};

export default FilterSidebar;
