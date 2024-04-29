import { ModelFile } from "./files";

export type Model = {
    id: number;
    name: string;
    file_name: string;
    created_at: Date;
    library_id: number;
    files: ModelFile[];
}