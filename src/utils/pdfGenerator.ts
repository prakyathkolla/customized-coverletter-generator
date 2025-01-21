import jsPDF from "jspdf";
import { FormData } from "../types/form";

export const generatePDF = async (formData: FormData) => {
  const doc = new jsPDF();
  const lineHeight = 6; // Reduced line height
  let y = 20;

  // Header with contact information
  doc.setFontSize(12);
  doc.text(formData.name, 20, y);
  y += lineHeight;
  doc.text(formData.phoneNumber, 20, y);
  y += lineHeight;
  doc.text(formData.emailAddress, 20, y);
  y += lineHeight;
  doc.text(formData.linkedinProfile, 20, y);
  y += lineHeight;
  doc.text(formData.githubProfile, 20, y);
  y += lineHeight;

  // Date
  y += lineHeight;
  doc.text(formData.date, 20, y);
  y += lineHeight;

  // Company Info
  y += lineHeight;
  doc.setFont(undefined, 'bold');
  doc.text(formData.hiringManagerName, 20, y);
  y += lineHeight;
  doc.text(formData.companyName, 20, y);
  y += lineHeight;
  doc.setFont(undefined, 'normal');
  doc.text(formData.companyAddress, 20, y);
  y += lineHeight;
  doc.text(formData.cityStateZip, 20, y);
  y += lineHeight;

  // Letter Content
  y += lineHeight;
  doc.setFont(undefined, 'normal');
  doc.text(`Dear `, 20, y);
  const dearWidth = doc.getTextWidth('Dear ');
  doc.setFont(undefined, 'bold');
  doc.text(formData.hiringManagerName + ',', 20 + dearWidth, y);
  y += lineHeight * 1.5;

  // First paragraph
  doc.setFont(undefined, 'normal');
  const firstPart = `I am writing to express my interest in the ${formData.positionTitle} role at `;
  doc.text(firstPart, 20, y);
  const firstPartWidth = doc.getTextWidth(firstPart);
  doc.setFont(undefined, 'bold');
  doc.text(formData.companyName, 20 + firstPartWidth, y);
  doc.setFont(undefined, 'normal');
  
  const remainingText = `. With over five years of experience designing and implementing scalable full-stack solutions, I bring a robust blend of technical expertise and problem-solving acumen that aligns with the needs of your dynamic team.`;
  const splitRemaining = doc.splitTextToSize(remainingText, 170);
  y += lineHeight;
  doc.text(splitRemaining, 20, y);
  y += lineHeight * splitRemaining.length;

  // Middle paragraphs with reduced spacing
  const paragraphs = [
    `In my current role as a Senior Full Stack Developer at TIAA, I led multiple impactful projects, including the migration of legacy front-ends to micro-front-end architecture using Angular, resulting in a 30% reduction in load times. Additionally, I developed scalable microservices using Spring Boot and Hibernate, which enhanced system scalability by 35%. My proactive approach to resolving critical production issues as the primary support contact ensured a 99.9% uptime, reflecting my commitment to operational excellence.`,
    `Previously, at JP Morgan Chase, I harnessed modern frameworks like React, Tailwind CSS, and Next.js to improve user engagement and page load speeds significantly. My hands-on experience with secure authentication systems and robust backend frameworks, coupled with a focus on cloud services such as AWS and GCP, has consistently delivered high-quality software aligned with business goals.`,
    `I pride myself on leveraging cutting-edge technologies to drive innovation. For instance, I recently integrated Python-based machine learning pipelines with Flask APIs, applying NLP techniques to extract actionable insights from customer data with 99% accuracy. My proficiency with cloud platforms like AWS, Azure, and OpenShift, alongside tools like Docker, Kubernetes, and Jenkins, has been instrumental in optimizing deployment pipelines and system reliability.`
  ];

  for (const paragraph of paragraphs) {
    y += lineHeight;
    const split = doc.splitTextToSize(paragraph, 170);
    doc.text(split, 20, y);
    y += lineHeight * split.length;
  }

  // Company values paragraph
  y += lineHeight;
  const valuesPart1 = `What excites me about `;
  doc.text(valuesPart1, 20, y);
  const valuesPart1Width = doc.getTextWidth(valuesPart1);
  doc.setFont(undefined, 'bold');
  doc.text(formData.companyName, 20 + valuesPart1Width, y);
  doc.setFont(undefined, 'normal');
  const valuesPart2 = ` is its commitment to ${formData.companyValues}. I am eager to bring my expertise in full-stack development and cloud architecture to contribute to your team's success.`;
  const splitValues = doc.splitTextToSize(valuesPart2, 170 - valuesPart1Width - doc.getTextWidth(formData.companyName));
  y += lineHeight;
  doc.text(splitValues, 20, y);
  y += lineHeight * splitValues.length;

  // Closing
  y += lineHeight;
  const closingPart1 = `I would welcome the opportunity to discuss how my skills and experiences align with the goals of `;
  doc.text(closingPart1, 20, y);
  const closingPart1Width = doc.getTextWidth(closingPart1);
  doc.setFont(undefined, 'bold');
  doc.text(formData.companyName, 20 + closingPart1Width, y);
  doc.setFont(undefined, 'normal');
  const closingPart2 = `. Thank you for considering my application. I look forward to the possibility of contributing to your team's success.`;
  const splitClosing = doc.splitTextToSize(closingPart2, 170 - closingPart1Width - doc.getTextWidth(formData.companyName));
  y += lineHeight;
  doc.text(splitClosing, 20, y);
  y += lineHeight * splitClosing.length;

  // Signature
  y += lineHeight;
  doc.text("Sincerely,", 20, y);
  y += lineHeight * 1.5;
  doc.text(formData.name, 20, y);

  doc.save("cover-letter.pdf");
};