import { getuserAvailability } from "@/actions/availability"
import { defaultAvailability } from "./data";
import AvailabilityForm  from "./_components/availability-form";

const AvailabilityPage =async () => {
  const availability = await getuserAvailability();
  return <AvailabilityForm initialData = {availability || defaultAvailability}/>;
}

export default AvailabilityPage