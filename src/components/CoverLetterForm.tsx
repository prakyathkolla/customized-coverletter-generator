import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { generatePDF } from "../utils/pdfGenerator";
import { generateDOCX } from "../utils/docxGenerator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, startOfDay } from "date-fns";

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
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Personal Information
        </h2>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emailAddress">Email Address</Label>
            <Input
              id="emailAddress"
              name="emailAddress"
              type="email"
              value={formData.emailAddress}
              onChange={handleInputChange}
              placeholder="john.doe@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedinProfile">LinkedIn Profile</Label>
            <Input
              id="linkedinProfile"
              name="linkedinProfile"
              value={formData.linkedinProfile}
              onChange={handleInputChange}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="githubProfile">GitHub Profile</Label>
            <Input
              id="githubProfile"
              name="githubProfile"
              value={formData.githubProfile}
              onChange={handleInputChange}
              placeholder="github.com/johndoe"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Company Information</h2>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? format(new Date(formData.date), "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.date ? new Date(formData.date) : undefined}
                  onSelect={handleDateSelect}
                  initialFocus
                  className="rounded-md border"
                  classNames={{
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day_today: "bg-accent text-accent-foreground",
                    day: "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    cell: "relative p-0 focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                    nav_button: "hover:bg-accent hover:text-accent-foreground",
                    table: "w-full border-collapse space-y-1",
                    head_cell: "text-muted-foreground font-normal text-[0.8rem] w-9 p-0",
                    caption: "flex justify-center pt-1 relative items-center",
                    caption_label: "text-sm font-medium",
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hiringManagerName">Hiring Manager's Name</Label>
            <Input
              id="hiringManagerName"
              name="hiringManagerName"
              value={formData.hiringManagerName}
              onChange={handleInputChange}
              placeholder="Jane Smith"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Tech Corp Inc."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyAddress">Company Address</Label>
            <Input
              id="companyAddress"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleInputChange}
              placeholder="123 Business Street"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cityStateZip">City, State, ZIP Code</Label>
            <Input
              id="cityStateZip"
              name="cityStateZip"
              value={formData.cityStateZip}
              onChange={handleInputChange}
              placeholder="San Francisco, CA 94105"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="positionTitle">Position Title</Label>
            <Input
              id="positionTitle"
              name="positionTitle"
              value={formData.positionTitle}
              onChange={handleInputChange}
              placeholder="Senior Software Engineer"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyValues">Company Values/Projects</Label>
            <Input
              id="companyValues"
              name="companyValues"
              value={formData.companyValues}
              onChange={handleInputChange}
              placeholder="leveraging technology to drive meaningful change"
            />
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default CoverLetterForm;
