import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";
import { FormData } from "@/types/form";

interface Props {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfoSection = ({ formData, onInputChange }: Props) => {
  return (
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
            onChange={onInputChange}
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={onInputChange}
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
            onChange={onInputChange}
            placeholder="john.doe@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedinProfile">LinkedIn Profile</Label>
          <Input
            id="linkedinProfile"
            name="linkedinProfile"
            value={formData.linkedinProfile}
            onChange={onInputChange}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="githubProfile">GitHub Profile</Label>
          <Input
            id="githubProfile"
            name="githubProfile"
            value={formData.githubProfile}
            onChange={onInputChange}
            placeholder="github.com/johndoe"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;