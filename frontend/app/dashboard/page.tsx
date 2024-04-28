'use client'


import ModelCountComponent from "@/components/dashboard/ModelCount"
import LibraryCountComponent from "@/components/dashboard/LibraryCount"
import UploadFileComponent from "@/components/dashboard/UploadFile"
import ObjectsTableComponent from "@/components/dashboard/ObjectsTable"
import { useEffect, useState } from "react"
import { Library } from "@/types/library"
import { getLibraries } from "@/lib/actions/library"
import { toast } from "sonner"
import { Model } from "@/types/model"
import { getModels } from "@/lib/actions/models"

export default function Dashboard() {
  const [libraries, setLibraries] = useState<Library[]>([])
  const [libraryCount, setLibraryCount] = useState<number>(0)
  const [mostRecentLibrary, setMostRecentLibrary] = useState<Library | null>(null);

  const [models, setModels] = useState<Model[]>([])
  const [modelCount, setModelCount] = useState<number>(0)
  const [mostRecentModel, setMostRecentModel] = useState<Model | null>(null);

  const [librariesLoading, setLibrariesLoading] = useState(true)
  const [modelsLoading, setModelsLoading] = useState(true)

  const refreshLibraries = async (skip: number = 0, limit: number = 10) => {
    const { libraries, count, error } = await getLibraries(skip, limit, "created_at", true);

    if (libraries) {
      setMostRecentLibrary(libraries[0])
    }

    if (count > 0) {
      setLibraryCount(count)
    }

    if (error) {
      toast.error(error)
    }

    setLibrariesLoading(false)
  }

  const refreshModels = async (skip: number = 0, limit: number = 10) => {
    const { models, count, error } = await getModels(skip, limit, "created_at", true);

    if (models) {
      setMostRecentModel(models[0])
    }

    if (count > 0) {
      setModelCount(count)
    }

    if (error) {
      toast.error(error)
    }

    setModelsLoading(false)
  }

  useEffect(() => {
    refreshLibraries(0, 1)
    refreshModels(0, 1)
  }, [])


  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <UploadFileComponent />
          <LibraryCountComponent loading={librariesLoading} count={libraryCount} mostRecent={mostRecentLibrary?.created_at ?? new Date()} />
          <ModelCountComponent loading={modelsLoading} count={modelCount} mostRecent={mostRecentModel?.created_at ?? new Date()} />
        </div>
        {/* <ObjectsTableComponent /> */}
      </div>
    </main >
  );
}
