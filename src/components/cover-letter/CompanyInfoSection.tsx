import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { FormData } from "@/types/form";

interface Props {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateSelect: (date: Date | undefined) => void;
}

const CompanyInfoSection = ({ formData, onInputChange, onDateSelect }: Props) => {
  return (
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
                onSelect={onDateSelect}
                initialFocus
                className="rounded-md border"
                classNames={{
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                  cell: "h-9 w-9 text-center text-sm relative p-0 data-[isSelected=true]:bg-primary data-[isSelected=true]:text-primary-foreground",
                  head_row: "flex",
                  head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  table: "w-full border-collapse space-y-1",
                  caption: "flex justify-center pt-1 relative items-center",
                  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
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
            onChange={onInputChange}
            placeholder="Jane Smith"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={onInputChange}
            placeholder="Tech Corp Inc."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyAddress">Company Address</Label>
          <Input
            id="companyAddress"
            name="companyAddress"
            value={formData.companyAddress}
            onChange={onInputChange}
            placeholder="123 Business Street"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cityStateZip">City, State, ZIP Code</Label>
          <Input
            id="cityStateZip"
            name="cityStateZip"
            value={formData.cityStateZip}
            onChange={onInputChange}
            placeholder="San Francisco, CA 94105"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="positionTitle">Position Title</Label>
          <Input
            id="positionTitle"
            name="positionTitle"
            value={formData.positionTitle}
            onChange={onInputChange}
            placeholder="Senior Software Engineer"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyValues">Company Values/Projects</Label>
          <Input
            id="companyValues"
            name="companyValues"
            value={formData.companyValues}
            onChange={onInputChange}
            placeholder="leveraging technology to drive meaningful change"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoSection;