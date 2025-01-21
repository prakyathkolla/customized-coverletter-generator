import jsPDF from "jspdf";
import { FormData } from "../types/form";

export const generatePDF = async (formData: FormData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  let y = margin;

  // Helper function to add wrapped text
  const addWrappedText = (text: string, indent: number = 0) => {
    const lines = doc.splitTextToSize(text, maxWidth - indent);
    doc.text(lines, margin + indent, y);
    y += (lines.length * 5);
  };

  // Helper function to add bold text
  const addBoldText = (text: string, indent: number = 0) => {
    doc.setFont(undefined, 'bold');
    addWrappedText(text, indent);
    doc.setFont(undefined, 'normal');
  };

  // Contact Information - Each on new line
  doc.setFontSize(11);
  [
    formData.name,
    formData.phoneNumber,
    formData.emailAddress,
    formData.linkedinProfile,
    formData.githubProfile
  ].forEach(item => {
    addWrappedText(item);
    y += 1; // Small additional spacing between contact items
  });

  // Date
  y += 5;
  addWrappedText(formData.date);

  // Company Information
  y += 5;
  addBoldText(formData.hiringManagerName);
  addBoldText(formData.companyName);
  addWrappedText(formData.companyAddress);
  addWrappedText(formData.cityStateZip);

  // Salutation
  y += 5;
  doc.setFont(undefined, 'normal');
  doc.text("Dear ", margin, y);
  doc.setFont(undefined, 'bold');
  doc.text(formData.hiringManagerName + ",", margin + doc.getTextWidth("Dear "), y);
  y += 8;

  // First paragraph
  doc.setFont(undefined, 'normal');
  const firstParagraph = `I am writing to express my interest in the ${formData.positionTitle} role at ${formData.companyName}. With over five years of experience designing and implementing scalable full-stack solutions, I bring a robust blend of technical expertise and problem-solving acumen that aligns with the needs of your dynamic team.`;
  addWrappedText(firstParagraph);
  y += 3;

  // Experience paragraphs
  const paragraphs = [
    `In my current role as a Senior Full Stack Developer at TIAA, I led multiple impactful projects, including the migration of legacy front-ends to micro-front-end architecture using Angular, resulting in a 30% reduction in load times. Additionally, I developed scalable microservices using Spring Boot and Hibernate, which enhanced system scalability by 35%. My proactive approach to resolving critical production issues as the primary support contact ensured a 99.9% uptime, reflecting my commitment to operational excellence.`,
    
    `Previously, at JP Morgan Chase, I harnessed modern frameworks like React, Tailwind CSS, and Next.js to improve user engagement and page load speeds significantly. My hands-on experience with secure authentication systems and robust backend frameworks, coupled with a focus on cloud services such as AWS and GCP, has consistently delivered high-quality software aligned with business goals.`,
    
    `I pride myself on leveraging cutting-edge technologies to drive innovation. For instance, I recently integrated Python-based machine learning pipelines with Flask APIs, applying NLP techniques to extract actionable insights from customer data with 99% accuracy. My proficiency with cloud platforms like AWS, Azure, and OpenShift, alongside tools like Docker, Kubernetes, and Jenkins, has been instrumental in optimizing deployment pipelines and system reliability.`
  ];

  paragraphs.forEach(paragraph => {
    addWrappedText(paragraph);
    y += 3;
  });

  // Company values paragraph
  const valuesParagraph = `What excites me about ${formData.companyName} is its commitment to ${formData.companyValues}. I am eager to bring my expertise in full-stack development and cloud architecture to contribute to your team's success.`;
  addWrappedText(valuesParagraph);
  y += 3;

  // Closing paragraph
  const closingParagraph = `I would welcome the opportunity to discuss how my skills and experiences align with the goals of ${formData.companyName}. Thank you for considering my application. I look forward to the possibility of contributing to your team's success.`;
  addWrappedText(closingParagraph);
  y += 8;

  // Signature
  addWrappedText("Sincerely,");
  y += 5;
  addWrappedText(formData.name);

  doc.save("cover-letter.pdf");
};