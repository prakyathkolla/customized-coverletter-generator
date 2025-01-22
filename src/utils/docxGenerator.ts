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
            children: [new TextRun({ text: formData.phoneNumber, bold:true})],
          }),
          new Paragraph({
            children: [new TextRun({ text: formData.emailAddress, bold:true})],
          }),
          new Paragraph({
            children: [new TextRun({ text: formData.linkedinProfile, bold:true})],
          }),
          new Paragraph({
            children: [new TextRun({ text: formData.githubProfile, bold:true})],
          }),
          new Paragraph({
            children: [new TextRun("")],
          }),
          new Paragraph({
            children: [new TextRun({ text: formData.date, bold:true})],
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
            children: [new TextRun({ text: formData.companyAddress, bold: true})],
          }),
          new Paragraph({
            children: [new TextRun({ text: formData.cityStateZip, bold: true})],
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
              new TextRun({ text: formData.positionTitle, bold: true }),
              new TextRun(" role at "),
              new TextRun({ text: formData.companyName, bold: true }),
              new TextRun(". With over five years of experience designing and implementing scalable full-stack solutions, I bring a robust blend of technical expertise and problem-solving acumen that aligns with the needs of your dynamic team."),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun("In my current role as a "), 
              new TextRun({
                text: "Senior Full Stack Developer at TIAA. ",
                bold: true
              }), 
              new TextRun("I led multiple impactful projects, including the migration of legacy front-ends to micro-front-end architecture using"),
              new TextRun({
                text: " Angular ",
                bold: true
              }), 
              new TextRun("resulting in a"),
              new TextRun({
                text: " 30% ",
                bold: true
              }),
              new TextRun("reduction in load times. Additionally, I developed scalable microservices using"),
              new TextRun({
                text : " Spring Boot and Hibernate, ",
                bold: true
              }),
              new TextRun("which enhanced system scalability by"),
              new TextRun({
                text : " 35%. ",
                bold: true
              }),
              new TextRun("My proactive approach to resolving critical production issues as the primary support contact ensured a"),
              new TextRun({
                text : " 99.9% ",
                bold: true
                }),
              new TextRun("uptime, reflecting my commitment to operational excellence."),
            ],
            spacing: { after: 200 },
          }),
          // new Paragraph({
          //   children: [
          //     new TextRun(
          //       "Previously, at JP Morgan Chase, I harnessed modern frameworks like React, Tailwind CSS, and Next.js to improve user engagement and page load speeds significantly. My hands-on experience with secure authentication systems and robust backend frameworks, coupled with a focus on cloud services such as AWS and GCP, has consistently delivered high-quality software aligned with business goals."
          //     ),
          //   ],
          //   spacing: { after: 200 },
          // }),

          new Paragraph({
            children: [
              new TextRun("Previously, at "), // Normal text
              new TextRun({ text: "JP Morgan Chase", bold: true }), // Bold text
              new TextRun(
                ", I harnessed modern frameworks like "
              ),
              new TextRun({ text: "React", bold: true }), // Bold text
              new TextRun(", "),
              new TextRun({ text: "Tailwind CSS", bold: true }), // Bold text
              new TextRun(", and "),
              new TextRun({ text: "Next.js", bold: true }), // Bold text
              new TextRun(
                " to improve user engagement and page load speeds significantly. My hands-on experience with secure authentication systems and robust backend frameworks, coupled with a focus on cloud services such as "
              ),
              new TextRun({ text: "AWS", bold: true }), // Bold text
              new TextRun(" and "),
              new TextRun({ text: "GCP", bold: true }), // Bold text
              new TextRun(
                ", has consistently delivered high-quality software aligned with business goals."
              ),
            ],
            spacing: { after: 200 }, // Spacing after the paragraph
          }),
          
          // new Paragraph({
          //   children: [
          //     new TextRun(
          //       "I pride myself on leveraging cutting-edge technologies to drive innovation. For instance, I recently integrated Python-based machine learning pipelines with Flask APIs, applying NLP techniques to extract actionable insights from customer data with 99% accuracy. My proficiency with cloud platforms like AWS, Azure, and OpenShift, alongside tools like Docker, Kubernetes, and Jenkins, has been instrumental in optimizing deployment pipelines and system reliability."
          //     ),
          //   ],
          //   spacing: { after: 200 },
          // }),

          new Paragraph({
            children: [
              new TextRun("I pride myself on leveraging cutting-edge technologies to drive innovation. For instance, I recently integrated "), // Normal text
              new TextRun({ text: "Python-based machine learning", bold: true }), // Bold text
              new TextRun(" pipelines with "), // Normal text
              new TextRun({ text: "Flask APIs", bold: true }), // Bold text
              new TextRun(", applying "), // Normal text
              new TextRun({ text: "NLP", bold: true }), // Bold text
              new TextRun(" techniques to extract actionable insights from customer data with "), // Normal text
              new TextRun({ text: "99%", bold: true }), // Bold text
              new TextRun(" accuracy. My proficiency with cloud platforms like "), // Normal text
              new TextRun({ text: "AWS", bold: true }), // Bold text
              new TextRun(", "), // Normal text
              new TextRun({ text: "Azure", bold: true }), // Bold text
              new TextRun(", and "), // Normal text
              new TextRun({ text: "OpenShift", bold: true }), // Bold text
              new TextRun(", alongside tools like "), // Normal text
              new TextRun({ text: "Docker", bold: true }), // Bold text
              new TextRun(", "), // Normal text
              new TextRun({ text: "Kubernetes", bold: true }), // Bold text
              new TextRun(", and "), // Normal text
              new TextRun({ text: "Jenkins", bold: true }), // Bold text
              new TextRun(", has been instrumental in optimizing deployment pipelines and system reliability."), // Normal text
            ],
            spacing: { after: 200 }, // Adds spacing after the paragraph
          }),
          
          new Paragraph({
            children: [
              new TextRun("What excites me about "),
              new TextRun({ text: formData.companyName, bold: true }),
              new TextRun(" is its commitment to "),
              new TextRun({ text: formData.companyValues, bold: true}),
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