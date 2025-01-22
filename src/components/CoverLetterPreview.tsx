import { Card } from "@/components/ui/card";

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

const CoverLetterPreview = ({ formData }: { formData: FormData }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Preview</h2>
      <div className="prose prose-sm max-w-none">
        <div className="text-sm space-y-4 text-justify">
          <div className="space-y-2">
            {formData.name}
            <br />
            {formData.phoneNumber}
            <br />
            {formData.emailAddress}
            <br />
            {formData.linkedinProfile}
            <br />
            {formData.githubProfile}
          </div>

          <div>{formData.date}</div>

          <div>
            <span className="font-bold">{formData.hiringManagerName}</span>
            <br />
            <span className="font-bold">{formData.companyName}</span>
            <br />
            {formData.companyAddress}
            <br />
            {formData.cityStateZip}
          </div>

          <div>Dear <span className="font-bold">{formData.hiringManagerName}</span>,</div>

          <div>
            I am writing to express my interest in the {formData.positionTitle}{" "}
            role at <span className="font-bold">{formData.companyName}</span>. With over five years of experience
            designing and implementing scalable full-stack solutions, I bring a
            robust blend of technical expertise and problem-solving acumen that
            aligns with the needs of your dynamic team.
          </div>

          <div>
            In my current role as a <b>Senior Full Stack Developer at TIAA</b>, I led
            multiple impactful projects, including the migration of legacy
            front-ends to micro-front-end architecture using <b>Angular</b>, resulting in
            a <b>30%</b> reduction in load times. Additionally, I developed scalable
            microservices using Spring Boot and Hibernate, which enhanced system
            scalability by 35%. My proactive approach to resolving critical
            production issues as the primary support contact ensured a 99.9%
            uptime, reflecting my commitment to operational excellence.
          </div>

          <div>
            Previously, at <b>JP Morgan Chase</b>, I harnessed modern frameworks like
            <b>React, Tailwind CSS, and Next.js</b> to improve user engagement and page
            load speeds significantly. My hands-on experience with secure
            authentication systems and robust backend frameworks, coupled with a
            focus on <b>cloud services</b> such as <b>AWS and GCP</b>, has consistently
            delivered high-quality software aligned with business goals.
          </div>

          <div>
            I pride myself on leveraging cutting-edge technologies to drive
            innovation. For instance, I recently integrated <b>Python-based machine
            learning</b> pipelines with <b>Flask APIs</b>, applying <b>NLP</b> techniques to extract
            actionable insights from customer data with <b>99%</b> accuracy. My
            proficiency with cloud platforms like <b>AWS, Azure, and OpenShift</b>,
            alongside tools like <b>Docker, Kubernetes, and Jenkins</b>, has been
            instrumental in optimizing deployment pipelines and system reliability.
          </div>

          <div>
            What excites me about <span className="font-bold">{formData.companyName}</span> is its commitment to{" "}
            {formData.companyValues}. I am eager to bring my expertise in
            full-stack development and cloud architecture to contribute to your
            team's success.
          </div>

          <div>
            I would welcome the opportunity to discuss how my skills and
            experiences align with the goals of <span className="font-bold">{formData.companyName}</span>. Thank you
            for considering my application. I look forward to the possibility of
            contributing to your team's success.
          </div>

          <div>
            Sincerely,
            <br />
            {formData.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterPreview;
