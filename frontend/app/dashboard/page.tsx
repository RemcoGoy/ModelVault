'use client'


import { Progress } from "@/components/ui/progress"
import ModelCountComponent from "@/components/dashboard/ModelCount"
import LibraryCountComponent from "@/components/dashboard/LibraryCount"
import UploadFileComponent from "@/components/dashboard/UploadFile"
import ObjectsTableComponent from "@/components/dashboard/ObjectsTable"

export default function Dashboard() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <UploadFileComponent />
          <LibraryCountComponent />
          <ModelCountComponent />
        </div>
        <ObjectsTableComponent />
      </div>
    </main >
  );
}
