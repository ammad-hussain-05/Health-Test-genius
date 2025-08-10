import { Component } from '@angular/core';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css'],
  standalone: false
})
export class PartnerComponent {
  
  partnershipTypes = [
    {
      title: 'Healthcare Providers',
      description: 'Join our network of trusted medical professionals and expand your patient reach',
      icon: 'medical',
      benefits: ['Expanded patient reach', 'Digital platform access', 'Revenue sharing', 'Marketing support']
    },
    {
      title: 'Diagnostic Laboratories',
      description: 'Partner with us to offer comprehensive testing services nationwide',
      icon: 'lab',
      benefits: ['Increased test volume', 'Technology integration', 'Quality assurance', 'Logistics support']
    },
    {
      title: 'Technology Partners',
      description: 'Collaborate on innovative healthcare solutions and integrations',
      icon: 'tech',
      benefits: ['API access', 'Co-development opportunities', 'Market expansion', 'Technical support']
    },
    {
      title: 'Insurance Companies',
      description: 'Streamline healthcare coverage and improve claims processing',
      icon: 'insurance',
      benefits: ['Automated claims', 'Risk assessment', 'Cost reduction', 'Better outcomes']
    }
  ];

  processSteps = [
    {
      title: 'Submit Application',
      description: 'Complete our partnership form with your organization details and goals',
      icon: 'fas fa-file-alt'
    },
    {
      title: 'Initial Review',
      description: 'Our team reviews your application and schedules a consultation call',
      icon: 'fas fa-search'
    },
    {
      title: 'Partnership Discussion',
      description: 'We discuss partnership terms, benefits, and integration requirements',
      icon: 'fas fa-handshake'
    },
    {
      title: 'Onboarding',
      description: 'Complete setup, training, and launch your partnership with full support',
      icon: 'fas fa-rocket'
    }
  ];

  keyBenefits = [
    {
      title: 'Proven Technology',
      description: 'Access our cutting-edge platform trusted by thousands of healthcare professionals',
      icon: 'fas fa-cogs'
    },
    {
      title: 'Revenue Growth',
      description: 'Increase your revenue with our competitive sharing model and bonus programs',
      icon: 'fas fa-chart-line'
    },
    {
      title: 'Marketing Support',
      description: 'Benefit from our marketing expertise and brand recognition in the healthcare sector',
      icon: 'fas fa-bullhorn'
    },
    {
      title: '24/7 Support',
      description: 'Get dedicated support from our partnership team whenever you need assistance',
      icon: 'fas fa-headset'
    }
  ];

  testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      title: 'Medical Director, London Health Clinic',
      text: 'Partnering with HealthTestGenius has transformed our practice. We\'ve seen a 200% increase in patient bookings and our revenue has grown significantly.',
      avatar: 'fas fa-user-md'
    },
    {
      name: 'Michael Chen',
      title: 'CEO, MedLab Diagnostics',
      text: 'The integration was seamless and the support team is exceptional. Our test volumes have increased by 150% since joining their network.',
      avatar: 'fas fa-flask'
    },
    {
      name: 'Emma Thompson',
      title: 'Practice Manager, City Medical Centre',
      text: 'The platform is user-friendly and the marketing support has helped us reach new patients. Highly recommend this partnership program.',
      avatar: 'fas fa-user-tie'
    }
  ];

  faqs = [
    {
      question: 'What are the requirements to become a partner?',
      answer: 'We partner with licensed healthcare providers, accredited diagnostic laboratories, and established healthcare technology companies. All partners must meet our quality and compliance standards.',
      isOpen: false
    },
    {
      question: 'How long does the partnership application process take?',
      answer: 'The initial review takes 24-48 hours. The complete onboarding process typically takes 2-4 weeks depending on integration requirements and compliance checks.',
      isOpen: false
    },
    {
      question: 'What support do you provide to partners?',
      answer: 'We provide comprehensive support including technical integration, marketing materials, training, dedicated account management, and 24/7 customer support.',
      isOpen: false
    },
    {
      question: 'How does the revenue sharing work?',
      answer: 'Revenue sharing varies by partnership type and volume. We offer competitive rates with performance bonuses. Specific terms are discussed during the partnership negotiation.',
      isOpen: false
    },
    {
      question: 'Can I integrate with my existing systems?',
      answer: 'Yes, we offer API integration and can work with most existing healthcare management systems. Our technical team will assess your requirements during onboarding.',
      isOpen: false
    },
    {
      question: 'Is there a minimum commitment period?',
      answer: 'Partnership agreements typically have a 12-month initial term with automatic renewal. Terms can be customized based on your specific needs and partnership type.',
      isOpen: false
    }
  ];

  partnerForm = {
    companyName: '',
    companySize: '',
    industry: '',
    website: '',
    contactPerson: '',
    jobTitle: '',
    email: '',
    phone: '',
    partnershipType: '',
    message: '',
    agreeToTerms: false
  };

  isSubmitting = false;
  isSubmitted = false;

  // Map partnership types to FontAwesome icons
  getIconClass(iconType: string): string {
    const iconMap: { [key: string]: string } = {
      'medical': 'fas fa-user-md',
      'lab': 'fas fa-flask',
      'tech': 'fas fa-laptop-code',
      'insurance': 'fas fa-shield-alt'
    };
    return iconMap[iconType] || 'fas fa-circle';
  }

  // Scroll to form section
  scrollToForm(): void {
    const element = document.getElementById('partnership-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Scroll to process section
  scrollToProcess(): void {
    const element = document.getElementById('process');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Select partnership type and scroll to form
  selectPartnership(partnershipType: string): void {
    // Map display names to form values
    const typeMap: { [key: string]: string } = {
      'Healthcare Providers': 'healthcare',
      'Diagnostic Laboratories': 'lab',
      'Technology Partners': 'tech',
      'Insurance Companies': 'insurance'
    };
    
    this.partnerForm.partnershipType = typeMap[partnershipType] || '';
    this.scrollToForm();
  }

  // Toggle FAQ items
  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }

  // Form submission
  onSubmit(): void {
    if (this.isValidForm()) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.resetForm();
        
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 2000);
    }
  }

  // Form validation
  isValidForm(): boolean {
    return !!(
      this.partnerForm.companyName.trim() &&
      this.partnerForm.contactPerson.trim() &&
      this.partnerForm.email.trim() &&
      this.partnerForm.partnershipType &&
      this.partnerForm.message.trim() &&
      this.partnerForm.agreeToTerms
    );
  }

  // Reset form
  resetForm(): void {
    this.partnerForm = {
      companyName: '',
      companySize: '',
      industry: '',
      website: '',
      contactPerson: '',
      jobTitle: '',
      email: '',
      phone: '',
      partnershipType: '',
      message: '',
      agreeToTerms: false
    };
  }

  // Close success message
  closeSuccessMessage(): void {
    this.isSubmitted = false;
  }
} 