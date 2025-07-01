import {useRef} from 'react';
import {Box, Chip, Fade, IconButton, Typography} from '@mui/material';
import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material';

interface ItemSliderProps<T> {
    title: string;
    items: T[];
    selectedItem: string | null;
    onSelect: (item: string | null) => void;
    getLabel: (item: T) => string;
    getId: (item: T) => string | number;
}

function ItemSlider<T>({
                           title,
                           items,
                           selectedItem,
                           onSelect,
                           getLabel,
                           getId,
                       }: ItemSliderProps<T>) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (offset: number) => {
        scrollRef.current?.scrollBy({left: offset, behavior: 'smooth'});
    };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, p: 2, backgroundColor: '#fafafa', borderRadius: 2}}>
            <Typography variant="h6" sx={{fontWeight: 600, color: '#2c3e50', textAlign: 'center', mb: 1}}>
                {title}
            </Typography>

            <Box display="flex" alignItems="center" gap={1} sx={{position: 'relative'}}>
                <IconButton onClick={() => scroll(-250)} size="small" sx={iconButtonStyle}
                            onDoubleClick={e => e.stopPropagation()}>
                    <ArrowBackIos sx={{fontSize: 16}}/>
                </IconButton>

                <Box
                    ref={scrollRef}
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {display: 'none'},
                        gap: 1.5,
                        px: 1,
                        py: 0.5,
                        flex: 1,
                    }}
                >
                    {items.map((item) => {
                        const label = getLabel(item);
                        const isSelected = selectedItem === label;

                        return (
                            <Fade in={true} key={getId(item)}>
                                <Chip
                                    label={label}
                                    onClick={() => onSelect(isSelected ? null : label)}
                                    sx={{
                                        fontSize: '0.95rem',
                                        fontWeight: isSelected ? 600 : 400,
                                        cursor: 'pointer',
                                        height: 40,
                                        minWidth: 200,
                                        maxWidth: 220,
                                        px: 2,
                                        backgroundColor: isSelected ? '#2196F3' : 'white',
                                        color: isSelected ? 'white' : '#555',
                                        border: isSelected ? 'none' : '1px solid #e0e0e0',
                                        boxShadow: isSelected
                                            ? '0 2px 8px rgba(33, 150, 243, 0.3)'
                                            : '0 1px 3px rgba(0,0,0,0.1)',
                                        transition: 'all 0.2s ease',
                                        '& .MuiChip-label': {
                                            width: '100%',
                                            textAlign: 'center',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        },
                                        '&:hover': {
                                            backgroundColor: isSelected ? '#1976d2' : '#f8f9fa',
                                            transform: 'translateY(-1px)',
                                            boxShadow: isSelected
                                                ? '0 4px 12px rgba(33, 150, 243, 0.4)'
                                                : '0 2px 6px rgba(0,0,0,0.15)',
                                        },
                                        '&:active': {
                                            transform: 'translateY(0)',
                                        },
                                    }}
                                />
                            </Fade>
                        );
                    })}
                </Box>

                <IconButton onClick={() => scroll(250)} size="small" sx={iconButtonStyle}
                            onDoubleClick={e => e.stopPropagation()}>
                    <ArrowForwardIos sx={{fontSize: 16}}/>
                </IconButton>
            </Box>
        </Box>
    );
}

const iconButtonStyle = {
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    color: '#666',
    '&:hover': {
        backgroundColor: '#f5f5f5',
        color: '#2196F3',
    },
    transition: 'all 0.2s ease',
    width: 36,
    height: 36,
};

export default ItemSlider;
