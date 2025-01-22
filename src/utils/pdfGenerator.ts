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

    // Helper function to mix normal and bold text
    const addMixedText = (textParts: Array<{ text: string; bold?: boolean }>, indent: number = 0) => {
      const startX = margin + indent;
      let currentX = startX;
      const maxWidth = pageWidth - margin - indent;
    
      textParts.forEach((part) => {
        const fontStyle = part.bold ? "bold" : "normal";
        doc.setFont(undefined, fontStyle);
    
        const words = part.text.split(" ");
        words.forEach((word) => {
          const wordWidth = doc.getTextWidth(word + " ");
          if (currentX + wordWidth > maxWidth) {
            // Wrap to the next line
            currentX = startX;
            y += 5; // Move down for the next line
          }
          // Add the word to the PDF
          doc.text(word + " ", currentX, y);
          currentX += wordWidth;
        });
      });
    
      // Adjust Y position after adding mixed text
      y += 8; // Add spacing after the paragraph
    };
    

  // Contact Information - Each on new line
  doc.setFontSize(11);
  [
    addBoldText(formData.name),
    addBoldText(formData.phoneNumber),
    addBoldText(formData.emailAddress),
    addBoldText(formData.linkedinProfile),
    addBoldText(formData.githubProfile)
  ]
  // ].forEach(item => {
  //   addWrappedText(item);
    y += 1; // Small additional spacing between contact items
  

  // Date
  y += 5;
  addBoldText(formData.date);

  // Company Information
  y += 5;
  addBoldText(formData.hiringManagerName);
  addBoldText(formData.companyName);
  addBoldText(formData.companyAddress);
  addBoldText(formData.cityStateZip);

  // Salutation
  y += 5;
  doc.setFont(undefined, 'normal');
  doc.text("Dear ", margin, y);
  doc.setFont(undefined, 'bold');
  doc.text(formData.hiringManagerName + ",", margin + doc.getTextWidth("Dear "), y);
  y += 8;

  // First paragraph
  doc.setFont(undefined, 'normal');
  const firstParagraphParts = [
    {text: `I am writing to express my interest in the `, bold:false },
    {text: formData.positionTitle, bold:true },
    {text: ` role at `, bold: false },
    {text: formData.companyName, bold: true},
    {text: `. With over five years of experience designing and implementing scalable full-stack solutions, I bring a robust blend of technical expertise and problem-solving acumen that aligns with the needs of your dynamic team.`, bold: false },
  ];
  addMixedText(firstParagraphParts);
  y += 3;

  // Experience paragraphs
  // const paragraphs = [
  //   `In my current role as a Senior Full Stack Developer at TIAA, I led multiple impactful projects, including the migration of legacy front-ends to micro-front-end architecture using Angular, resulting in a 30% reduction in load times. Additionally, I developed scalable microservices using Spring Boot and Hibernate, which enhanced system scalability by 35%. My proactive approach to resolving critical production issues as the primary support contact ensured a 99.9% uptime, reflecting my commitment to operational excellence.`,
    
  //   `Previously, at JP Morgan Chase, I harnessed modern frameworks like React, Tailwind CSS, and Next.js to improve user engagement and page load speeds significantly. My hands-on experience with secure authentication systems and robust backend frameworks, coupled with a focus on cloud services such as AWS and GCP, has consistently delivered high-quality software aligned with business goals.`,
    
  //   `I pride myself on leveraging cutting-edge technologies to drive innovation. For instance, I recently integrated Python-based machine learning pipelines with Flask APIs, applying NLP techniques to extract actionable insights from customer data with 99% accuracy. My proficiency with cloud platforms like AWS, Azure, and OpenShift, alongside tools like Docker, Kubernetes, and Jenkins, has been instrumental in optimizing deployment pipelines and system reliability.`
  // ];

  const paragraphs = [
    [
      { text: `In my current role as a `, bold: false },
      { text: `Senior Full Stack Developer at TIAA`, bold: true },
      { text: `, I led multiple impactful projects, including the migration of legacy front-ends to micro-front-end architecture using`, bold: false }, 
      { text: `Angular`, bold: true},
      { text: `resulting in a`, bold: false},
      { text: `30%`, bold: true },
      { text: `reduction in load times.`, bold: false },
      { text: `Additionally, I developed scalable microservices using`, bold: false}, 
      { text: `Spring Boot and Hibernate`, bold: true },
      { text: `which enhanced system scalability by `, bold: false },
      { text: `35%.`, bold: true },
      { text: `My proactive approach to resolving critical production issues as the primary support contact ensured a `, bold: false },
      { text: `99.9% uptime`, bold: true },
      { text: `, reflecting my commitment to operational excellence.`, bold: false },
    ],
    [
      { text: "Previously, at ", bold: false },
      { text: "JP Morgan Chase", bold: true },
      { text: ", I harnessed modern frameworks like ", bold: false },
      { text: "React, Tailwind CSS, and Next.js", bold: true },
      { text: " to improve user engagement and page load speeds significantly. My hands-on experience with secure authentication systems and robust backend frameworks, coupled with a focus on cloud services such as ", bold: false },
      { text: "AWS and GCP", bold: true },
      { text: ", has consistently delivered high-quality software aligned with business goals.", bold: false },
    ],
    [
      { text: `I pride myself on leveraging cutting-edge technologies to drive innovation. For instance, I recently integrated`, bold : false },
      { text: `Python-based machine learning`, bold: true},
      { text: `pipelines with`, bold: false },
      { text: `Flask APIs,`, bold : true },
      { text: `applying`, bold : false },
      { text: `NLP`, bold : true },
      { text: `techniques to extract actionable insights from customer data with`, bold: false },
      { text: `99% accuracy`, bold: true },
      { text: `. My proficiency with cloud platforms like `, bold: false },
      { text: `AWS, Azure, and OpenShift`, bold: true },
      { text: `, alongside tools like`, bold: false },
      { text: `Docker, Kubernetes, and Jenkins`, bold: true },
      { text: `, has been instrumental in optimizing deployment pipelines and system reliability.`, bold: false },
    ],
  ];
  

  paragraphs.forEach(paragraph => {
    addMixedText(paragraph);
    y += 3;
  });

  // Company values paragraph
  const valuesParagraph = [
    {text: `What excites me about `, bold : false},
    {text: formData.companyName, bold: true},
    {text: ` is its commitment to`, bold: false},
    {text: formData.companyValues, bold: true},
    {text: `. I am eager to bring my expertise in full-stack development and cloud architecture to contribute to your team's success.`, bold : false}
  ];
    addMixedText(valuesParagraph);
  y += 3;

  // Closing paragraph
  const closingParagraph = [
    { text: `I would welcome the opportunity to discuss how my skills and experiences align with the goals of `, bold: false },
    { text:  formData.companyName, bold: true },
    { text: `. Thank you for considering my application. I look forward to the possibility of contributing to your team's success.`, bold: false }
  ];
    addMixedText(closingParagraph);
  y += 8;

  // Signature
  addWrappedText("Sincerely,");
  y += 5;
  addBoldText(formData.name);

  doc.save("cover-letter.pdf");
};