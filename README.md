# Basket Camp (Vite + React + TypeScript + MUI + EmailJS)

## Ανάπτυξη

```bash
npm i
npm run dev
```

## Παραγωγή

```bash
npm run build
npm run preview
```

## Ρυθμίσεις EmailJS

- Γέμισε τα κλειδιά στο `.env` με βάση το `.env.example`.
- Φτιάξε template με μεταβλητές: parent_name, parent_email, parent_phone, athlete_name, athlete_age, position,
  tshirt_size, notes, consent, to_email.

## GitHub Pages

- Αν ανεβάσεις σε repo π.χ. `/basket-camp/`, άλλαξε το `base` στο `vite.config.ts` σε `'/basket-camp/'`.
- Τρέξε `npm run deploy`.
