import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { FormData } from "@/types/form";
import { generatePDF } from "../../utils/pdfGenerator";
import { generateDOCX } from "../../utils/docxGenerator";
import { toast } from "sonner";

interface Props {
  formData: FormData;
}

const DownloadButtons = ({ formData }: Props) => {
  const handleDownload = async (format: "pdf" | "docx") => {
    try {
      if (format === "pdf") {
        await generatePDF(formData);
      } else {
        await generateDOCX(formData);
      }
      toast.success(`Cover letter downloaded as ${format.toUpperCase()}`);
    } catch (error) {
      toast.error("Error generating document");
    }
  };

  return (
    <div className="flex gap-4">
      <Button
        onClick={() => handleDownload("pdf")}
        className="flex-1"
        variant="default"
      >
        <Download className="mr-2 h-4 w-4" />
        Download PDF
      </Button>
      <Button
        onClick={() => handleDownload("docx")}
        className="flex-1"
        variant="outline"
      >
        <Download className="mr-2 h-4 w-4" />
        Download DOCX
      </Button>
    </div>
  );
};

export default DownloadButtons;