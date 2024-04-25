'use client'


import { Progress } from "@/components/ui/progress"
import ModelCountComponent from "@/components/dashboard/ModelCount"
import LibraryCountComponent from "@/components/dashboard/LibraryCount"
import UploadFileComponent from "@/components/dashboard/UploadFile"
import ObjectsTableComponent from "@/components/dashboard/ObjectsTable"

export default function Dashboard() {
  return (
    <>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <UploadFileComponent />
          <LibraryCountComponent>
            <Progress value={25} aria-label="25% increase" />
          </LibraryCountComponent>
          <ModelCountComponent>
            <Progress value={12} aria-label="12% increase" />
          </ModelCountComponent>
        </div>
        <ObjectsTableComponent />
      </div>
    </>
  );
}
