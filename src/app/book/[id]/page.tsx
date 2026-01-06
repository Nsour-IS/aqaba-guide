'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import styles from './book.module.css';

interface BookingData {
    date: string;
    time: string;
    adults: number;
    children: number;
    addOns: string[];
    name: string;
    email: string;
    phone: string;
    specialRequests: string;
}

const timeSlots = [
    '07:00 AM',
    '09:00 AM',
    '11:00 AM',
    '02:00 PM',
    '04:00 PM',
];

const addOns = [
    { id: 'photos', name: 'Underwater Photography', price: 25, icon: '📸' },
    { id: 'lunch', name: 'Lunch Package', price: 15, icon: '🍽️' },
    { id: 'equipment', name: 'Premium Equipment', price: 20, icon: '🤿' },
    { id: 'transport', name: 'Hotel Pickup', price: 10, icon: '🚐' },
];

export default function BookingPage() {
    const params = useParams();
    const activityId = params.id as string;
    const supabase = createClient();

    const [activity, setActivity] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [step, setStep] = useState(1);
    const [booking, setBooking] = useState<BookingData>({
        date: '',
        time: '',
        adults: 1,
        children: 0,
        addOns: [],
        name: '',
        email: '',
        phone: '',
        specialRequests: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        async function fetchActivity() {
            const { data, error } = await supabase
                .from('activities')
                .select('*')
                .eq('id', activityId)
                .single();

            if (data) {
                setActivity(data);
            }
            setLoading(false);
        }

        fetchActivity();
    }, [activityId]);

    if (loading) {
        return <div className={styles.loading}>Loading activity details...</div>;
    }

    if (!activity) {
        return (
            <div className={styles.notFound}>
                <h1>Activity Not Found</h1>
                <p>The activity you're looking for doesn't exist.</p>
                <a href="/explore" className="btn btn-primary">
                    Browse Activities
                </a>
            </div>
        );
    }

    const basePrice = activity.price;
    const adultsTotal = booking.adults * basePrice;
    const childrenTotal = booking.children * (basePrice * 0.5);
    const addOnsTotal = booking.addOns.reduce((sum, id) => {
        const addOn = addOns.find((a) => a.id === id);
        return sum + (addOn?.price || 0) * (booking.adults + booking.children);
    }, 0);
    const total = adultsTotal + childrenTotal + addOnsTotal;

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsComplete(true);
    };

    if (isComplete) {
        return (
            <div className={styles.page}>
                <div className={styles.successContainer}>
                    <div className={styles.successIcon}>✅</div>
                    <h1>Booking Confirmed!</h1>
                    <p>Your adventure awaits you.</p>

                    <div className={styles.confirmationCard}>
                        <div className={styles.confirmationHeader}>
                            <h3>{activity.name}</h3>
                            <span className={styles.confirmationId}>
                                Booking #AQ{Math.random().toString().slice(2, 8)}
                            </span>
                        </div>

                        <div className={styles.confirmationDetails}>
                            <div className={styles.detailRow}>
                                <span>📅 Date</span>
                                <span>{booking.date}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span>⏰ Time</span>
                                <span>{booking.time}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span>👥 Guests</span>
                                <span>{booking.adults} Adults, {booking.children} Children</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span>💰 Total Paid</span>
                                <span className={styles.totalPrice}>{total} JOD</span>
                            </div>
                        </div>

                        <div className={styles.confirmationFooter}>
                            <p>Confirmation sent to <strong>{booking.email}</strong></p>
                            <p>📱 WhatsApp contact will be shared shortly</p>
                        </div>
                    </div>

                    <div className={styles.successActions}>
                        <a href="/explore" className="btn btn-secondary">
                            Book Another
                        </a>
                        <button className="btn btn-primary">
                            Add to Calendar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            {/* Progress Steps */}
            <div className={styles.progressSteps}>
                {[1, 2, 3].map((s) => (
                    <div
                        key={s}
                        className={`${styles.progressStep} ${step >= s ? styles.active : ''} ${step > s ? styles.completed : ''}`}
                    >
                        <div className={styles.stepNumber}>
                            {step > s ? '✓' : s}
                        </div>
                        <span className={styles.stepLabel}>
                            {s === 1 ? 'Select Date' : s === 2 ? 'Add-ons' : 'Confirm'}
                        </span>
                    </div>
                ))}
            </div>

            <div className={styles.bookingLayout}>
                {/* Main Form */}
                <div className={styles.formContainer}>
                    {step === 1 && (
                        <div className={styles.stepContent}>
                            <h2>Choose Your Date & Time</h2>

                            <div className={styles.formGroup}>
                                <label>Select Date</label>
                                <input
                                    type="date"
                                    value={booking.date}
                                    onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                                    className={styles.dateInput}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Preferred Time</label>
                                <div className={styles.timeSlots}>
                                    {timeSlots.map((time) => (
                                        <button
                                            key={time}
                                            className={`${styles.timeSlot} ${booking.time === time ? styles.selected : ''}`}
                                            onClick={() => setBooking({ ...booking, time })}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.guestSelector}>
                                <div className={styles.guestType}>
                                    <div>
                                        <strong>Adults</strong>
                                        <span>{basePrice} JOD each</span>
                                    </div>
                                    <div className={styles.counter}>
                                        <button
                                            onClick={() => setBooking({ ...booking, adults: Math.max(1, booking.adults - 1) })}
                                            disabled={booking.adults <= 1}
                                        >
                                            −
                                        </button>
                                        <span>{booking.adults}</span>
                                        <button onClick={() => setBooking({ ...booking, adults: booking.adults + 1 })}>
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.guestType}>
                                    <div>
                                        <strong>Children (under 12)</strong>
                                        <span>{basePrice * 0.5} JOD each</span>
                                    </div>
                                    <div className={styles.counter}>
                                        <button
                                            onClick={() => setBooking({ ...booking, children: Math.max(0, booking.children - 1) })}
                                            disabled={booking.children <= 0}
                                        >
                                            −
                                        </button>
                                        <span>{booking.children}</span>
                                        <button onClick={() => setBooking({ ...booking, children: booking.children + 1 })}>
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="btn btn-primary"
                                disabled={!booking.date || !booking.time}
                                onClick={() => setStep(2)}
                                style={{ width: '100%', marginTop: '2rem' }}
                            >
                                Continue to Add-ons
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className={styles.stepContent}>
                            <h2>Enhance Your Experience</h2>
                            <p className={styles.subtitle}>Optional add-ons to make your trip even better</p>

                            <div className={styles.addOns}>
                                {addOns.map((addOn) => (
                                    <label key={addOn.id} className={styles.addOnCard}>
                                        <input
                                            type="checkbox"
                                            checked={booking.addOns.includes(addOn.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setBooking({ ...booking, addOns: [...booking.addOns, addOn.id] });
                                                } else {
                                                    setBooking({ ...booking, addOns: booking.addOns.filter((id) => id !== addOn.id) });
                                                }
                                            }}
                                        />
                                        <span className={styles.addOnIcon}>{addOn.icon}</span>
                                        <div className={styles.addOnInfo}>
                                            <strong>{addOn.name}</strong>
                                            <span>+{addOn.price} JOD per person</span>
                                        </div>
                                        <span className={styles.checkbox}></span>
                                    </label>
                                ))}
                            </div>

                            <div className={styles.stepActions}>
                                <button className="btn btn-secondary" onClick={() => setStep(1)}>
                                    Back
                                </button>
                                <button className="btn btn-primary" onClick={() => setStep(3)}>
                                    Continue to Confirm
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className={styles.stepContent}>
                            <h2>Confirm & Pay</h2>

                            <div className={styles.formGroup}>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={booking.name}
                                    onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="email@example.com"
                                    value={booking.email}
                                    onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="+962 7X XXX XXXX"
                                    value={booking.phone}
                                    onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Special Requests (Optional)</label>
                                <textarea
                                    placeholder="Any dietary requirements, disabilities, or special requests?"
                                    value={booking.specialRequests}
                                    onChange={(e) => setBooking({ ...booking, specialRequests: e.target.value })}
                                    className={styles.textarea}
                                    rows={3}
                                />
                            </div>

                            <div className={styles.stepActions}>
                                <button className="btn btn-secondary" onClick={() => setStep(2)}>
                                    Back
                                </button>
                                <button
                                    className="btn btn-primary"
                                    disabled={!booking.name || !booking.email || !booking.phone || isSubmitting}
                                    onClick={handleSubmit}
                                >
                                    {isSubmitting ? 'Processing...' : `Pay ${total} JOD`}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Order Summary Sidebar */}
                <aside className={styles.sidebar}>
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryImage}>
                            <div className={styles.imagePlaceholder}>
                                {'depth' in activity ? '🤿' : '🌊'}
                            </div>
                        </div>

                        <h3>{activity.name}</h3>
                        <div className={styles.summaryMeta}>
                            <span>⭐ {activity.rating}</span>
                            <span>⏱️ {activity.duration}</span>
                        </div>

                        <hr />

                        <div className={styles.priceBreakdown}>
                            <div className={styles.priceRow}>
                                <span>{booking.adults} Adult(s) × {basePrice} JOD</span>
                                <span>{adultsTotal} JOD</span>
                            </div>
                            {booking.children > 0 && (
                                <div className={styles.priceRow}>
                                    <span>{booking.children} Child(ren) × {basePrice * 0.5} JOD</span>
                                    <span>{childrenTotal} JOD</span>
                                </div>
                            )}
                            {booking.addOns.map((id) => {
                                const addOn = addOns.find((a) => a.id === id);
                                return (
                                    <div key={id} className={styles.priceRow}>
                                        <span>{addOn?.name}</span>
                                        <span>{(addOn?.price || 0) * (booking.adults + booking.children)} JOD</span>
                                    </div>
                                );
                            })}
                        </div>

                        <hr />

                        <div className={styles.totalRow}>
                            <span>Total</span>
                            <span className={styles.totalAmount}>{total} JOD</span>
                        </div>

                        <div className={styles.whatsIncluded}>
                            <h4>What's Included</h4>
                            <ul>
                                <li>✓ Professional guides</li>
                                <li>✓ All safety equipment</li>
                                <li>✓ Insurance coverage</li>
                                <li>✓ Free cancellation (24h)</li>
                            </ul>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
