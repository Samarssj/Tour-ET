import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

function Contact() {
    const [fullInfo, setFullInfo] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFullInfo({ ...fullInfo, [name]: value });
    };

    const handleSend = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/contact`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fullInfo)
            });

            const result = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: result.msg || 'Thank you! Your message has been sent.' });
                setFullInfo({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus({ type: 'error', message: result.msg || 'Something went wrong. Please try again.' });
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'Network error. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="main-content-wrapper py-5">
            <div className="container py-5">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="row g-5 align-items-center"
                >
                    <div className="col-lg-5">
                        <div className="pe-lg-5">
                            <h1 className="display-4 fw-bold mb-4">Get in <span className="text-primary">Touch</span></h1>
                            <p className="lead text-secondary mb-5">
                                Have questions about our tours or need a custom itinerary? Our team is here to help you plan your perfect Ethiopian adventure.
                            </p>

                            <div className="d-flex flex-column gap-4">
                                <div className="d-flex align-items-center gap-4 p-4 bg-light rounded-4">
                                    <div className="bg-primary text-white p-3 rounded-circle">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <div className="small text-muted">Call Us</div>
                                        <div className="fw-bold h5 mb-0">+251 9 123 4567</div>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center gap-4 p-4 bg-light rounded-4">
                                    <div className="bg-primary text-white p-3 rounded-circle">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <div className="small text-muted">Email Us</div>
                                        <div className="fw-bold h5 mb-0">tour.ET@gmail.com</div>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center gap-4 p-4 bg-light rounded-4">
                                    <div className="bg-primary text-white p-3 rounded-circle">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <div className="small text-muted">Visit Us</div>
                                        <div className="fw-bold h5 mb-0">Addis Ababa, Ethiopia</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className="card border-0 shadow-lg p-4 p-md-5 rounded-5">
                            <h2 className="h3 fw-bold mb-4">Send a Message</h2>
                            
                            <AnimatePresence mode="wait">
                                {status.message && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'} d-flex align-items-center gap-2 mb-4`}
                                    >
                                        {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                                        <span>{status.message}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleSend}>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-uppercase text-muted">Full Name</label>
                                        <input 
                                            className="form-control" 
                                            type="text" 
                                            name="name" 
                                            value={fullInfo.name}
                                            onChange={handleChange} 
                                            placeholder="Your Name" 
                                            required 
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-uppercase text-muted">Email Address</label>
                                        <input 
                                            className="form-control" 
                                            type="email" 
                                            name="email" 
                                            value={fullInfo.email}
                                            onChange={handleChange} 
                                            placeholder="name@example.com" 
                                            required 
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label small fw-bold text-uppercase text-muted">Subject</label>
                                        <input 
                                            className="form-control" 
                                            type="text" 
                                            name="subject" 
                                            value={fullInfo.subject}
                                            onChange={handleChange} 
                                            placeholder="How can we help?" 
                                            required 
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label small fw-bold text-uppercase text-muted">Message</label>
                                        <textarea 
                                            className="form-control" 
                                            name="message" 
                                            value={fullInfo.message}
                                            onChange={handleChange} 
                                            placeholder="Tell us more about your request..." 
                                            style={{ minHeight: 150 }} 
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="col-12">
                                        <button 
                                            className="btn btn-primary w-100 py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2" 
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <div className="spinner-border spinner-border-sm" role="status"></div>
                                            ) : (
                                                <>
                                                    <Send size={20} />
                                                    <span>Send Message</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Contact;
