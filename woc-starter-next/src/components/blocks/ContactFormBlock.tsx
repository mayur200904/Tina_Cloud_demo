'use client';

import { useState } from 'react';

interface FormField {
    label?: string | null;
    name?: string | null;
    type?: string | null;
    required?: boolean | null;
    placeholder?: string | null;
}

interface ContactFormBlockProps {
    eyebrow?: string | null;
    heading?: string | null;
    subheading?: string | null;
    formspreeId?: string | null;
    successMessage?: string | null;
    fields?: (FormField | null)[] | null;
    showAddress?: boolean | null;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
}

const DEFAULT_FIELDS: FormField[] = [
    { label: 'Full Name', name: 'name', type: 'text', required: true, placeholder: 'Your name' },
    { label: 'Email Address', name: 'email', type: 'email', required: true, placeholder: 'your@email.com' },
    { label: 'Phone Number', name: 'phone', type: 'tel', required: false, placeholder: '+1 (555) 000-0000' },
    { label: 'Message', name: 'message', type: 'textarea', required: true, placeholder: 'Tell us about your project...' },
];

export default function ContactFormBlock({
    eyebrow,
    heading,
    subheading,
    formspreeId,
    successMessage = "Thank you! We'll be in touch soon.",
    fields,
    showAddress = false,
    phone,
    email,
    address,
}: ContactFormBlockProps) {
    const [submitted, setSubmitted] = useState(false);

    const formFields =
        fields && fields.filter(Boolean).length > 0
            ? (fields.filter(Boolean) as FormField[])
            : DEFAULT_FIELDS;

    const formAction = formspreeId ? `https://formspree.io/f/${formspreeId}` : '#';

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        if (!formspreeId) return; // Let native HTML5 handle if no ID
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        try {
            const res = await fetch(formAction, {
                method: 'POST',
                body: data,
                headers: { Accept: 'application/json' },
            });
            if (res.ok) {
                form.reset();
                setSubmitted(true);
            }
        } catch (_) { }
    }

    return (
        <section className="woc-section woc-section--surface" id="contact">
            <div className="woc-container">
                <div className={`woc-contact${showAddress ? ' woc-contact--with-sidebar' : ''}`}>
                    {/* Heading + Form */}
                    <div className="woc-contact__main">
                        <div className="woc-section-header" style={{ marginBottom: '2rem', maxWidth: '40rem' }}>
                            {eyebrow && <p className="woc-eyebrow">{eyebrow}</p>}
                            <h2 className="woc-h2" style={{ marginTop: '0.5rem' }}>{heading}</h2>
                            {subheading && <p className="woc-lead" style={{ marginTop: '0.75rem' }}>{subheading}</p>}
                        </div>

                        <form className="woc-form" action={formAction} method="POST" onSubmit={handleSubmit} noValidate>
                            {/* Formspree honeypot */}
                            <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                            {formFields.map((field) => (
                                <div key={field.name} className="woc-form__field">
                                    <label className="woc-form__label" htmlFor={`field-${field.name}`}>
                                        {field.label}
                                        {field.required && (
                                            <span className="woc-form__required" aria-label="required"> *</span>
                                        )}
                                    </label>
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            id={`field-${field.name}`}
                                            name={field.name ?? ''}
                                            className="woc-form__textarea"
                                            placeholder={field.placeholder ?? ''}
                                            required={field.required ?? false}
                                            rows={5}
                                        />
                                    ) : (
                                        <input
                                            id={`field-${field.name}`}
                                            type={field.type ?? 'text'}
                                            name={field.name ?? ''}
                                            className="woc-form__input"
                                            placeholder={field.placeholder ?? ''}
                                            required={field.required ?? false}
                                        />
                                    )}
                                </div>
                            ))}

                            <button type="submit" className="btn-primary woc-form__submit">
                                Send Message
                            </button>

                            {submitted && (
                                <p className="woc-form__success" aria-live="polite">
                                    {successMessage}
                                </p>
                            )}
                        </form>
                    </div>

                    {/* Contact Info Sidebar */}
                    {showAddress && (
                        <aside className="woc-contact__sidebar">
                            <h3 className="woc-h3">Get in Touch</h3>
                            <div className="woc-divider" />
                            {phone && (
                                <div className="woc-contact__info-item">
                                    <span className="woc-contact__info-label">Phone</span>
                                    <a href={`tel:${phone}`} className="woc-contact__info-value">{phone}</a>
                                </div>
                            )}
                            {email && (
                                <div className="woc-contact__info-item">
                                    <span className="woc-contact__info-label">Email</span>
                                    <a href={`mailto:${email}`} className="woc-contact__info-value">{email}</a>
                                </div>
                            )}
                            {address && (
                                <div className="woc-contact__info-item">
                                    <span className="woc-contact__info-label">Address</span>
                                    <address className="woc-contact__info-value" style={{ fontStyle: 'normal', whiteSpace: 'pre-wrap' }}>
                                        {address}
                                    </address>
                                </div>
                            )}
                        </aside>
                    )}
                </div>
            </div>
            <style>{`
        .woc-contact { display: block; }
        .woc-contact--with-sidebar { display: grid; grid-template-columns: 1fr 20rem; gap: 4rem; align-items: start; }
        .woc-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .woc-form__field { display: flex; flex-direction: column; gap: 0.375rem; }
        .woc-form__label { font-size: 0.875rem; font-weight: 600; color: var(--color-foreground); }
        .woc-form__required { color: var(--color-primary); margin-left: 0.25rem; }
        .woc-form__input, .woc-form__textarea { font-family: var(--font-sans); font-size: 0.9375rem; padding: 0.75rem 1rem; border: 1.5px solid var(--color-surface-border); border-radius: var(--radius-button); background: var(--color-background); color: var(--color-foreground); transition: border-color 0.2s; width: 100%; }
        .woc-form__input:focus, .woc-form__textarea:focus { outline: none; border-color: var(--color-primary); }
        .woc-form__textarea { resize: vertical; }
        .woc-form__submit { align-self: flex-start; }
        .woc-form__success { font-weight: 600; color: var(--color-primary); font-size: 0.9375rem; }
        .woc-contact__sidebar { background: var(--color-background); border: 1px solid var(--color-surface-border); border-radius: var(--radius-card); padding: 2rem; box-shadow: var(--shadow-card); }
        .woc-contact__info-item { display: flex; flex-direction: column; gap: 0.25rem; margin-top: 1.25rem; }
        .woc-contact__info-label { font-size: 0.8125rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-muted); }
        .woc-contact__info-value { font-size: 1rem; color: var(--color-foreground); text-decoration: none; }
        .woc-contact__info-value:hover { color: var(--color-primary); }
        @media (max-width: 768px) { .woc-contact--with-sidebar { grid-template-columns: 1fr; gap: 2.5rem; } }
      `}</style>
        </section>
    );
}
