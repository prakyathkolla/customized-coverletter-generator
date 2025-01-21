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

  // Header with contact information on separate lines
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
  y += lineHeight * 2;

  // Date
  doc.text(formData.date, 20, y);
  y += lineHeight * 2;

  // Company Info
  doc.setFont(undefined, 'bold');
  doc.text(formData.hiringManagerName, 20, y);
  y += lineHeight;
  doc.text(formData.companyName, 20, y);
  y += lineHeight;
  doc.setFont(undefined, 'normal');
  doc.text(formData.companyAddress, 20, y);
  y += lineHeight;
  doc.text(formData.cityStateZip, 20, y);
  y += lineHeight * 2;

  // Letter Content
  doc.setFont(undefined, 'normal');
  doc.text(`Dear `, 20, y);
  const dearWidth = doc.getTextWidth('Dear ');
  doc.setFont(undefined, 'bold');
  doc.text(formData.hiringManagerName + ',', 20 + dearWidth, y);
  y += lineHeight * 2;

  // First paragraph with bold company name
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
  y += lineHeight * (splitRemaining.length + 1);

  // Middle paragraphs
  const middleParagraphs = [
    `In my current role as a Senior Full Stack Developer at TIAA, I led multiple impactful projects, including the migration of legacy front-ends to micro-front-end architecture using Angular, resulting in a 30% reduction in load times. Additionally, I developed scalable microservices using Spring Boot and Hibernate, which enhanced system scalability by 35%. My proactive approach to resolving critical production issues as the primary support contact ensured a 99.9% uptime, reflecting my commitment to operational excellence.`,
    `Previously, at JP Morgan Chase, I harnessed modern frameworks like React, Tailwind CSS, and Next.js to improve user engagement and page load speeds significantly. My hands-on experience with secure authentication systems and robust backend frameworks, coupled with a focus on cloud services such as AWS and GCP, has consistently delivered high-quality software aligned with business goals.`,
    `I pride myself on leveraging cutting-edge technologies to drive innovation. For instance, I recently integrated Python-based machine learning pipelines with Flask APIs, applying NLP techniques to extract actionable insights from customer data with 99% accuracy. My proficiency with cloud platforms like AWS, Azure, and OpenShift, alongside tools like Docker, Kubernetes, and Jenkins, has been instrumental in optimizing deployment pipelines and system reliability.`
  ];

  for (const paragraph of middleParagraphs) {
    const split = doc.splitTextToSize(paragraph, 170);
    doc.text(split, 20, y);
    y += lineHeight * (split.length + 1);
  }

  // Company values paragraph with bold company name
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
  y += lineHeight * (splitValues.length + 1);

  // Closing paragraph with bold company name
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
  y += lineHeight * (splitClosing.length + 2);

  // Signature
  doc.text("Sincerely,", 20, y);
  y += lineHeight * 2;
  doc.text(formData.name, 20, y);

  doc.save("cover-letter.pdf");
};

export const generateDOCX = async (formData: FormData) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun({ text: formData.name, bold: true })],
          }),
          new Paragraph({
            children: [new TextRun(formData.phoneNumber)],
          }),
          new Paragraph({
            children: [new TextRun(formData.emailAddress)],
          }),
          new Paragraph({
            children: [new TextRun(formData.linkedinProfile)],
          }),
          new Paragraph({
            children: [new TextRun(formData.githubProfile)],
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
            children: [new TextRun({ text: formData.hiringManagerName, bold: true })],
          }),
          new Paragraph({
            children: [new TextRun({ text: formData.companyName, bold: true })],
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
            children: [
              new TextRun("Dear "),
              new TextRun({ text: formData.hiringManagerName + ",", bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("I am writing to express my interest in the "),
              new TextRun(formData.positionTitle),
              new TextRun(" role at "),
              new TextRun({ text: formData.companyName, bold: true }),
              new TextRun(". With over five years of experience designing and implementing scalable full-stack solutions, I bring a robust blend of technical expertise and problem-solving acumen that aligns with the needs of your dynamic team."),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun(
                "In my current role as a Senior Full Stack Developer at TIAA, I led multiple impactful projects, including the migration of legacy front-ends to micro-front-end architecture using Angular, resulting in a 30% reduction in load times. Additionally, I developed scalable microservices using Spring Boot and Hibernate, which enhanced system scalability by 35%. My proactive approach to resolving critical production issues as the primary support contact ensured a 99.9% uptime, reflecting my commitment to operational excellence."
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun(
                "Previously, at JP Morgan Chase, I harnessed modern frameworks like React, Tailwind CSS, and Next.js to improve user engagement and page load speeds significantly. My hands-on experience with secure authentication systems and robust backend frameworks, coupled with a focus on cloud services such as AWS and GCP, has consistently delivered high-quality software aligned with business goals."
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun(
                "I pride myself on leveraging cutting-edge technologies to drive innovation. For instance, I recently integrated Python-based machine learning pipelines with Flask APIs, applying NLP techniques to extract actionable insights from customer data with 99% accuracy. My proficiency with cloud platforms like AWS, Azure, and OpenShift, alongside tools like Docker, Kubernetes, and Jenkins, has been instrumental in optimizing deployment pipelines and system reliability."
              ),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("What excites me about "),
              new TextRun({ text: formData.companyName, bold: true }),
              new TextRun(" is its commitment to "),
              new TextRun(formData.companyValues),
              new TextRun(". I am eager to bring my expertise in full-stack development and cloud architecture to contribute to your team's success."),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("I would welcome the opportunity to discuss how my skills and experiences align with the goals of "),
              new TextRun({ text: formData.companyName, bold: true }),
              new TextRun(". Thank you for considering my application. I look forward to the possibility of contributing to your team's success."),
            ],
          }),
          new Paragraph({
            children: [new TextRun("")],
          }),
          new Paragraph({
            children: [new TextRun("Sincerely,")],
          }),
          new Paragraph({
            children: [new TextRun({ text: formData.name, bold: true })],
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