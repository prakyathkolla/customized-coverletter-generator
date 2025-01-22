import { startOfDay, format } from "date-fns";
import { FormData } from "@/types/form";
import PersonalInfoSection from "./cover-letter/PersonalInfoSection";
import CompanyInfoSection from "./cover-letter/CompanyInfoSection";
import DownloadButtons from "./cover-letter/DownloadButtons";

interface Props {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const CoverLetterForm = ({ formData, setFormData }: Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const normalizedDate = startOfDay(date);
      setFormData({ ...formData, date: format(normalizedDate, "yyyy-MM-dd") });
    }
  };

  return (
    <div className="space-y-6">
      <PersonalInfoSection formData={formData} onInputChange={handleInputChange} />
      <CompanyInfoSection
        formData={formData}
        onInputChange={handleInputChange}
        onDateSelect={handleDateSelect}
      />
      <DownloadButtons formData={formData} />
    </div>
  );
};

export default CoverLetterForm;