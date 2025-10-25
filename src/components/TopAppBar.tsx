import React from 'react';
import {
    Box,
    Avatar,
    Typography,
    IconButton,
} from '@mui/material';

export const TopAppBar: React.FC = () => {
    return (
        <Box sx={{ p: 2, pb: 1 }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'between',
                    height: 48,
                    mb: 1,
                }}
            >
                <Avatar
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1jdGY-YhbQ2VrrveiiD0z1NFwWFnXFrk-mvk9Swc_ktbhK8wbS0s3btYL8McFT58hzDmV-Bacrlwt_-iXewf0UYaC-zo4hmlDk-TV4jh8KRSs5Lq6Dpp-wJoYM3BlrpQOuzZQgl4Os3G2TMjXignHg7FTsf5hwFm6sr8sYJem6h5u_pom7ngWcXFIsDQ3dB5gWyJy7NEVgJQtjRpcjG6HdlR_HiW1b98JgKwgzDFZuvZDwwL9Fo6dtK6wIfdUKrKVkeDMtrILbUFX"
                    alt="User profile picture of Alex"
                    sx={{ width: 40, height: 40 }}
                />
                <Box sx={{ flex: 1 }} />
                <IconButton sx={{ p: 0 }}>
                    {/* Add menu or settings icon here if needed */}
                </IconButton>
            </Box>

            <Typography
                variant="h4"
                component="h1"
                sx={{
                    fontWeight: 700,
                    fontSize: '28px',
                    lineHeight: 1.2,
                }}
            >
                Good morning, Alex
            </Typography>
        </Box>
    );
};