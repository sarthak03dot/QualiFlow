import React, { useRef, useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    TextField,
    Button,
    Switch,
    FormControlLabel,
    Divider,
    Avatar,
    IconButton,
} from '@mui/material';
import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Settings = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    const inputRef = useRef<HTMLInputElement>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const blobUrl = URL.createObjectURL(file);
        setAvatarUrl(blobUrl);
    };

    // Cleanup blob URL to avoid memory leaks
    useEffect(() => {
        return () => {
            if (avatarUrl) {
                URL.revokeObjectURL(avatarUrl);
            }
        };
    }, [avatarUrl]);

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 800 }}>
                Settings
            </Typography>

            <Grid container spacing={4}>
                {/* Left column */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                        Profile Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Manage your public profile and personal information.
                    </Typography>
                </Grid>

                {/* Profile Card */}
                <Grid size={{ xs: 10, md: 8 }}>
                    <Paper sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 3 }}>
                            <Box sx={{ position: 'relative' }}>
                                <Avatar
                                    src={avatarUrl ?? undefined}
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        bgcolor: 'primary.main',
                                        fontSize: '2rem',
                                    }}
                                >
                                    {!avatarUrl && user?.name?.charAt(0)}
                                </Avatar>

                                <IconButton
                                    color="primary"
                                    size="small"
                                    onClick={() => inputRef.current?.click()}
                                    sx={{
                                        position: 'absolute',
                                        bottom: -5,
                                        right: -5,
                                        bgcolor: 'background.paper',
                                        border: '1px solid rgba(0,0,0,0.1)',
                                    }}
                                >
                                    <PhotoCameraIcon fontSize="small" />
                                </IconButton>

                                <input
                                    ref={inputRef}
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </Box>

                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    {user?.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {user?.email}
                                </Typography>
                            </Box>
                        </Box>

                        <Grid container spacing={3}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    defaultValue={user?.name}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    defaultValue={user?.email}
                                    disabled
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    label="Bio"
                                    multiline
                                    rows={3}
                                    placeholder="Tell us about yourself..."
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained">Save Changes</Button>
                        </Box>
                    </Paper>
                </Grid>

                {/* Divider */}
                <Grid size={{ xs: 12 }}>
                    <Divider sx={{ my: 2 }} />
                </Grid>

                {/* Preferences */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                        Preferences
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Customize your experience and notification settings.
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <FormControlLabel
                                control={<Switch defaultChecked />}
                                label={
                                    <Box>
                                        <Typography fontWeight={600}>
                                            Email Notifications
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Receive weekly reports on eligibility metrics.
                                        </Typography>
                                    </Box>
                                }
                            />

                            <FormControlLabel
                                control={<Switch defaultChecked />}
                                label={
                                    <Box>
                                        <Typography fontWeight={600}>
                                            Security Alerts
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Get notified of suspicious login attempts.
                                        </Typography>
                                    </Box>
                                }
                            />

                            <FormControlLabel
                                control={<Switch />}
                                label={
                                    <Box>
                                        <Typography fontWeight={600}>
                                            Public Profile
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Allow others to see your published flows.
                                        </Typography>
                                    </Box>
                                }
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Settings;
