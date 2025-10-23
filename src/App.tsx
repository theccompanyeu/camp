import React from 'react'
import {
    Alert,
    AppBar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Checkbox,
    Chip,
    Container,
    Divider,
    FormControlLabel,
    Grid,
    Link,
    MenuItem,
    Snackbar,
    Stack,
    TextField,
    Toolbar,
    Typography,
} from '@mui/material'
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball'
import EmailIcon from '@mui/icons-material/Email'
import ScheduleIcon from '@mui/icons-material/Schedule'
import PlaceIcon from '@mui/icons-material/Place'
import PaymentsIcon from '@mui/icons-material/Payments'
import InfoIcon from '@mui/icons-material/Info'
import {RegistrationPayload, sendRegistrationEmail} from './email'

const positions = ['Guard', 'Forward', 'Center'] as const
const tshirtSizes = ['YS', 'YM', 'YL', 'S', 'M', 'L', 'XL'] as const

export default function App() {
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState<string | null>(null)
    const [error, setError] = React.useState<string | null>(null)

    const formRef = React.useRef<HTMLFormElement>(null)

    function validateEmail(email: string) {
        return /\S+@\S+\.\S+/.test(email)
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = new FormData(e.currentTarget)

        const payload: RegistrationPayload = {
            parent_name: String(form.get('parent_name') || '').trim(),
            parent_email: String(form.get('parent_email') || '').trim(),
            parent_phone: String(form.get('parent_phone') || '').trim(),
            athlete_name: String(form.get('athlete_name') || '').trim(),
            athlete_age: String(form.get('athlete_age') || '').trim(),
            position: String(form.get('position') || ''),
            tshirt_size: String(form.get('tshirt_size') || ''),
            notes: String(form.get('notes') || '').trim(),
            consent: Boolean(form.get('consent')),
        }

        if (!payload.parent_name || !payload.athlete_name) {
            setError('Συμπλήρωσε ονόματα κηδεμόνα & αθλητή/τριας')
            return
        }
        if (!validateEmail(payload.parent_email)) {
            setError('Έγκυρο email κηδεμόνα απαιτείται')
            return
        }
        if (!/^[+0-9\-\s]{7,}$/.test(payload.parent_phone)) {
            setError('Τηλέφωνο μη έγκυρο')
            return
        }
        if (!payload.consent) {
            setError('Χρειάζεται συγκατάθεση για επεξεργασία δεδομένων')
            return
        }

        try {
            setLoading(true)
            await sendRegistrationEmail(payload)
            setSuccess('Η αίτηση στάλθηκε! Θα επικοινωνήσουμε άμεσα.')
            setError(null)
            formRef.current?.reset()
        } catch (err: any) {
            console.error(err)
            setError('Κάτι πήγε στραβά με την αποστολή. Δοκίμασε ξανά.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box>
            {/* Κεφαλίδα */}
            <AppBar position="sticky" color="primary" enableColorOnDark>
                <Toolbar sx={{gap: 1}}>
                    <SportsBasketballIcon/>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        ΑΣΑ Summer Camp
                    </Typography>
                    <Button href="#register" color="secondary" variant="contained">Εγγραφή</Button>
                </Toolbar>
            </AppBar>

            {/* Εισαγωγικό section */}
            <Box
                sx={{
                    position: 'relative',
                    // 1) Σκούρο overlay + απαλά χρωματικά gradients + εικόνα από κάτω
                    backgroundImage: [
                        'linear-gradient(rgba(0,0,0,0.62), rgba(0,0,0,0.62))',
                        'radial-gradient(circle at 15% 25%, rgba(255,111,0,0.14), transparent 40%)',
                        'radial-gradient(circle at 85% 35%, rgba(13,71,161,0.18), transparent 45%)',
                        'url(https://www.sport24.gr/wp-content/uploads/2023/11/anagennisi-koupa-1200x800.jpg)',
                    ].join(', '),
                    backgroundSize: 'auto, auto, auto, cover',
                    backgroundPosition: 'center, center, center, center',
                    backgroundRepeat: 'no-repeat, no-repeat, no-repeat, no-repeat',

                    // ύψος/spacing
                    py: {xs: 10, md: 14},
                    minHeight: {xs: 420, md: 520},

                    // edge-to-edge look
                    borderBottom: theme => `1px solid ${theme.palette.common.black}20`,
                }}
            >
                <Container maxWidth="lg">
                    {/* 2) Glass card πίσω από τα κείμενα για “δέσιμο” και αναγνωσιμότητα */}
                    <Box
                        sx={{
                            mx: 'auto',
                            maxWidth: 1000,
                            px: {xs: 2.5, md: 4},
                            py: {xs: 3, md: 4},
                            borderRadius: 3,
                            bgcolor: 'rgba(0,0,0,0.28)',
                            backdropFilter: 'blur(2px)',
                            boxShadow: '0 12px 40px rgba(0,0,0,.35)',
                            textAlign: 'center',
                            color: '#fff',
                        }}
                    >
                        <Chip label="Καλοκαίρι 2025" color="secondary" sx={{mb: 2, fontWeight: 600}}/>

                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 800,
                                lineHeight: 1.1,
                                textShadow: '0 4px 18px rgba(0,0,0,.55)',
                                mb: 1.5,
                            }}
                        >
                            Αναγέννηση Basketball Camp
                        </Typography>

                        <Typography sx={{color: 'rgba(255,255,255,.92)', mb: 3}}>
                            Δεξιότητες, shooting labs, strength & conditioning, βίντεο-ανάλυση και παιχνίδι. Ηλικίες
                            8–17.
                        </Typography>

                        <Stack direction={{xs: 'column', sm: 'row'}} spacing={2} justifyContent="center">
                            <Button
                                href="#register"
                                size="large"
                                variant="contained"
                                endIcon={<EmailIcon/>}
                                sx={{
                                    px: 3,
                                    fontWeight: 700,
                                    boxShadow: '0 8px 24px rgba(0,0,0,.3)',
                                }}
                            >
                                Κάνε Εγγραφή
                            </Button>

                            <Button
                                href="#info"
                                size="large"
                                variant="outlined"
                                sx={{
                                    px: 3,
                                    color: '#fff',
                                    borderColor: 'rgba(255,255,255,.65)',
                                    '&:hover': {borderColor: '#fff', backgroundColor: 'rgba(255,255,255,.08)'},
                                }}
                            >
                                Μάθε περισσότερα
                            </Button>
                        </Stack>
                    </Box>
                </Container>
            </Box>


            {/* Πλέγμα Καρτών */}
            <Container id="info" sx={{py: 6}}>
                <Grid container spacing={3}>
                    {/* Πρόγραμμα */}
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardHeader avatar={<ScheduleIcon/>} title="Πρόγραμμα" subheader="10–24 Ιουλίου"/>
                            <CardContent>
                                <Typography>Δευτέρα–Παρασκευή</Typography>
                                <Typography color="text.secondary">09:00–14:00</Typography>
                                <Divider sx={{my: 2}}/>
                                <Typography variant="body2" color="text.secondary">
                                    Κάθε μέρα διαφορετικό focus: ball handling, finishing, footwork, shooting μηχανική,
                                    παιχνίδι 5vs5.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Τοποθεσία */}
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardHeader avatar={<PlaceIcon/>} title="Τοποθεσία" subheader="Κλειστό Αρκαλοχωρίου"/>
                            <CardContent>
                                <Typography>Κλειστό Γυμναστήριο, Αρκαλοχώρι</Typography>
                                <Typography color="text.secondary">Εύκολη πρόσβαση • Parking</Typography>
                                <Divider sx={{my: 2}}/>
                                <Box sx={{
                                    height: 160,
                                    borderRadius: 2,
                                    backgroundImage:
                                        'url(https://www.cretalive.gr/sites/default/files/styles/og_image/public/2025-10/sxizas-anagennisi-arkaloxoriou.jpg?itok=fJvRgdXq?q=80&w=1200&auto=format&fit=crop)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}/>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Κόστος */}
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardHeader avatar={<PaymentsIcon/>} title="Κόστος Συμμετοχής" subheader="100€ / παιδί"/>
                            <CardContent>
                                <Typography>Έκπτωση 15% για αδέρφια</Typography>
                                <Divider sx={{my: 2}}/>
                                <Typography variant="body2" color="text.secondary">
                                    Περιλαμβάνει μπλουζάκι camp, νερό/φρούτα, βασική ασφάλιση και φωτογραφικό υλικό.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Πληροφορίες / Προπονητές */}
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardHeader avatar={<InfoIcon/>} title="Προπονητές" subheader="Έμπειρο team"/>
                            <CardContent>
                                <Typography>Head Coach: Α. Μαραγκάκης (ΛΕΜΕ ΤΩΡΑ)</Typography>
                                <Typography color="text.secondary">Assistant: Κανένας, θα τα κάνει όλα ο σύντεκνος
                                    μου</Typography>
                                <Divider sx={{my: 2}}/>
                                <Typography variant="body2" color="text.secondary">
                                    Μικρά γκρουπ & εξατομικευμένο feedback. Πιστοποιημένο πρόγραμμα προπόνησης.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Δήλωση Συμμετοχής (φόρμα) */}
                    <Grid item xs={12} md={8} id="register">
                        <Card>
                            <CardHeader title="Δήλωση Συμμετοχής" subheader="Συμπλήρωσε τη φόρμα για εγγραφή"/>
                            <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <TextField name="parent_name" label="Ονοματεπώνυμο Κηδεμόνα" fullWidth
                                                       required/>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField name="parent_email" type="email" label="Email Κηδεμόνα" fullWidth
                                                       required/>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField name="parent_phone" label="Τηλέφωνο Επικοινωνίας" fullWidth
                                                       required/>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField name="athlete_name" label="Ονοματεπώνυμο Αθλητή/τριας" fullWidth
                                                       required/>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField name="athlete_age" type="number" label="Ηλικία" fullWidth
                                                       required inputProps={{min: 6, max: 18}}/>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField name="position" label="Θέση" select fullWidth
                                                       defaultValue={positions[0]}>
                                                {positions.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField name="tshirt_size" label="Μέγεθος T-Shirt" select fullWidth
                                                       defaultValue={tshirtSizes[2]}>
                                                {tshirtSizes.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField name="notes" label="Σχόλια/Ιατρικές πληροφορίες" multiline
                                                       minRows={3} fullWidth/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel control={<Checkbox name="consent"/>} label={
                                                <Typography variant="body2">
                                                    Συμφωνώ με την <Link href="#" onClick={(e) => e.preventDefault()}>πολιτική
                                                    απορρήτου</Link> και την επεξεργασία των στοιχείων μου για την
                                                    εγγραφή στο camp.
                                                </Typography>
                                            }/>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions sx={{px: 2, pb: 2}}>
                                    <Button type="submit" size="large" variant="contained" disabled={loading}>
                                        {loading ? 'Αποστολή…' : 'Υποβολή Αίτησης'}
                                    </Button>
                                </CardActions>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            {/* Υποσέλιδο */}
            <Box component="footer" sx={{py: 6, textAlign: 'center'}}>
                <Typography variant="body2" color="text.secondary">
                    © {new Date().getFullYear()} Basket Camp • Επικοινωνία: <Link
                    href="mailto:camp@asanagennisi.gr">camp@asanagennisi.gr</Link>
                </Typography>
            </Box>

            <Snackbar open={Boolean(success)} autoHideDuration={6000} onClose={() => setSuccess(null)}>
                <Alert onClose={() => setSuccess(null)} severity="success" variant="filled">{success}</Alert>
            </Snackbar>
            <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
                <Alert onClose={() => setError(null)} severity="error" variant="filled">{error}</Alert>
            </Snackbar>
        </Box>
    )
}
