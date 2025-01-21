import { useState } from "react";
import CoverLetterForm from "../components/CoverLetterForm";
import CoverLetterPreview from "../components/CoverLetterPreview";
import { Card } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    emailAddress: "",
    linkedinProfile: "",
    githubProfile: "",
    date: "",
    hiringManagerName: "",
    companyName: "",
    companyAddress: "",
    cityStateZip: "",
    positionTitle: "",
    companyValues: "",
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Professional Cover Letter Generator
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <CoverLetterForm formData={formData} setFormData={setFormData} />
          </Card>
          <div className="lg:sticky lg:top-8">
            <Card className="p-6">
              <CoverLetterPreview formData={formData} />
            </Card>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Index;