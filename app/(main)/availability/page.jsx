import { getUserAvailability } from "@/actions/availability"

const AvailabilityPage =async () => {
    const Availability = await getUserAvailability();
    console.log(Availability);
  return (
    <div>AvailabilityPage</div>
  )
}

export default AvailabilityPage