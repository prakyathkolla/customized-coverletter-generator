import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";

interface FormData {
  name: string;
  phoneNumber: string;
  emailAddress: string;
  linkedinProfile: string;
  githubProfile: string;
  date: string;
  hiringManagerName: string;
  companyName: string;
  companyAddress: string;
  cityStateZip: string;
  positionTitle: string;
  companyValues: string;
}

export const generatePDF = async (formData: FormData) => {
  const doc = new jsPDF();
  const lineHeight = 7;
  let y = 20;

  // Header
  doc.setFontSize(12);
  doc.text(formData.name, 20, y);
  y += lineHeight;
  doc.text(
    `${formData.phoneNumber} | ${formData.emailAddress} | ${formData.linkedinProfile} | ${formData.githubProfile}`,
    20,
    y
  );
  y += lineHeight * 2;

  // Date
  doc.text(formData.date, 20, y);
  y += lineHeight * 2;

  // Company Info
  doc.text(formData.hiringManagerName, 20, y);
  y += lineHeight;
  doc.text(formData.companyName, 20, y);
  y += lineHeight;
  doc.text(formData.companyAddress, 20, y);
  y += lineHeight;
  doc.text(formData.cityStateZip, 20, y);
  y += lineHeight * 2;

  // Letter Content
  const content = `Dear ${formData.hiringManagerName},

I am writing to express my interest in the ${formData.positionTitle} role at ${formData.companyName}. With over five years of experience designing and implementing scalable full-stack solutions, I bring a robust blend of technical expertise and problem-solving acumen that aligns with the needs of your dynamic team.

In my current role as a Senior Full Stack Developer at TIAA, I led multiple impactful projects, including the migration of legacy front-ends to micro-front-end architecture using Angular, resulting in a 30% reduction in load times. Additionally, I developed scalable microservices using Spring Boot and Hibernate, which enhanced system scalability by 35%. My proactive approach to resolving critical production issues as the primary support contact ensured a 99.9% uptime, reflecting my commitment to operational excellence.

Previously, at JP Morgan Chase, I harnessed modern frameworks like React, Tailwind CSS, and Next.js to improve user engagement and page load speeds significantly. My hands-on experience with secure authentication systems and robust backend frameworks, coupled with a focus on cloud services such as AWS and GCP, has consistently delivered high-quality software aligned with business goals.

I pride myself on leveraging cutting-edge technologies to drive innovation. For instance, I recently integrated Python-based machine learning pipelines with Flask APIs, applying NLP techniques to extract actionable insights from customer data with 99% accuracy. My proficiency with cloud platforms like AWS, Azure, and OpenShift, alongside tools like Docker, Kubernetes, and Jenkins, has been instrumental in optimizing deployment pipelines and system reliability.

What excites me about ${formData.companyName} is its commitment to ${formData.companyValues}. I am eager to bring my expertise in full-stack development and cloud architecture to contribute to your team's success.

I would welcome the opportunity to discuss how my skills and experiences align with the goals of ${formData.companyName}. Thank you for considering my application. I look forward to the possibility of contributing to your team's success.

Sincerely,
${formData.name}`;

  doc.setFontSize(12);
  const splitText = doc.splitTextToSize(content, 170);
  doc.text(splitText, 20, y);

  doc.save("cover-letter.pdf");
};

export const generateDOCX = async (formData: FormData) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun(formData.name)],
          }),
          new Paragraph({
            children: [
              new TextRun(
                `${formData.phoneNumber} | ${formData.emailAddress} | ${formData.linkedinProfile} | ${formData.githubProfile}`
              ),
            ],
          }),
          new Paragraph({
            children: [new TextRun("")],
          }),
          new Paragraph({
            children: [new TextRun(formData.date)],
          }),
          new Paragraph({
            children: [new TextRun("")],
          }),
          new Paragraph({
            children: [new TextRun(formData.hiringManagerName)],
          }),
          new Paragraph({
            children: [new TextRun(formData.companyName)],
          }),
          new Paragraph({
            children: [new TextRun(formData.companyAddress)],
          }),
          new Paragraph({
            children: [new TextRun(formData.cityStateZip)],
          }),
          new Paragraph({
            children: [new TextRun("")],
          }),
          new Paragraph({
            children: [new TextRun(`Dear ${formData.hiringManagerName},`)],
          }),
          new Paragraph({
            children: [
              new TextRun(
                `I am writing to express my interest in the ${formData.positionTitle} role at ${formData.companyName}. With over five years of experience designing and implementing scalable full-stack solutions, I bring a robust blend of technical expertise and problem-solving acumen that aligns with the needs of your dynamic team.`
              ),
            ],
          }),
          // ... Add remaining paragraphs similarly
          new Paragraph({
            children: [new TextRun("")],
          }),
          new Paragraph({
            children: [new TextRun("Sincerely,")],
          }),
          new Paragraph({
            children: [new TextRun(formData.name)],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";
  a.href = url;
  a.download = "cover-letter.docx";
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};