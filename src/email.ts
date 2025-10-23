import emailjs from '@emailjs/browser'

// Reads public key from env
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string)

export type RegistrationPayload = {
    parent_name: string
    parent_email: string
    parent_phone: string
    athlete_name: string
    athlete_age: string
    position: string
    tshirt_size: string
    notes?: string
    consent: boolean
}

export async function sendRegistrationEmail(data: RegistrationPayload) {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string

    if (!serviceId || !templateId || !import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
        throw new Error('EmailJS environment variables are missing. Check your .env file.')
    }

    // Map fields to your EmailJS template variables
    const templateParams = {
        parent_name: data.parent_name,
        parent_email: data.parent_email,
        parent_phone: data.parent_phone,
        athlete_name: data.athlete_name,
        athlete_age: data.athlete_age,
        position: data.position,
        tshirt_size: data.tshirt_size,
        notes: data.notes || '-',
        consent: data.consent ? 'Yes' : 'No',
        to_email: import.meta.env.VITE_REGISTRATION_TARGET_EMAIL || '', // Optional: for routing in template
    }

    return emailjs.send(serviceId, templateId, templateParams)
}
