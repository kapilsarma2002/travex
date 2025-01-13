'use client'

import { createNewEntry } from "@/utils/api"
import { useRouter } from "next/navigation";

const NewTripCard = () => {
  const router = useRouter();

  const handleOnClick = async () => {
    const data = await createNewEntry();
    router.push(`/trip/${data.id}`);
  }

  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-neutral-100 dark:bg-black shadow-lg dark:shadow-lg">
      <div className="px-4 py-5 sm:p-6" onClick={handleOnClick}>
        <div className="text-3xl">New Entry +</div>
      </div>
    </div>
  )
}

export default NewTripCard;