'use client'


import ModelCountComponent from "@/components/dashboard/ModelCount"
import LibraryCountComponent from "@/components/dashboard/LibraryCount"
import UploadFileComponent from "@/components/dashboard/UploadFile"
import ObjectsTableComponent from "@/components/dashboard/ObjectsTable"
import { useEffect, useState } from "react"
import { Library } from "@/types/library"
import { getLibraries } from "@/lib/actions/library"
import { toast } from "sonner"

export default function Dashboard() {
  const [libraries, setLibraries] = useState<Library[]>([])
  const [libraryCount, setLibraryCount] = useState<number>(0)

  const [loading, setLoading] = useState(true);

  const refreshLibraries = async (skip: number = 0, limit: number = 10) => {
    const { libraries, count, error } = await getLibraries(skip, limit);

    if (libraries && count > 0) {
      setLibraries(libraries)
      setLibraryCount(count)
    }

    if (error) {
      toast.error(error)
    }

    setLoading(false)
  }

  useEffect(() => {
    refreshLibraries(0, 10)
  }, [])


  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <UploadFileComponent />
          <LibraryCountComponent loading={loading} count={libraryCount} />
          <ModelCountComponent />
        </div>
        <ObjectsTableComponent />
      </div>
    </main >
  );
}
