import { Document, Packer, Paragraph, TextRun } from "docx";
import { FormData } from "../types/form";

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
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun(
                "In my current role as a Senior Full Stack Developer at TIAA, I led multiple impactful projects, including the migration of legacy front-ends to micro-front-end architecture using Angular, resulting in a 30% reduction in load times. Additionally, I developed scalable microservices using Spring Boot and Hibernate, which enhanced system scalability by 35%. My proactive approach to resolving critical production issues as the primary support contact ensured a 99.9% uptime, reflecting my commitment to operational excellence."
              ),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun(
                "Previously, at JP Morgan Chase, I harnessed modern frameworks like React, Tailwind CSS, and Next.js to improve user engagement and page load speeds significantly. My hands-on experience with secure authentication systems and robust backend frameworks, coupled with a focus on cloud services such as AWS and GCP, has consistently delivered high-quality software aligned with business goals."
              ),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun(
                "I pride myself on leveraging cutting-edge technologies to drive innovation. For instance, I recently integrated Python-based machine learning pipelines with Flask APIs, applying NLP techniques to extract actionable insights from customer data with 99% accuracy. My proficiency with cloud platforms like AWS, Azure, and OpenShift, alongside tools like Docker, Kubernetes, and Jenkins, has been instrumental in optimizing deployment pipelines and system reliability."
              ),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun("What excites me about "),
              new TextRun({ text: formData.companyName, bold: true }),
              new TextRun(" is its commitment to "),
              new TextRun(formData.companyValues),
              new TextRun(". I am eager to bring my expertise in full-stack development and cloud architecture to contribute to your team's success."),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun("I would welcome the opportunity to discuss how my skills and experiences align with the goals of "),
              new TextRun({ text: formData.companyName, bold: true }),
              new TextRun(". Thank you for considering my application. I look forward to the possibility of contributing to your team's success."),
            ],
            spacing: { after: 200 },
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