import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-terms',
  templateUrl: './user-terms.component.html',
  styleUrls: ['./user-terms.component.css'],
  standalone: false
})
export class UserTermsComponent implements OnInit {
  
  lastUpdated = 'January 15, 2024';
  effectiveDate = 'January 1, 2024';
  activeSection = 0;
  expandedSections: boolean[] = [];

  termsData = [
    {
      title: 'Acceptance of Terms',
      icon: 'document',
      content: `
        <p>By accessing and using HealthTestGenius ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
        
        <h4>What This Means</h4>
        <ul>
          <li>These terms form a legally binding contract between you and HealthTestGenius</li>
          <li>By using our services, you automatically agree to follow these rules</li>
          <li>If you don't agree with any part of these terms, you must stop using our services</li>
          <li>We may update these terms from time to time, and continued use means you accept any changes</li>
        </ul>
        
        <p><strong>Important:</strong> Please read these terms carefully before using our healthcare services. Your health and safety are our top priority.</p>
      `
    },
    {
      title: 'Description of Services',
      icon: 'service',
      content: `
        <p>HealthTestGenius provides comprehensive online healthcare testing services, appointment booking, and health information management through our secure digital platform.</p>
        
        <h4>Our Services Include</h4>
        <ul>
          <li><strong>Health Test Booking:</strong> Schedule various health tests including blood work, STI testing, cancer screenings, and more</li>
          <li><strong>Provider Network:</strong> Access to verified healthcare providers and testing facilities</li>
          <li><strong>Results Management:</strong> Secure viewing and management of your test results</li>
          <li><strong>Appointment Scheduling:</strong> Easy booking system for consultations and follow-ups</li>
          <li><strong>Health Records:</strong> Digital storage and organization of your health information</li>
          <li><strong>Telemedicine:</strong> Virtual consultations with qualified healthcare professionals</li>
        </ul>
        
        <p><strong>Service Availability:</strong> Services may vary by location and provider availability. We strive to provide 24/7 platform access, though maintenance periods may occur.</p>
      `
    },
    {
      title: 'User Account Responsibilities',
      icon: 'user',
      content: `
        <p>You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
        
        <h4>Account Security Requirements</h4>
        <ul>
          <li><strong>Password Protection:</strong> Use a strong, unique password and keep it confidential</li>
          <li><strong>Account Information:</strong> Provide accurate, current, and complete information</li>
          <li><strong>Unauthorized Access:</strong> Immediately notify us of any unauthorized use of your account</li>
          <li><strong>Personal Use Only:</strong> Do not share your account credentials with others</li>
          <li><strong>Regular Updates:</strong> Keep your contact information and health details current</li>
        </ul>
        
        <h4>Prohibited Account Uses</h4>
        <ul>
          <li>Creating multiple accounts for the same person</li>
          <li>Using false or misleading information</li>
          <li>Impersonating another person or entity</li>
          <li>Sharing accounts with family members or friends</li>
        </ul>
        
        <p><strong>Account Suspension:</strong> We reserve the right to suspend or terminate accounts that violate these terms or engage in suspicious activity.</p>
      `
    },
    {
      title: 'Privacy & Data Protection',
      icon: 'shield',
      content: `
        <p>Your privacy is fundamental to our service. We are committed to protecting your personal health information in accordance with applicable privacy laws and regulations.</p>
        
        <h4>Data Protection Standards</h4>
        <ul>
          <li><strong>HIPAA Compliance:</strong> We follow strict HIPAA guidelines for protected health information</li>
          <li><strong>Encryption:</strong> All data is encrypted in transit and at rest</li>
          <li><strong>Access Controls:</strong> Limited access to your information on a need-to-know basis</li>
          <li><strong>Audit Trails:</strong> We maintain logs of who accesses your information and when</li>
          <li><strong>Data Retention:</strong> We retain your data only as long as necessary for your care and legal requirements</li>
        </ul>
        
        <h4>Your Privacy Rights</h4>
        <ul>
          <li>Right to access your personal information</li>
          <li>Right to request corrections to inaccurate data</li>
          <li>Right to request deletion of your data (subject to legal requirements)</li>
          <li>Right to data portability</li>
          <li>Right to opt-out of certain data processing activities</li>
        </ul>
        
        <p><strong>Privacy Policy:</strong> Please review our comprehensive Privacy Policy for detailed information about how we collect, use, and protect your data.</p>
      `
    },
    {
      title: 'Medical Disclaimer & Professional Advice',
      icon: 'medical',
      content: `
        <p><strong>Important Medical Disclaimer:</strong> Our services are not intended to replace professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with questions about your health.</p>
        
        <h4>Service Limitations</h4>
        <ul>
          <li><strong>Not Emergency Services:</strong> Our platform is not for medical emergencies - call 911 or go to the emergency room</li>
          <li><strong>Diagnostic Support Only:</strong> Test results require interpretation by qualified healthcare professionals</li>
          <li><strong>No Treatment Guarantees:</strong> We cannot guarantee specific health outcomes or treatment success</li>
          <li><strong>Provider Independence:</strong> Healthcare providers in our network are independent professionals</li>
        </ul>
        
        <h4>Your Health Responsibilities</h4>
        <ul>
          <li>Provide accurate health information and medical history</li>
          <li>Follow all pre-test instructions carefully</li>
          <li>Consult with healthcare providers about test results</li>
          <li>Seek immediate medical attention for urgent health concerns</li>
          <li>Maintain regular relationships with primary care providers</li>
        </ul>
        
        <p><strong>Always Remember:</strong> No online platform can replace the value of in-person medical care and the doctor-patient relationship.</p>
      `
    },
    {
      title: 'Prohibited Uses & Conduct',
      icon: 'ban',
      content: `
        <p>You agree not to use our services for any unlawful purpose or in any way that could harm our platform, other users, or healthcare providers.</p>
        
        <h4>Prohibited Activities</h4>
        <ul>
          <li><strong>Fraudulent Use:</strong> Using false information to obtain services or insurance benefits</li>
          <li><strong>Harassment:</strong> Harassing, threatening, or abusing other users or healthcare providers</li>
          <li><strong>System Abuse:</strong> Attempting to hack, disrupt, or overload our systems</li>
          <li><strong>Spam or Malware:</strong> Uploading viruses, spam, or malicious content</li>
          <li><strong>Unauthorized Access:</strong> Attempting to access other users' accounts or data</li>
          <li><strong>Commercial Misuse:</strong> Using our platform for unauthorized commercial purposes</li>
        </ul>
        
        <h4>Content Guidelines</h4>
        <ul>
          <li>Do not share inappropriate, offensive, or harmful content</li>
          <li>Respect the privacy and confidentiality of others</li>
          <li>Do not share copyrighted material without permission</li>
          <li>Keep communications professional and respectful</li>
        </ul>
        
        <p><strong>Consequences:</strong> Violation of these terms may result in account suspension, termination, and potential legal action.</p>
      `
    },
    {
      title: 'Intellectual Property Rights',
      icon: 'copyright',
      content: `
        <p>The HealthTestGenius platform and its original content, features, and functionality are and will remain the exclusive property of HealthTestGenius and its licensors.</p>
        
        <h4>Our Intellectual Property</h4>
        <ul>
          <li><strong>Trademarks:</strong> HealthTestGenius name, logo, and branding materials</li>
          <li><strong>Software:</strong> Platform code, algorithms, and technical innovations</li>
          <li><strong>Content:</strong> Educational materials, health resources, and platform content</li>
          <li><strong>Data:</strong> Aggregated and anonymized health insights and analytics</li>
          <li><strong>Design:</strong> User interface, user experience, and visual design elements</li>
        </ul>
        
        <h4>Your Rights and Restrictions</h4>
        <ul>
          <li><strong>Limited License:</strong> We grant you a limited, non-exclusive right to use our platform</li>
          <li><strong>No Copying:</strong> You may not copy, modify, or distribute our content</li>
          <li><strong>No Reverse Engineering:</strong> You may not reverse engineer or attempt to extract our source code</li>
          <li><strong>Your Content:</strong> You retain rights to your personal health information and user-generated content</li>
        </ul>
        
        <p><strong>Reporting Infringement:</strong> If you believe your intellectual property rights have been violated, please contact our legal team immediately.</p>
      `
    },
    {
      title: 'Payment Terms & Refunds',
      icon: 'scale',
      content: `
        <p>Payment terms vary depending on the services you choose, your insurance coverage, and the healthcare providers you select.</p>
        
        <h4>Payment Processing</h4>
        <ul>
          <li><strong>Secure Payments:</strong> All payments are processed through encrypted, PCI-compliant systems</li>
          <li><strong>Insurance Billing:</strong> We work with major insurance providers for covered services</li>
          <li><strong>Direct Pay Options:</strong> Credit cards, debit cards, and HSA/FSA accounts accepted</li>
          <li><strong>Transparent Pricing:</strong> All costs are clearly displayed before booking</li>
          <li><strong>No Hidden Fees:</strong> Platform fees, if any, are clearly disclosed</li>
        </ul>
        
        <h4>Refund Policy</h4>
        <ul>
          <li><strong>Service Cancellation:</strong> Cancel appointments at least 24 hours in advance for full refund</li>
          <li><strong>Test Results:</strong> No refunds once test samples have been processed</li>
          <li><strong>Technical Issues:</strong> Full refund if services cannot be delivered due to platform issues</li>
          <li><strong>Provider Cancellation:</strong> Full refund if provider cancels your appointment</li>
          <li><strong>Billing Disputes:</strong> Contact support within 60 days for billing inquiries</li>
        </ul>
        
        <p><strong>Insurance Claims:</strong> We assist with insurance claims but cannot guarantee coverage or reimbursement amounts.</p>
      `
    },
    {
      title: 'Service Limitations & Disclaimers',
      icon: 'warning',
      content: `
        <p>While we strive to provide reliable and accurate services, there are inherent limitations to any healthcare platform that users must understand.</p>
        
        <h4>Platform Limitations</h4>
        <ul>
          <li><strong>Technical Downtime:</strong> Occasional maintenance and technical issues may affect availability</li>
          <li><strong>Provider Availability:</strong> Healthcare providers may have limited availability or may leave our network</li>
          <li><strong>Geographic Limits:</strong> Not all services are available in all locations</li>
          <li><strong>Test Accuracy:</strong> Test results depend on laboratory quality and proper sample collection</li>
          <li><strong>Network Connectivity:</strong> Internet connectivity issues may affect service quality</li>
        </ul>
        
        <h4>User Responsibility Disclaimers</h4>
        <ul>
          <li>Following all pre-test preparation instructions</li>
          <li>Providing accurate health information</li>
          <li>Consulting healthcare providers about results</li>
          <li>Maintaining device security and account confidentiality</li>
          <li>Understanding that online services have limitations</li>
        </ul>
        
        <p><strong>No Warranties:</strong> Services are provided "as is" without warranties of any kind, express or implied.</p>
      `
    },
    {
      title: 'Governing Law & Dispute Resolution',
      icon: 'scale',
      content: `
        <p>These terms shall be interpreted and governed by the laws of the jurisdiction in which HealthTestGenius operates, without regard to conflict of law principles.</p>
        
        <h4>Dispute Resolution Process</h4>
        <ul>
          <li><strong>Initial Contact:</strong> First, contact our customer support team to resolve issues</li>
          <li><strong>Mediation:</strong> If needed, we'll attempt to resolve disputes through mediation</li>
          <li><strong>Arbitration:</strong> Binding arbitration may be required for certain disputes</li>
          <li><strong>Class Action Waiver:</strong> You agree to resolve disputes individually, not as part of a class action</li>
          <li><strong>Legal Venue:</strong> Any legal proceedings must be brought in our home jurisdiction</li>
        </ul>
        
        <h4>Limitation of Liability</h4>
        <ul>
          <li>Our liability is limited to the amount you paid for services</li>
          <li>We are not liable for indirect, incidental, or consequential damages</li>
          <li>Healthcare providers are independent contractors, not our employees</li>
          <li>We cannot be held liable for provider malpractice or negligence</li>
        </ul>
        
        <p><strong>Statute of Limitations:</strong> Any claims must be brought within one year of the incident giving rise to the claim.</p>
      `
    }
  ];

  ngOnInit() {
    // Initialize all sections as collapsed
    this.expandedSections = new Array(this.termsData.length).fill(false);
    // Expand the first section by default
    this.expandedSections[0] = true;
  }

  toggleSection(index: number): void {
    this.expandedSections[index] = !this.expandedSections[index];
  }

  scrollToSection(index: number): void {
    this.activeSection = index;
    const element = document.getElementById('section-' + index);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
} 