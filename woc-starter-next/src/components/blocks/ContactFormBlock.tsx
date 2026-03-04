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
        if (!formspreeId) return;
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

    const hasSidebar = showAddress && (phone || email || address);

    return (
        <section className="woc-section woc-section--surface" id="contact">
            <div className="woc-container">
                <div className={`woc-contact${hasSidebar ? ' woc-contact--split' : ''}`}>

                    {/* Sidebar: contact details + heading (only when address shown) */}
                    {hasSidebar ? (
                        <div className="woc-contact__sidebar">
                            <div className="woc-contact__sidebar-header">
                                {eyebrow && <p className="woc-eyebrow woc-eyebrow--lined">{eyebrow}</p>}
                                {heading && <h2 className="woc-h2 woc-contact__heading">{heading}</h2>}
                                {subheading && <p className="woc-lead woc-contact__sub">{subheading}</p>}
                            </div>
                            <div className="woc-contact__details">
                                {phone && (
                                    <div className="woc-contact__detail-item">
                                        <span className="woc-contact__detail-label">Phone</span>
                                        <a href={`tel:${phone}`} className="woc-contact__detail-value">{phone}</a>
                                    </div>
                                )}
                                {email && (
                                    <div className="woc-contact__detail-item">
                                        <span className="woc-contact__detail-label">Email</span>
                                        <a href={`mailto:${email}`} className="woc-contact__detail-value">{email}</a>
                                    </div>
                                )}
                                {address && (
                                    <div className="woc-contact__detail-item">
                                        <span className="woc-contact__detail-label">Address</span>
                                        <address className="woc-contact__detail-value" style={{ fontStyle: 'normal', whiteSpace: 'pre-wrap' }}>
                                            {address}
                                        </address>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        /* Single-column: heading above the form */
                        <div className="woc-contact__header">
                            {eyebrow && <p className="woc-eyebrow woc-eyebrow--lined">{eyebrow}</p>}
                            {heading && <h2 className="woc-h2 woc-contact__heading">{heading}</h2>}
                            {subheading && <p className="woc-lead woc-contact__sub">{subheading}</p>}
                        </div>
                    )}

                    {/* Form */}
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
                                        className="woc-form__input"
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
            </div>
            <style>{`
        /* Single-column layout (no address) */
        .woc-contact { display: grid; gap: 2.5rem; }
        .woc-contact__header { max-width: 40rem; }

        /* Two-column layout when address/sidebar is shown */
        .woc-contact--split {
          grid-template-columns: 1fr 1.6fr;
          gap: 5rem;
          align-items: start;
        }

        .woc-contact__heading { margin-top: 0.875rem; }
        .woc-contact__sub { margin-top: 0.875rem; }

        .woc-contact__details { margin-top: 2.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .woc-contact__detail-item { display: flex; flex-direction: column; gap: 0.25rem; }
        .woc-contact__detail-label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-muted);
        }
        .woc-contact__detail-value {
          font-size: 1rem;
          color: var(--color-foreground);
          text-decoration: none;
          transition: color 0.15s;
          line-height: 1.5;
        }
        .woc-contact__detail-value:hover { color: var(--color-primary); }

        /* Form */
        .woc-form { display: flex; flex-direction: column; gap: 1.375rem; }
        .woc-form__field { display: flex; flex-direction: column; gap: 0.375rem; }

        /* Label: small-caps style */
        .woc-form__label {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-foreground);
        }
        .woc-form__required { color: var(--color-primary); }

        /* Inputs: bottom-border-only in editorial style.
           Focus animates the underline to primary color.
           Falls back gracefully to any profile color. */
        .woc-form__input {
          font-family: var(--font-sans);
          font-size: 0.9375rem;
          padding: 0.625rem 0;
          border: none;
          border-bottom: 1.5px solid var(--color-surface-border);
          border-radius: 0;
          background: transparent;
          color: var(--color-foreground);
          width: 100%;
          outline: none;
          transition: border-color 0.2s ease;
          resize: vertical;
        }
        .woc-form__input::placeholder { color: var(--color-muted); opacity: 0.6; }
        .woc-form__input:focus { border-bottom-color: var(--color-primary); }

        .woc-form__submit { width: 100%; justify-content: center; margin-top: 0.25rem; }
        .woc-form__success {
          font-weight: 600;
          color: var(--color-primary);
          font-size: 0.9375rem;
          padding: 0.75rem 0;
          text-align: center;
        }

        @media (max-width: 768px) {
          .woc-contact--split { grid-template-columns: 1fr; gap: 2.5rem; }
        }
      `}</style>
        </section>
    );
}
