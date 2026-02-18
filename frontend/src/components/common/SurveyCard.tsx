import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    MoreVert as MoreVertIcon,
    FileUpload as ExportIcon,
} from '@mui/icons-material'; 
import { Box, Button, Card, CardActions, CardContent, Chip, IconButton, Typography } from '@mui/material';


const cardStyles = {
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
        border: "2px solid #444",
        borderRadius: 8,
        "&:hover": {
            transform: "translateY(-4px)",
        },
    },
    header: {
        display: "flex",
        letterSpacing: 2,
        justifyContent: "space-between",
        mb: 2,
    },
    actions: {
        px: 2,
        pb: 2,
        justifyContent: "space-between",
    },
};



interface Survey {
    _id: string;
    title: string;
    description?: string;
    status: "published" | "draft";
    updatedAt: string;
}

interface SurveyCardProps {
    survey: Survey;
    onEdit: () => void;
    onDelete: () => void;
    onExport: () => void;
}

export const SurveyCard = ({
    survey,
    onEdit,
    onDelete,
    onExport,
}: SurveyCardProps) => {
    return (
        <Card sx={cardStyles.card}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={cardStyles.header}>
                    <Chip
                        label={survey.status === "published" ? "Published" : "Draft"}
                        size="small"
                        color={survey.status === "published" ? "success" : "default"}
                        variant="outlined"
                    />
                    <IconButton size="small">
                        <MoreVertIcon  />
                    </IconButton>
                </Box>

                <Typography variant="h6" letterSpacing={2} gutterBottom sx={{ fontWeight: 700 }}>
                    {survey.title}
                </Typography>

                <Typography variant="body2" letterSpacing={1} color="text.secondary" sx={{ mb: 2 }}>
                    {survey.description || "No description provided."}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                    Updated {new Date(survey.updatedAt).toLocaleDateString()}
                </Typography>
            </CardContent>

            <CardActions sx={cardStyles.actions}>
                <Button startIcon={<EditIcon />} size="medium" onClick={onEdit}>
                    Edit
                </Button>

                <IconButton size="small" color="primary" onClick={onExport}>
                    <ExportIcon fontSize="medium" />
                </IconButton>

                <IconButton size="small" color="error" onClick={onDelete}>
                    <DeleteIcon fontSize="medium" />
                </IconButton>
            </CardActions>
        </Card>
    );
};
