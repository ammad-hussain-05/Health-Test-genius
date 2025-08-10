import { Component } from '@angular/core';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: false
})
export class ContactComponent {
  contactForm: ContactForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  isSubmitted = false;



  subjectOptions = [
    'General Inquiry',
    'Booking Support',
    'Technical Issues',
    'Payment Issues',
    'Test Results',
    'Provider Information',
    'Partnership Opportunities',
    'Other'
  ];

  onSubmit(): void {
    if (this.isValidForm()) {
      this.isSubmitting = true;
      
      // Simulate form submission
      setTimeout(() => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.resetForm();
      }, 2000);
    }
  }

  isValidForm(): boolean {
    return !!(
      this.contactForm.name.trim() &&
      this.contactForm.email.trim() &&
      this.contactForm.subject &&
      this.contactForm.message.trim()
    );
  }

  resetForm(): void {
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  closeSuccessMessage(): void {
    this.isSubmitted = false;
  }
}
